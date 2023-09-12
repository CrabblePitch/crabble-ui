import useStore from '../store/store.js';
import { AmountMath } from "@agoric/ertp";

const getBrand = (brandPetname) => {
    const { brands } = useStore.getState();
    if (!brands) return;

    return [...brands].find(([name]) => name === brandPetname)?.at(1);
};
harden(getBrand);

const getPurseFromSmartWallet = (requestedBrand) => {
    const { smartWalletPurses } = useStore.getState();
    return [...smartWalletPurses].find(({ brand }) => brand === requestedBrand)?.balance;
};
harden(getPurseFromSmartWallet);

const buildCreateRentalOfferSpec = rawData => {
    const { crabbleInstance, wallet } = useStore.getState();
    const utilityBrand = getBrand('Utility');
    const collateralBrand = getBrand('Collateral');
    const rentalFeeBrand = getBrand('RentalFee');
    const utilityPurse = getPurseFromSmartWallet(utilityBrand);

    console.log({ rawData })

    if (!utilityBrand || !rentalFeeBrand || !collateralBrand || !utilityPurse || !crabbleInstance || !wallet)
        throw new Error('No data');

    const utilityAmount = AmountMath.make(utilityBrand,
        harden([utilityPurse.value[+rawData.utilityAmountIndex]]));
    const collateralAmount = AmountMath.make(collateralBrand, BigInt(+rawData.collateralVal));
    const rentalFeePerUnitAmount = AmountMath.make(rentalFeeBrand, BigInt(+rawData.rentalFeePerUnitVal));

    return harden({
        id: `createRentalKeplr-${wallet.address}-${Date.now()}`,
        invitationSpec: {
            source: 'contract',
            instance: crabbleInstance,
            publicInvitationMaker: 'makeRentalInvitation',
        },
        proposal: {
            give: { Utility: utilityAmount },
        },
        offerArgs: {
            rentalConfig: {
                utilityAmount,
                collateralAmount,
                rentalFeePerUnitAmount,
                utilityTitle: rawData.utilityTitle,
                utilityDescription: rawData.utilityDescription,
                rentingTier: rawData.rentingTier,
                rentingDurationUnit: rawData.rentingDurationUnit,
                minRentingDurationUnits: BigInt(+rawData.minRentingDurationUnits),
                maxRentingDurationUnits: BigInt(+rawData.maxRentingDurationUnits),
                gracePeriodDuration: BigInt(+rawData.gracePeriodDuration),
            },
        }
    })
};
harden(buildCreateRentalOfferSpec);

const checkNumber = entry => {
    return Number(entry) > 0;
};
harden(checkNumber);

const buildBorrowAdHocOfferSpec = rawData => {
    const { crabbleInstance, wallet } = useStore.getState();
    const collateralBrand = getBrand('Collateral');
    const rentalFeeBrand = getBrand('RentalFee');

    console.log({ rawData })

    if (!rentalFeeBrand || !collateralBrand || !crabbleInstance || !wallet)
        throw new Error('No data');

    const rentalFeeValue = BigInt(rawData.rentingDuration) * getValueFromNat(rawData.rentalFeePerUnitAmount);

    return harden({
        id: `borrow-adhoc-${wallet.address}-${Date.now()}`,
        invitationSpec: {
            source: 'agoricContract',
            instancePath: ['Crabble'],
            callPipe: [
                ['getRentalByHandle', [rawData.rentalHandle]],
                ['makeBuyOutInvitation']
            ]
        },
        proposal: {
            give: {
                Collateral: rawData.collateralAmount,
                RentalFee: AmountMath.make(rentalFeeBrand, rentalFeeValue),
            },
            want: {
                Utility: rawData.utilityAmount,
            }
        },
        offerArgs: {
            rentingDuration: BigInt(rawData.rentingDuration),
        }
    })
};
harden(buildBorrowAdHocOfferSpec);

const getValueFromSet = (setAmount, index = 0) => {
    const { value } = setAmount;
    return value[index];
};
harden(getValueFromSet);

const getValueFromNat = natAmount => {
    const { value } = natAmount;
    assert(typeof  value === 'bigint', 'Amount must be NAT');
    return value;
};
harden(getValueFromNat);

const makeGenericOnStatusUpdate = (snackBarUpdater, modalUpdater) => {
    const onStatusChange = args => {
        console.log({ args });
        const { status, data } = args;

        if (status === 'error') {
            snackBarUpdater('Offer error', data);
        }
        if (status === 'seated') {
            snackBarUpdater('Transaction submitted:', data.txn);
            snackBarUpdater('Offer id:', data.offerId);
        }
        if (status === 'refunded') {
            snackBarUpdater('Offer refunded');
        }
        if (status === 'accepted') {
            snackBarUpdater('Offer accepted');
        }

        modalUpdater();
    };

    return harden({
        onStatusChange
    });
};
harden(makeGenericOnStatusUpdate);

export {
    getBrand,
    getPurseFromSmartWallet,
    buildCreateRentalOfferSpec,
    checkNumber,
    buildBorrowAdHocOfferSpec,
    getValueFromSet,
    makeGenericOnStatusUpdate,
};