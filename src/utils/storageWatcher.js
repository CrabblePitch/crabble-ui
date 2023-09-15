import useStore from "../store/store.js";
import { AgoricChainStoragePathKind } from "@agoric/rpc";
import { subscribeLatest } from "@agoric/notifier";

const makeStorageWatcher = () => {
    const { watcher, wallet, registerRentals } = useStore.getState();

    const watchSmartWallet = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Data, `published.wallet.${wallet.address}.current`],
            smartWalletData => {
                console.log('SmartWallet Update', smartWalletData);
                registerRentals(smartWalletData.offerToPublicSubscriberPaths);
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

    const watchCatalog = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Data, 'published.crabble.Catalog'],
            catalog => {
                console.log('Catalog Update', catalog);
                useStore.setState({ catalog });
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

        watchSmartWallet();
        watchVBankPurses().catch(err => console.log('ERROR', err));
        watchBrands();
        watchInstances();
        watchCatalog();
    };

    return { startWatching };
}

export { makeStorageWatcher };