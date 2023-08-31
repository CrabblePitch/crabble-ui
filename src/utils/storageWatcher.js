import useStore from "../store/store.js";
import { AgoricChainStoragePathKind } from "@agoric/rpc";
import { subscribeLatest } from "@agoric/notifier";

const makeStorageWatcher = () => {
    const { watcher, wallet } = useStore.getState();

    const watchSmartWalletPurses = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Data, `published.wallet.${wallet.address}.current`],
            smartWalletData => {
                console.log('SmartWallet Update', smartWalletData)
                useStore.setState({
                    smartWalletPurses: smartWalletData.purses
                });
            },
            log => {
                console.log('ERROR: Watching smart wallet purses', log);
            }
        )
    };

    const watchVBankPurses = async () => {
        for await (const purses of subscribeLatest(wallet.pursesNotifier)) {
            console.log('VBANK Purse Update', purses);
            useStore.setState({ vbankPurses: purses });
        }
    };

    const watchBrands = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Data, 'published.agoricNames.brand'],
            brands => {
                console.log('Brand Update', brands);
                useStore.setState({ brands });
            }
        );
    };

    const watchInstances = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Data, 'published.agoricNames.instance'],
            instances => {
                console.log('Instance Update', instances);
                useStore.setState({
                    crabbleInstance: instances.find(([name]) => name === 'Crabble')?.at(1),
                })
            }
        );
    };

    const startWatching = () => {
        if (!wallet || !watcher) {
            console.log({
                watcher,
                wallet
            });
            return;
        }

        watchSmartWalletPurses();
        watchVBankPurses().catch(err => console.log('ERROR', err));
        watchBrands();
        watchInstances();
    };

    return { startWatching };
}

export { makeStorageWatcher };