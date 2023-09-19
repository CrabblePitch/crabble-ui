import { buildWithdrawRentalFeeOfferSpec } from '../../utils/helpers.js';
import WithdrawButton from './WithdrawButton.jsx';

export const WithdrawRentalFee = ({ rental, controllers }) => {
    // rental => as is from the storage
    // TODO: to be uncommented
    const offerSpec = buildWithdrawRentalFeeOfferSpec(rental);
    const message = 'Withdraw Rental Fee';
    const color = 'primary';

    return <WithdrawButton offerSpec={offerSpec} color={color} controllers={controllers} message={message} />;
};
