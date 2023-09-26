import { Button } from '@mui/material';
import { makeGenericOnStatusUpdate } from '../../utils/helpers.js';
import useStore from '../../store/store.js';

export const WithdrawButton = ({ offerSpec, message, color, onClose }) => {
    const wallet = useStore((state) => state.wallet);
    const notifyUser = useStore((state) => state.notifyUser);

    const { onStatusChange } = makeGenericOnStatusUpdate(notifyUser, onClose);

    const handleClick = () => {
        assert(wallet, `Wallet not defined: ${wallet}`);
        assert(offerSpec, `OfferSpec not defined: ${offerSpec}`);

        void wallet.makeOffer(
            offerSpec.invitationSpec,
            offerSpec.proposal,
            offerSpec.offerArgs,
            onStatusChange,
            offerSpec.id,
        );
    };

    return (
        <Button variant={'contained'} color={color} onClick={handleClick} sx={{ textTransform: 'none', ml: 1 }}>
            {message}
        </Button>
    );
};

export default WithdrawButton;
