import { buildWithdrawUtilityOfferSpec } from '../../utils/helpers.js';
import WithdrawButton from './WithdrawButton.jsx';

export const WithdrawUtility = ({ rental, controllers }) => {
    // rental => as is from the storage
    const offerSpec = buildWithdrawUtilityOfferSpec(rental);
    const message = 'Withdraw Utility';
    const color = 'success';

    return <WithdrawButton offerSpec={offerSpec} color={color} controllers={controllers} message={message} />;
};

export default WithdrawUtility;
