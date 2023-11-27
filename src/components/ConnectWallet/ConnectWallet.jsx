import { makeAgoricWalletConnection, suggestChain } from '@agoric/web-components';
import useStore from '../../store/store.js';
import { Button } from "@mui/material";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import { getNetworkHref } from "../../utils/helpers.js";

export const ConnectWallet = () => {
    const watcher = useStore((state) => state.watcher);

    const connectWallet = async () => {
        // TODO: Comment for going next page
        await suggestChain(getNetworkHref());
        console.log({ watcher });
        const wallet = await makeAgoricWalletConnection(watcher);
        useStore.setState({ wallet });
        console.log('Wallet fetched', {
            wallet,
        });
    };

    return (
        <Button
            variant="contained"
            startIcon={<WalletOutlinedIcon />}
            onClick={connectWallet}
            color={"secondary"}
            sx={{ textTransform: 'none'}}
        >
            connect wallet
        </Button>
    );
};
