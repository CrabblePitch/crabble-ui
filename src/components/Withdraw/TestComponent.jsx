import { Stack } from "@mui/material";
import WithdrawUtility from "./WithdrawUtility.jsx";
import useStore from "../../store/store.js";
import WithdrawRentalFee from "./WithdrawRentalFee.jsx";
import WithdrawCollateral from "./WithdrawCollateral.jsx";
import ReturnUtilityButton from "../ReturnUtility/ReturnUtilityButton.jsx";
import UpdateRentalConfigButton from "../UpdateRentalConfig/UpdateRentalConfigButton.jsx";

const TestComponent = () => {
    const rental = useStore(state => state.rental);

    if (!rental) return;

    const updatedRental = {
        id: "createRentalKeplr-agoric1ag5a8lhn00h4u9h2shpfpjpaq6v4kku54zk69m-1694607766669",
        ...rental
    };

    const overrides = {
        maxRentingDurationUnits: 15n,
        utilityTitle: 'Awesome Title',
        utilityDescription: 'Awesome Description',
        gracePeriodDuration: 131n,
    };

    const updatedRentalReturn = {
      id: "borrow-adhoc-agoric1sz0dv3882757e49nsplcy89r23wwv3uqj9ttyf-1694607010477",
      ...rental,
    };

    const controllers = {
        snackbar: console.log,
        modal: () => console.log('This is not a modal'),
    };

    return (
        <Stack direction="row" spacing={2}>
            <WithdrawUtility rental={updatedRental} controllers={controllers}/>
            <WithdrawRentalFee rental={updatedRental} controllers={controllers}/>
            <WithdrawCollateral rental={updatedRental} controllers={controllers}/>
            <ReturnUtilityButton rental={updatedRentalReturn} controllers={controllers}/>
            <UpdateRentalConfigButton rental={updatedRental} overrides={overrides} controllers={controllers} />
        </Stack>
    )
};

export default TestComponent;