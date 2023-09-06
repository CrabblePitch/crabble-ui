import agoricLogo from '../../assets/agoric-logo.png';
// import { makeAgoricWalletConnection, suggestChain } from '@agoric/web-components';
import useStore from '../../store/store.js';

export const ConnectWallet = () => {
    // const watcher = useStore((state) => state.watcher);

    const connectWallet = async () => {
        // await suggestChain('https://local.agoric.net/network-config');
        // const wallet = await makeAgoricWalletConnection(watcher);
        // TODO: Change back until 'suggestChain' issue is resolved
        useStore.setState({ wallet: 'Something' });
        // console.log('Wallet fetched', {
        //     wallet,
        // });
    };

    return (
        <div className="connect-wallet">
            <div>
                <a href="https://docs.agoric.com/guides/getting-started/" target="_blank" rel="noreferrer">
                    <img src={agoricLogo} className="logo" alt="Agoric logo" />
                </a>
            </div>

            <h1>Agoric + React</h1>

            <div className="card">
                <button onClick={connectWallet}>Connect Wallet</button>
                <p>This template for Web UIs for Agoric Smart Contracts</p>
            </div>

            <p>
                Click 'Connect Wallet' to start interacting with Agoric Blockchain. Nothing will happen if you already
                approved this web app from your wallets. If you haven't you need to approve it from both Keplr and
                Agoric wallet.
            </p>
            <p>To see data coming from blockchain open the browser console and filter 'VSTORAGE'</p>
            <p className="read-the-docs">Click on the Agoric logo to learn more</p>
        </div>
    );
};
