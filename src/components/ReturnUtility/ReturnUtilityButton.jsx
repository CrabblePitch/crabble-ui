import useStore from "../../store/store.js";
import { buildReturnUtilityOfferSpec, makeGenericOnStatusUpdate } from "../../utils/helpers.js";
import { Button } from "@mui/material";

const ReturnUtilityButton = ({ rental, controllers }) => {
    const wallet = useStore(state => state.wallet);

    const { onStatusChange } = makeGenericOnStatusUpdate(controllers.snackbar, controllers.modal);
    const offerSpec = buildReturnUtilityOfferSpec(rental);

    const handleClick = () => {
        assert(wallet, `Wallet not defined: ${wallet}`);
        assert(offerSpec, `OfferSpec not defined: ${offerSpec}`);

        void wallet.makeOffer(offerSpec.invitationSpec, offerSpec.proposal,
            offerSpec.offerArgs, onStatusChange, offerSpec.id);
    };

    return (
        <Button variant={"contained"} color={"primary"} onClick={handleClick}>
            Return Utility
        </Button>
    );
};

export default ReturnUtilityButton;