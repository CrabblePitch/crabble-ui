const Rental_Keywords = harden({
    CREATE: 'create',
    BORROW: 'borrow',
});

const RentalPhase = harden({
   AVAILABLE: 'available',
   RENTED: 'rented',
   LIQUIDATED: 'liquidated',
   GRACE_PERIOD: 'gracePeriod',
   REMOVED: 'removed',
});

export {
    Rental_Keywords,
    RentalPhase,
}