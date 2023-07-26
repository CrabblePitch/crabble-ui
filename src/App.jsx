import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OfferSignerBridge from "./OfferSignerBridge.jsx";

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
 *  - chainId:
 */
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <OfferSignerBridge/>
    </>
  )
}

export default App
