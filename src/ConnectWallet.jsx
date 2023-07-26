import { fetchChainInfo } from "../helpers.js";
import { networkConfigs } from "../config.js";
import { getKeplrAddress } from "@agoric/web-components/dist/src/getKeplrAddress.js";

export const ConnectWallet = ({ setAddress, setChainId }) => {

    const start = async () => {
        try {
            const { chainName } = await fetchChainInfo(networkConfigs.localhost.url);
            setChainId(chainName);
            console.log({ chainName })

            const keplrAddress = await getKeplrAddress(chainName);
            setAddress(keplrAddress);
            console.log({ keplrAddress })
        } catch (e) {
            console.log({ e });
        }
    };

    return (
        <div className="card">
            <button onClick={start}>
                Connect Wallet
            </button>
            <p>
                This template for Web UIs for Agoric Smart Contracts
            </p>
        </div>
    )
};