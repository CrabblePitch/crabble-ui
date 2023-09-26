import { buildWithdrawUtilityOfferSpec } from '../../utils/helpers.js';
import WithdrawButton from './WithdrawButton.jsx';

export const WithdrawUtility = ({ rental, onClose }) => {
    // rental => as is from the storage
    // TODO: to be uncommented
    const offerSpec = buildWithdrawUtilityOfferSpec(rental);
    const message = 'Withdraw Utility';
    const color = 'secondary';

    return <WithdrawButton offerSpec={offerSpec} color={color} onClose={onClose} message={message} />;
};

export default WithdrawUtility;
