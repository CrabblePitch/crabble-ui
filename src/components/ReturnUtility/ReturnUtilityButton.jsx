import useStore from "../../store/store.js";
import { buildReturnUtilityOfferSpec, makeGenericOnStatusUpdate } from "../../utils/helpers.js";
import { Button } from "@mui/material";
import { RentalPhase } from "../../utils/constants.js";

const ReturnUtilityButton = ({ rental, controllers, disabled, onButtonClick, styles }) => {
    const wallet = useStore(state => state.wallet);
    const notifyUser = useStore(state => state.notifyUser);

    const { onStatusChange } = makeGenericOnStatusUpdate(notifyUser, () => console.log('BYPASS'));
    const offerSpec = buildReturnUtilityOfferSpec(rental);

    const handleClick = () => {
        if (onButtonClick) {
            onButtonClick();
        }

        assert(wallet, `Wallet not defined: ${wallet}`);
        assert(offerSpec, `OfferSpec not defined: ${offerSpec}`);

        void wallet.makeOffer(offerSpec.invitationSpec, offerSpec.proposal,
            offerSpec.offerArgs, onStatusChange, offerSpec.id);
    };

    return (
        <Button
            disabled={rental.phase === RentalPhase.RENTED}
            sx={{
                ...styles,
                ':disabled': { color: 'onSurfaceTextDark.main', bgcolor: 'secondary.dark' }
            }}
            fullWidth
            variant={"contained"}
            color={"secondary"}
            onClick={handleClick}
        >
            Return Utility
        </Button>
    );
};
