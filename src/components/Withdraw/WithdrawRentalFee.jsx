import { buildWithdrawRentalFeeOfferSpec } from '../../utils/helpers.js';
import WithdrawButton from './WithdrawButton.jsx';

export const WithdrawRentalFee = ({ rental, onClose }) => {
    // rental => as is from the storage
    // TODO: to be uncommented
    const offerSpec = buildWithdrawRentalFeeOfferSpec(rental);
    const message = 'Withdraw Rental Fee';
    const color = 'secondary';

    return <WithdrawButton offerSpec={offerSpec} color={color} onClose={onClose} message={message} />;
};
