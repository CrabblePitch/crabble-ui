import useStore from "../store/store.js";
import { AgoricChainStoragePathKind } from "@agoric/rpc";
import { subscribeLatest } from "@agoric/notifier";

const makeStorageWatcher = () => {
    const {
        watcher,
        wallet,
        crabbleInstance,
        registerRentals,
        updateBrands,
        updateVBank,
        updateBrandToDisplayInfo,
        updateSmartWallet,
    } = useStore.getState();

    const watchSmartWallet = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Data, `published.wallet.${wallet.address}.current`],
            smartWalletData => {
                console.log('SmartWallet Update', smartWalletData);
                updateSmartWallet(smartWalletData);
            },
            log => {
                console.log('ERROR: Watching smart wallet purses', log);
            }
        )
    };

    const watchVBankPurses = async () => {
        for await (const purses of subscribeLatest(wallet.pursesNotifier)) {
            console.log('VBANK Purse Update', purses);
            updateVBank(purses);
        }
    };

    const watchBrands = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Data, 'published.agoricNames.brand'],
            async brands => {
                console.log('Brand Update', brands);
                await updateBrands(brands);
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

    const watchCrabbleChildren = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Children, 'published.crabble'],
            children => {
                console.log('Children Update', children);
                registerRentals(children);
            },
            err => {
                console.log('Children Error', err)
            }
        );
    };

    const watchBoardAux = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Children, 'published.boardAux'],
            children => {
                console.log('Children Update', children);
                updateBrandToDisplayInfo(children);
            },
            err => {
                console.log('Children Error', err)
            }
        );
    };

    const queryCrabbleInstance = async () => {
        const instances = await watcher.queryOnce([
            AgoricChainStoragePathKind.Data,
            `published.agoricNames.instance`]);
        const [, crabbleInstance] = [...instances].find(([name]) => name === 'Crabble');
        console.log('Crabble Instance: ', crabbleInstance);
        useStore.setState({
            crabbleInstance
        });
    };

    const startWatching = () => {
        if (!watcher) return;

        if (wallet) {
            watchSmartWallet();
            watchVBankPurses().catch(err => console.log('ERROR', err));
        }

        if (!crabbleInstance) {
            queryCrabbleInstance()
                .then(() => console.log('Done fetching crabbleInstance'))
                .catch(e => console.error('Done fetching crabbleInstance: ', e));
        }

        watchBrands();
        watchInstances();
        watchCrabbleChildren();
        watchBoardAux();
    };

    return { startWatching };
}

export { makeStorageWatcher };