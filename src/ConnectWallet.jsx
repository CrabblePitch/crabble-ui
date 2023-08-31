import { fetchChainInfo } from "../helpers.js";
import { networkConfigs } from "../config.js";
import { useEffect } from "react";
import { makeAgoricWalletConnection } from "@agoric/web-components";
import { makeAgoricChainStorageWatcher } from "@agoric/rpc";

export const ConnectWallet = ({ agoricFrontendContext, updateContext, isDappApproved }) => {

    const start = async () => {
        if (!agoricFrontendContext || !agoricFrontendContext.importContext) return;

        try {
            const { chainName, rpc } = await fetchChainInfo(networkConfigs.localhost.url);
            const chainStorageWatcher = makeAgoricChainStorageWatcher(
                rpc,
                chainName,
                e => console.log('ERROR!!!', {
                    e
                }),
            );
            const connection = await makeAgoricWalletConnection(chainStorageWatcher);

            updateContext({
                address: connection.address,
                rpcAddress: rpc,
                chainId: chainName,
                chainStorageWatcher,
                connection,
            });
        } catch (e) {
            console.log({ e });
        }
    };

    useEffect(() => {
        console.log('Wallet Connection', {isDappApproved})
        if (!isDappApproved) return;
        start();
        return () => console.log('Wallet effect done');
    }, [agoricFrontendContext.importContext]);

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