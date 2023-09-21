import useStore from '../store/store.js';
import { AmountMath } from "@agoric/ertp";
import { Rental_Keywords } from "./constants.js";

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
        id: `create-rental-${wallet.address}-${Date.now()}`,
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

const checkNegativeNumber = entry => {
    return Number(entry) < 0;
};
harden(checkNegativeNumber);

const checkPositiveNumber = entry => {
    return Number(entry) > 0;
};
harden(checkPositiveNumber)

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
    return Number(value);
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

const buildWithdrawUtilityOfferSpec = (rental) => {
    const { wallet } = useStore.getState();

    assert(wallet && wallet.address, `Wallet must be defined: ${wallet}`);
    assert(rental, `Rental must be defined: ${rental}`);

    return harden({
        id: `withdraw-utility-${wallet.address}-${Date.now()}`,
        invitationSpec: {
            source: 'continuing',
            previousOffer: rental.id,
            invitationMakerName: 'withdrawUtility',
        },
        proposal: {
            want: {
                Utility: rental.configuration.utilityAmount,
            },
        },
    });
};
harden(buildWithdrawUtilityOfferSpec);

const buildWithdrawCollateralOfferSpec = rental => {
    const { wallet } = useStore.getState();

    assert(wallet && wallet.address, `Wallet must be defined: ${wallet}`);
    assert(rental, `Rental must be defined: ${rental}`);

    return harden({
        id: `withdraw-collateral-${wallet.address}-${Date.now()}`,
        invitationSpec: {
            source: 'continuing',
            previousOffer: rental.id,
            invitationMakerName: 'withdrawCollateral',
        },
        proposal: {
            want: {
                Collateral: rental.configuration.collateralAmount,
            },
        }
    });
};
harden(buildWithdrawUtilityOfferSpec);

const buildWithdrawRentalFeeOfferSpec = rental => {
    const { wallet } = useStore.getState();

    assert(wallet && wallet.address, `Wallet must be defined: ${wallet}`);
    assert(rental, `Rental must be defined: ${rental}`);

    return harden({
        id: `withdraw-rental-fee-${wallet.address}-${Date.now()}`,
        invitationSpec: {
            source: 'continuing',
            previousOffer: rental.id,
            invitationMakerName: 'withdrawRentalFee',
        },
        proposal: {
            want: {
                RentalFee: rental.configuration.rentalFeePerUnitAmount,
            },
        }
    });
};
harden(buildWithdrawUtilityOfferSpec);

const buildReturnUtilityOfferSpec = rental => {
    const { wallet } = useStore.getState();

    assert(wallet && wallet.address, `Wallet must be defined: ${wallet}`);
    assert(rental, `Rental must be defined: ${rental}`);

    return harden({
        id: `return-utility-${wallet.address}-${Date.now()}`,
        invitationSpec: {
            source: 'continuing',
            previousOffer: rental.id,
            invitationMakerName: 'returnUtility',
        },
        proposal: {
            give: {
                Utility: rental.configuration.utilityAmount,
            },
            want: {
                Collateral: rental.configuration.collateralAmount,
            },
        }
    });
};
harden(buildReturnUtilityOfferSpec);

const buildUpdateRentalConfigOfferSpec = (rental, overrides) => {
    const { wallet } = useStore.getState();

    assert(wallet && wallet.address, `Wallet must be defined: ${wallet}`);
    assert(rental, `Rental must be defined: ${rental}`);

    return harden({
        id: `update-rental-config-${wallet.address}-${Date.now()}`,
        invitationSpec: {
            source: 'continuing',
            previousOffer: rental.id,
            invitationMakerName: 'updateRentalConfig',
        },
        proposal: {},
        offerArgs: {
            updatedRentalConfig: {
                ...rental.configuration,
                ...overrides,
            }
        }
    });
};
harden(buildUpdateRentalConfigOfferSpec);

const getFirstWordFromOfferId = offerId => {
  try {
      return  String(offerId).split('-').at(0);
  } catch (e) {
      return '';
  }
};

const isCreateOffer = offerId => {
  return getFirstWordFromOfferId(offerId) === Rental_Keywords.CREATE;
};

const isBorrowOffer = offerId => {
    return getFirstWordFromOfferId(offerId) === Rental_Keywords.BORROW;
};

export {
    getBrand,
    getPurseFromSmartWallet,
    buildCreateRentalOfferSpec,
    checkNegativeNumber,
    checkPositiveNumber,
    buildBorrowAdHocOfferSpec,
    getValueFromSet,
    getValueFromNat,
    makeGenericOnStatusUpdate,
    buildWithdrawUtilityOfferSpec,
    buildWithdrawRentalFeeOfferSpec,
    buildWithdrawCollateralOfferSpec,
    buildReturnUtilityOfferSpec,
    buildUpdateRentalConfigOfferSpec,
    isCreateOffer,
    isBorrowOffer,
};