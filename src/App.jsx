import { useState } from 'react'
import agoricLogo from './assets/agoric-logo.png'
import './App.css'
import OfferSignerBridge from "./OfferSignerBridge.jsx";
import { ConnectWallet } from "./ConnectWallet.jsx";

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
    const [address, setAddress] = useState('');
    const [chainId, setChainId] = useState('');

    return (
        <>
            <div>
                <a href="https://docs.agoric.com/guides/getting-started/" target="_blank">
                    <img src={agoricLogo} className="logo" alt="Agoric logo"/>
                </a>
            </div>
            <h1>Agoric + React</h1>
            <ConnectWallet setAddress={setAddress} setChainId={setChainId}/>
            <p className="read-the-docs">
                Click on the Agoric logo to learn more
            </p>
            <OfferSignerBridge address={address} chainId={chainId}/>
        </>
    )
}

export default App
