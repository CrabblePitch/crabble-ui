import { AmountMath } from '@agoric/ertp';
import useStore from '../store/store.js';
import { getBrand, getPurseFromSmartWallet } from '../utils/helpers.js';

export function createRentalKeplr(params) {
    const { crabbleInstance, wallet } = useStore.getState();

    const utilityBrand = getBrand('Utility');
    const collateralBrand = getBrand('Collateral');
    const rentalFeeBrand = getBrand('RentalFee');

    if (!utilityBrand || !rentalFeeBrand || !collateralBrand) return;

    const utilityPurse = getPurseFromSmartWallet(utilityBrand);

    const utilityAmount = AmountMath.make(utilityBrand, harden([utilityPurse.value[params.utilityAmount]]));
    const collateralAmount = AmountMath.make(collateralBrand, params.collateralAmount);
    const rentalFeePerUnitAmount = AmountMath.make(rentalFeeBrand, params.rentalFeeAmount);

    console.log({ utilityPurse, params, collateralAmount, utilityAmount, rentalFeePerUnitAmount });

    wallet.makeOffer(
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
        params.onStatusChange,
        `createRentalKeplr-${wallet.address}-${Date.now()}`,
    );
}
