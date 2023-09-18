import useStore from '../../store/store.js';
import { buildUpdateRentalConfigOfferSpec, makeGenericOnStatusUpdate } from '../../utils/helpers.js';
import { Button } from '@mui/material';

export const UpdateRentalConfigButton = ({ rental, overrides, controllers }) => {
    const wallet = useStore((state) => state.wallet);

    // TODO: to be uncommented
    // const { onStatusChange } = makeGenericOnStatusUpdate(controllers.snackbar, controllers.modal);
    // const offerSpec = buildUpdateRentalConfigOfferSpec(rental, overrides);

    // const handleClick = () => {
    //     assert(wallet, `Wallet not defined: ${wallet}`);
    //     assert(offerSpec, `OfferSpec not defined: ${offerSpec}`);
    //
    //     void wallet.makeOffer(
    //         offerSpec.invitationSpec,
    //         offerSpec.proposal,
    //         offerSpec.offerArgs,
    //         onStatusChange,
    //         offerSpec.id,
    //     );
    // };

    return (
        <Button variant={'contained'} color={'secondary'} onClick={() => {}}>
            Update Rental Config
        </Button>
    );
};
