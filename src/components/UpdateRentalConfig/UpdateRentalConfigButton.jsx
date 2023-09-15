import useStore from '../../store/store.js';
import { buildUpdateRentalConfigOfferSpec, makeGenericOnStatusUpdate } from '../../utils/helpers.js';
import { Button } from '@mui/material';

export const UpdateRentalConfigButton = ({ rental, overrides, controllers }) => {
    const wallet = useStore((state) => state.wallet);

    const { onStatusChange } = makeGenericOnStatusUpdate(controllers.snackbar, controllers.modal);
    const offerSpec = buildUpdateRentalConfigOfferSpec(rental, overrides);

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
        <Button variant={'contained'} color={'secondary'} onClick={handleClick}>
            Update Rental Config
        </Button>
    );
};

export default UpdateRentalConfigButton;
