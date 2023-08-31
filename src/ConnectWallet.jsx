import { makeAgoricWalletConnection, suggestChain } from "@agoric/web-components";
import useStore from "./store/store.js";

const connectWallet = async () => {
    await suggestChain('https://local.agoric.net/network-config');
    const wallet = await makeAgoricWalletConnection(useStore.getState().watcher);
    useStore.setState({ wallet });
    console.log('Wallet fetched', {
        wallet
    })
};

export const ConnectWallet = () => {

    return (
        <div className="card">
            <button onClick={connectWallet}>
                Connect Wallet
            </button>
            <p>
                This template for Web UIs for Agoric Smart Contracts
            </p>
        </div>
    )
};