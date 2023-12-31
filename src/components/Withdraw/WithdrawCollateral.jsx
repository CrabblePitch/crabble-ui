import WithdrawButton from './WithdrawButton.jsx';
import { buildWithdrawCollateralOfferSpec } from '../../utils/helpers.js';

export const WithdrawCollateral = ({ rental, onClose }) => {
    // rental => as is from the storage
    // TODO: to be uncommented
    const offerSpec = buildWithdrawCollateralOfferSpec(rental);
    const message = 'Withdraw Collateral';
    const color = 'error';

    return <WithdrawButton offerSpec={offerSpec} color={color} onClose={onClose} message={message} />;
};
