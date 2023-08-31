import { useState } from 'react';
import agoricLogo from './assets/agoric-logo.png';
import './App.css';
import { ConnectWallet } from './ConnectWallet.jsx';
import { makeImportContext } from '@agoric/smart-wallet/src/marshal-contexts.js';
import DataWatcher from './DataWatcher.jsx';
import { Home } from './pages/Home/Home.jsx';

const getAgoricFrontendContext = () => ({
    address: undefined,
    rpcAddress: undefined,
    chainId: undefined,
    importContext: makeImportContext(),
    chainStorageWatcher: undefined,
    connection: undefined,
});

/**
 * Purpose: This component must be able to;
 * - Connect to Keplr
 * - Using the info coming from Keplr, must establish a connection with the agoric wallet
 *
 * To connect to Keplr;
 * - Can establish a chainStorageWatcher(makeAgoricChainStorageWatcher). Required arguments to achieve this;
 *  - A rpc address
 *  - Chain Name
 *  - Unmarshaller: makeImportContext()
 * - Use makeAgoricWalletConnection(chainStorageWatcher) for connecting Keplr
 *
 * It is also possible to connect to Keplr by just using getKeplrAddress from @agoric/web-components where we only
 * need a chainId which we can get from the network-config
 *
 *  Once we have a Keplr connection, we can feed OfferSignerBridge with the required parameters as props so it can
 *  connect to the Agoric wallet.
 *
 *  A working network-config:
 *  {
 *   "chainName": "agoriclocal",
 *   "rpcAddrs": ["http://localhost:26657"]
 *  }
 *
 *  Below props are necessary for OfferSignerBridge:
 *  - address: Get this from Keplr connection
 *  - chainId: Get this from networkConfig
 */
function App() {
    const [agoricFrontendContext, setAgoricFrontendContext] = useState(getAgoricFrontendContext());

    const updateContext = (updateValues) => {
        const newContext = {
            ...agoricFrontendContext,
            ...updateValues,
        };

        setAgoricFrontendContext(newContext);
    };

    return (
        <Home />
        // <>
        //     <div>
        //         <a href="https://docs.agoric.com/guides/getting-started/" target="_blank">
        //             <img src={agoricLogo} className="logo" alt="Agoric logo"/>
        //         </a>
        //     </div>
        //     <h1>Agoric + React</h1>
        //     <ConnectWallet agoricFrontendContext={agoricFrontendContext} updateContext={updateContext} isDappApproved={isDappApproved}/>
        //     <p>
        //         Click 'Connect Wallet' to start interacting with Agoric Blockchain. Nothing will happen if you already
        //         approved this web app from your wallets. If you haven't you need to approve it from both Keplr and
        //         Agoric wallet.
        //     </p>
        //     <p>
        //         To see data coming from blockchain open the browser console and filter 'VSTORAGE'
        //     </p>
        //     <p className="read-the-docs">
        //         Click on the Agoric logo to learn more
        //     </p>
        //     <DataWatcher agoricFrontendContext={agoricFrontendContext} />
        //             <CreateRentalKeplr walletConnection={agoricFrontendContext.connection} chainStorageWatcher={agoricFrontendContext.chainStorageWatcher} />
        //          // </>
    );
}

export default App;
