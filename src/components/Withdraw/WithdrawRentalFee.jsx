import { buildWithdrawRentalFeeOfferSpec } from "../../utils/helpers.js";
import WithdrawButton from "./WithdrawButton.jsx";

const WithdrawRentalFee = ({ rental, controllers}) => {
    // rental => as is from the storage
    const offerSpec = buildWithdrawRentalFeeOfferSpec(rental);
    const message = 'Withdraw Rental Fee';
    const color = 'primary';

    return (
        <WithdrawButton offerSpec={offerSpec} color={color} controllers={controllers} message={message}/>
    )
};

export default WithdrawRentalFee;