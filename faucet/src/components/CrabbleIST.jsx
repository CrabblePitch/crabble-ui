import { Box, Button, Input, Stack, Typography } from '@mui/material';
import { useState } from "react";
import { parseAsValue, stringifyValue } from "@agoric/ui-components";
import { AssetKind } from "@agoric/ertp";
import { buildMintOfferSpec, makeOnStatusChange } from "../helpers.js";
import useStore from "../store.js";

const CrabbleIST = () => {
    const wallet = useStore(state => state.wallet);
    const notifyUser = useStore(state => state.notifyUser);
    const [istValue, setIstValue] = useState(0n);

    const onStatusChange = makeOnStatusChange(notifyUser);

    const handleChange = (ev) => {
        const str = ev.target.value;
        const parsed = parseAsValue(str, AssetKind.NAT, 6);
        setIstValue(parsed);
    }

    const handleClick = () => {
        const offerSpec = buildMintOfferSpec(istValue, 'CrabbleIST');
        console.log({ offerSpec });

        void wallet.makeOffer(
            offerSpec.invitationSpec,
            offerSpec.proposal,
            offerSpec.offerArgs,
            onStatusChange,
            offerSpec.id,
        );
        setIstValue(0n);
    };

    return (
        <Box sx={{width: 1, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <Stack sx={{mb: 32}} alignItems={"center"}>
                <Typography variant={"h5"} color={"onSurfaceText"}>
                    Mint some CrabbleIST to spend on Crabble!
                </Typography>
                <Input
                    value={stringifyValue(istValue, AssetKind.NAT, 6)}
                    onChange={handleChange}
                    placeholder="Hello world"

                    sx={{
                        mt: 3,
                        color: 'onSurfaceTextDark.main',
                        border: 1,
                        borderColor: 'onSurfaceText.main',
                        borderRadius: 1, p: 1
                    }}
                />
                <Button variant={"contained"} color={"secondary"} sx={{mt: 2, width: 200}} onClick={handleClick}>Mint</Button>
            </Stack>

        </Box>
    );
};

export default CrabbleIST;
