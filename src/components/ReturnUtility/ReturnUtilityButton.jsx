import useStore from '../../store/store.js';
import { buildReturnUtilityOfferSpec, makeGenericOnStatusUpdate } from '../../utils/helpers.js';
import { Button } from '@mui/material';

export const ReturnUtilityButton = ({ rental, controllers, disabled, onButtonClick }) => {
    // const wallet = useStore((state) => state.wallet);

    // const { onStatusChange } = makeGenericOnStatusUpdate(controllers.snackbar, controllers.modal);
    // const offerSpec = buildReturnUtilityOfferSpec(rental);

    const handleClick = () => {
        if (onButtonClick) {
            onButtonClick();
        }

        console.log('popopopopopopo -----');
        // assert(wallet, `Wallet not defined: ${wallet}`);
        // assert(offerSpec, `OfferSpec not defined: ${offerSpec}`);
        // void wallet.makeOffer(
        //     offerSpec.invitationSpec,
        //     offerSpec.proposal,
        //     offerSpec.offerArgs,
        //     onStatusChange,
        //     offerSpec.id,
        // );
        console.log('pupupu');
    };

    return (
        <Button variant={'contained'} color={'primary'} onClick={handleClick} disabled={disabled}>
            Return Utility
        </Button>
    );
};
