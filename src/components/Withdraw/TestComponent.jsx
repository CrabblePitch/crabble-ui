import { Stack } from '@mui/material';
import { WithdrawUtility } from './WithdrawUtility.jsx';
import useStore from '../../store/store.js';
import { WithdrawRentalFee } from './WithdrawRentalFee.jsx';
import { WithdrawCollateral } from './WithdrawCollateral.jsx';
import ReturnUtilityButton from '../ReturnUtility/ReturnUtilityButton.jsx';
import { UpdateRentalConfigButton } from '../UpdateRentalConfig/UpdateRentalConfigButton.jsx';

const TestComponent = () => {
    const getOwnedRentals = useStore((state) => state.getOwnedRentals);
    const getBorrowedRentals = useStore((state) => state.getBorrowedRentals);

    const ownedRentals = getOwnedRentals();
    const borrowedRentals = getBorrowedRentals();

    console.log('TestComponent', { ownedRentals, borrowedRentals });

    const ownedRental = ownedRentals.at(0);
    const borrowedRental = borrowedRentals.at(0);

    const overrides = {
        maxRentingDurationUnits: 15n,
        utilityTitle: 'Awesome Title',
        utilityDescription: 'Awesome Description',
        gracePeriodDuration: 131n,
    };

    const controllers = {
        snackbar: console.log,
        modal: () => console.log('This is not a modal'),
    };

    return (
        <Stack direction="row" spacing={2}>
            {ownedRental && <WithdrawUtility rental={ownedRental} controllers={controllers} />}
            {ownedRental && <WithdrawRentalFee rental={ownedRental} controllers={controllers} />}
            {ownedRental && <WithdrawCollateral rental={ownedRental} controllers={controllers} />}
            {ownedRental && (
                <UpdateRentalConfigButton rental={ownedRental} overrides={overrides} controllers={controllers} />
            )}
            {borrowedRental && <ReturnUtilityButton rental={borrowedRental} controllers={controllers} />}
        </Stack>
    );
};

export default TestComponent;
