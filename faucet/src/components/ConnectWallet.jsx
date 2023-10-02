import { makeAgoricWalletConnection, suggestChain } from '@agoric/web-components';
import useStore from '../store.js';
import { Button } from "@mui/material";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';

const ConnectWallet = () => {
    const watcher = useStore((state) => state.watcher);

    const connectWallet = async () => {
        // TODO: Comment for going next page
        await suggestChain('https://devnet.agoric.net/network-config');
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
        >
            Connect Wallet
        </Button>
    );
};

export default ConnectWallet;