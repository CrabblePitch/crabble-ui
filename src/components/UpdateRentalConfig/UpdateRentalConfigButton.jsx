import useStore from '../../store/store.js';
import { buildUpdateRentalConfigOfferSpec, makeGenericOnStatusUpdate } from '../../utils/helpers.js';
import { Button } from '@mui/material';
import { RentalPhase } from "../../utils/constants.js";

export const UpdateRentalConfigButton = ({ rental, overrides, controllers = false }) => {
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
        <Button
            variant={'contained'}
            color={'secondary'}
            onClick={() => {}} disabled={!(rental.phase === RentalPhase.AVAILABLE)}
            sx={{
                display: rental.phase === RentalPhase.LIQUIDATED ? 'none' : '',
                ':disabled': { color: 'onSurfaceTextDark.main' }
            }}
        >
            Update Rental Config
        </Button>
    );
};
