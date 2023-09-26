const catalogData = [...new Array(30)].fill({
    collateralAmount: { value: 100n},
    rentalFeePerUnitAmount: { value: 10n},
    utilityAmount: {
        brand: {},
        value: [
            {
                accessKeyHash: 'bf34q7hiufb3',
                address: 'Sesame Street n123456',
                id: '1694682821775',
                imagePath: 'https://sesameworkshop.org/wp-content/uploads/2023/03/SesameStreetShow_small.png',
                organization: 'Airbnb rental',
            },
        ],
    },
    utilityTitle: 'House',
    utilityDescription : 'Family house available for vacations',
    rentingTier: 'Ad-Hoc',
    rentingDurationUnit: 'minute',
    minRentingDurationUnits: 1n,
    maxRentingDurationUnits: 60n,
    gracePeriodDuration: 10n * 60n, // 10 mins grace period,
    phase: 'available',
    rentalHandle: {}
});
harden(catalogData);

const brandData = harden([
    ["AwesomeCollection", {}],
    ["GreatMonkeys", {}],
    ["GatingHub", {}],
]);
export {
    catalogData,
    brandData,
}