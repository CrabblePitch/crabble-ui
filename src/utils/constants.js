const Rental_Keywords = harden({
    CREATE: 'create',
    BORROW: 'borrow',
});

const RentalPhase = harden({
   AVAILABLE: 'available',
   RENTED: 'rented',
   LIQUIDATED: 'liquidation',
   GRACE_PERIOD: 'gracePeriod',
   REMOVED: 'removed',
});

const RentalConfigKeywords = harden({
    UTILITY_AMOUNT_INDEX: 'utilityAmountIndex',
    COLLATERAL_VAL: 'collateralVal',
    RENTAL_FEE_PER_UNIT_VAL: 'rentalFeePerUnitVal',
    UTILITY_TITLE: 'utilityTitle',
    UTILITY_DESCRIPTION: 'utilityDescription',
    RENTING_TIER: 'rentingTier',
    RENTING_DURATION_UNIT: 'rentingDurationUnit',
    MIN_RENTING_DURATION_UNITS: 'minRentingDurationUnits',
    MAX_RENTING_DURATION_UNITS: 'maxRentingDurationUnits',
    GRACE_PERIOD_DURATION: 'gracePeriodDuration',
    RENTING_DURATION: 'rentingDuration',
    UTILITY_BRAND: 'utilityBrand',
    RENTAL_FEE_BRAND: 'rentalFeeBrand',
    COLLATERAL_BRAND: 'collateralBrand',
});

const ErrorMessages = harden({
    UTILITY_AMOUNT_INDEX: 'You must choose an NFT!',
    NUMERIC: 'The entry must enter a number!',
    STRING: 'The entry must enter a string!',
    BRAND: 'You must specify a brand!'
});

const EmptyTexts = harden({
   CATALOG: 'Oops... Looks like noone wants to rent their NFTs at the moment',
   OWNED_RENTALS: 'Oops... You haven\'t rented anything yet',
   BORROWED_RENTALS: 'Oops... You haven\'t borrowed anything yet',
});

export {
    Rental_Keywords,
    RentalPhase,
    RentalConfigKeywords,
    ErrorMessages,
    EmptyTexts,
}