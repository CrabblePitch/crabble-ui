import { useEffect } from 'react';
import agoricLogo from './assets/agoric-logo.png';
import './App.css';
import { ConnectWallet } from './ConnectWallet.jsx';
import { Home } from './pages/Home/Home.jsx';
import useStore from "./store/store.js";
import { makeStorageWatcher } from "./utils/storageWatcher.js";
import CreateRentalKeplr from "./CreateRentalKeplr.jsx";

function App() {
    console.log('App!!!')
    const wallet = useStore(state => state.wallet);

    useEffect(() => {
        const storageWatcher = makeStorageWatcher();
        storageWatcher.startWatching();
    }, [wallet]);

    return (
        <>
            <div>
                <a href="https://docs.agoric.com/guides/getting-started/" target="_blank">
                    <img src={agoricLogo} className="logo" alt="Agoric logo"/>
                </a>
            </div>
            <h1>Agoric + React</h1>
            <ConnectWallet />
            <p>
                Click 'Connect Wallet' to start interacting with Agoric Blockchain. Nothing will happen if you already
                approved this web app from your wallets. If you haven't you need to approve it from both Keplr and
                Agoric wallet.
            </p>
            <p>
                To see data coming from blockchain open the browser console and filter 'VSTORAGE'
            </p>
            <p className="read-the-docs">
                Click on the Agoric logo to learn more
            </p>
            <CreateRentalKeplr/>
            <Home/>
        </>
    );
}

export default App;
