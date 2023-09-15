import WithdrawButton from "./WithdrawButton.jsx";
import { buildWithdrawCollateralOfferSpec } from "../../utils/helpers.js";

const WithdrawCollateral = ({ rental, controllers }) => {
    // rental => as is from the storage
    const offerSpec = buildWithdrawCollateralOfferSpec(rental);
    const message = 'Withdraw Collateral';
    const color = 'error';

    return (
        <WithdrawButton offerSpec={offerSpec} color={color} controllers={controllers} message={message}/>
    )
};

export default WithdrawCollateral;