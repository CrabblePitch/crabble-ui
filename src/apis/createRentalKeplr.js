import { AmountMath } from '@agoric/ertp';
import useStore from '../store/store.js';
import { getBrand, getPurseFromSmartWallet } from '../utils/helpers.js';

export function createRentalKeplr(params) {
    const { walletConnection } = useStore.getState();
    const { crabbleInstance } = useStore.getState();

    const utilityBrand = getBrand('Utility');
    const collateralBrand = getBrand('Collateral');
    const rentalFeeBrand = getBrand('RentalFee');

    if (!utilityBrand || !rentalFeeBrand || !collateralBrand) return;

    const utilityPurse = getPurseFromSmartWallet(utilityBrand);
    console.log({ utilityPurse });
    const utilityAmount = AmountMath.make(utilityBrand, harden([utilityPurse.value[0]]));
    const collateralAmount = AmountMath.make(collateralBrand, params.collateralAmount);
    const rentalFeePerUnitAmount = AmountMath.make(rentalFeeBrand, params.rentalFeeAmount);

    void walletConnection.makeOffer(
        {
            source: 'contract',
            instance: crabbleInstance,
            publicInvitationMaker: 'makeRentalInvitation',
        },
        {
            give: { Utility: utilityAmount },
        },
        {
            rentalConfig: {
                utilityAmount,
                collateralAmount,
                rentalFeePerUnitAmount,
                rentingTier: params.rentingTier,
                rentingDurationUnit: params.rentingDurationUnit,
                minRentingDurationUnits: params.minRentingDurationUnits,
                maxRentingDurationUnits: params.maxRentingDurationUnits,
                gracePeriodDuration: params.gracePeriodDuration,
            },
        },
        ({ status, data }) => {
            if (status === 'error') {
                console.error('Offer error', data);
            }
            if (status === 'seated') {
                console.log('Transaction submitted:', data.txn);
                console.log('Offer id:', data.offerId);
            }
            if (status === 'refunded') {
                console.log('Offer refunded');
            }
            if (status === 'accepted') {
                console.log('Offer accepted');
            }
        },
        'createRentalKeplr',
    );
}
