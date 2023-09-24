import useStore from '../store/store.js';
import { AmountMath } from "@agoric/ertp";
import { Rental_Keywords, RentalConfigKeywords } from "./constants.js";
import { stringifyValue } from "@agoric/ui-components";

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

    const utilityPurse = getPurseFromSmartWallet(rawData.utilityBrand);

    console.log({ rawData })

    if (!utilityPurse || !crabbleInstance || !wallet)
        throw new Error('No data');

    const utilityAmount = AmountMath.make(rawData.utilityBrand,
        harden([utilityPurse.value[+rawData.utilityAmountIndex]]));
    const collateralAmount = AmountMath.make(rawData.collateralBrand, BigInt(rawData.collateralVal));
    const rentalFeePerUnitAmount = AmountMath.make(rawData.rentalFeeBrand, BigInt(rawData.rentalFeePerUnitVal));

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
                utilityTitle: rawData.utilityTitle ,
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

    console.log({ rawData })

    if (!crabbleInstance || !wallet)
        throw new Error('No data');

    const rentalFeeValue = BigInt(rawData.rentingDuration) * BigInt(getValueFromNat(rawData.rentalFeePerUnitAmount));

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
                RentalFee: AmountMath.make(rawData.rentalFeePerUnitAmount.brand, rentalFeeValue),
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
            snackBarUpdater('error', 'Offer with error');
            console.log('ERROR', data);
        }
        if (status === 'seated') {
            snackBarUpdater('secondary', 'Transaction submitted');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
        }
        if (status === 'refunded') {
            snackBarUpdater('warning', 'Transaction refunded');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
        }
        if (status === 'accepted') {
            snackBarUpdater('success', 'Offer accepted');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
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

const buildUpdateRentalConfigOfferSpec = (rental, rawUpdates) => {
    const { wallet } = useStore.getState();

    assert(wallet && wallet.address, `Wallet must be defined: ${wallet}`);
    assert(rental, `Rental must be defined: ${rental}`);

    const rentalConfig = rental.configuration;

    const overrides = updateMapper(rawUpdates, rentalConfig.collateralAmount.brand, rentalConfig.rentalFeePerUnitAmount.brand);
    console.log({
        overrides
    });

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
                ...rentalConfig,
                ...overrides,
            }
        }
    });
};
harden(buildUpdateRentalConfigOfferSpec);

const updateMapper = (rawUpdates, collateralBrand, rentalFeeBrand) => {

    const overrides = {};

    if (rawUpdates.collateralVal) {
        overrides.collateralAmount = AmountMath.make(collateralBrand, BigInt(rawUpdates.collateralVal));
    }

    if (rawUpdates.rentalFeePerUnitVal) {
        overrides.rentalFeePerUnitAmount = AmountMath.make(rentalFeeBrand, BigInt(rawUpdates.rentalFeePerUnitVal));
    }

    if (rawUpdates.rentingDurationUnit) {
        overrides.rentingDurationUnit = rawUpdates.rentingDurationUnit;
    }

    if (rawUpdates.minRentingDurationUnits) {
        overrides.minRentingDurationUnits = BigInt(+rawUpdates.minRentingDurationUnits);
    }

    if (rawUpdates.maxRentingDurationUnits) {
        overrides.maxRentingDurationUnits = BigInt(+rawUpdates.maxRentingDurationUnits);
    }

    if (rawUpdates.gracePeriodDuration) {
        overrides.gracePeriodDuration = BigInt(+rawUpdates.gracePeriodDuration);
    }

    return overrides;

};

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

const isNumeric = (str) => {
    if (typeof str != "string") return false;
    return !isNaN(str) &&
        !isNaN(parseFloat(str));
};

const isSet = amount => {
    const { value } = AmountMath.makeEmptyFromAmount(amount);
    return typeof value !== 'bigint';
};

const makeRentalConfigValidator = (errorRecordState, setErrorRecord, validations) => {

    const updateResult = (errors) => {
        const validated = {
            ...errorRecordState,
            ...errors
        };

        setErrorRecord(validated);
    };

    const validate = () => {
        const errors = {};
        let result = false;
        [...Object.entries(validations)].forEach(([key, value]) => {
            switch (key) {
                case RentalConfigKeywords.UTILITY_AMOUNT_INDEX:
                    errors[key] = !(value !== undefined && typeof value === 'number' && value >= 0);
                    result = result === true ? result : errors[key];
                    break;
                case RentalConfigKeywords.MIN_RENTING_DURATION_UNITS:
                case RentalConfigKeywords.MAX_RENTING_DURATION_UNITS:
                case RentalConfigKeywords.GRACE_PERIOD_DURATION:
                case RentalConfigKeywords.RENTING_DURATION:
                    errors[key] = !(isNumeric(value) && checkPositiveNumber(value));
                    result = result === true ? result : errors[key];
                    break;
                case RentalConfigKeywords.UTILITY_DESCRIPTION:
                case RentalConfigKeywords.UTILITY_TITLE:
                    errors[key] = (value === "" || value === null || value === undefined)
                    result = result === true ? result : errors[key];
                    break;
                case RentalConfigKeywords.UTILITY_BRAND:
                case RentalConfigKeywords.RENTAL_FEE_BRAND:
                case RentalConfigKeywords.COLLATERAL_BRAND:
                    errors[key] = !(value && typeof value === 'object');
                    break;
                case RentalConfigKeywords.COLLATERAL_VAL:
                case RentalConfigKeywords.RENTAL_FEE_PER_UNIT_VAL:
                    errors[key] = !(value && typeof value === 'bigint');
                    break;
            }
        });

        updateResult(errors);

        return !result;
    }

    return harden({
        validate
    });
};

const displayAmount = amount => {
    const { brand, value } = amount;
    const { getDisplayInfo } = useStore.getState();
    const displayInfo = getDisplayInfo(brand);

    if (!displayInfo) return '';

    const { assetKind, decimalPlaces } = displayInfo;
    return stringifyValue(value, assetKind, decimalPlaces);
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
    makeRentalConfigValidator,
    isNumeric,
    isSet,
    displayAmount,
};