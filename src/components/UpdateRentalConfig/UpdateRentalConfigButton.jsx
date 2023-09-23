import useStore from '../../store/store.js';
import { buildUpdateRentalConfigOfferSpec, makeGenericOnStatusUpdate } from '../../utils/helpers.js';
import { Button } from '@mui/material';
import { RentalPhase } from "../../utils/constants.js";

export const UpdateRentalConfigButton = ({ rental, controllers, onClose }) => {
    const wallet = useStore((state) => state.wallet);
    const notifyUser = useStore((state) => state.notifyUser);

    const {
        validate, helper: {
            buildOverrides,
            checkForChange
        }
    } = controllers;
    // TODO: to be uncommented
    const { onStatusChange } = makeGenericOnStatusUpdate(notifyUser, onClose);


    const handleClick = () => {
        const overrides = buildOverrides();
        if (!validate()) {
            console.log('Something wrong', overrides);
            return;
        }
        if (!checkForChange(overrides)) {
            console.log('Please change a parameter', overrides);
            return;
        }

        const offerSpec = buildUpdateRentalConfigOfferSpec(rental, overrides);
        console.log({
            offerSpec
        })

        // assert(wallet, `Wallet not defined: ${wallet}`);
        // assert(offerSpec, `OfferSpec not defined: ${offerSpec}`);
        //
        void wallet.makeOffer(
            offerSpec.invitationSpec,
            offerSpec.proposal,
            offerSpec.offerArgs,
            onStatusChange,
            offerSpec.id,
        );
    };

    return (
        <Button
            variant={'contained'}
            color={'primary'}
            onClick={handleClick}
            disabled={!(rental.phase === RentalPhase.AVAILABLE)}
            sx={{
                display: rental.phase === RentalPhase.LIQUIDATED ? 'none' : '',
                ':disabled': { color: 'onSurfaceTextDark.main' }
            }}
        >
            Update Rental Config
        </Button>
    );
};
