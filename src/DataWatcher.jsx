import { useEffect } from "react";
import { makeAsyncIterableFromNotifier as iterateNotifier } from '@agoric/notifier';

const watchPurses = chainConnection => {
    let isCancelled = false;

    const watch = async () => {
        const n = chainConnection.pursesNotifier;

        for await (const purses of iterateNotifier(n)) {
            if (isCancelled) return;
            console.log('VSTORAGE - Purse Update', purses);
        }
    };
    watch().catch(err => {
        console.error('VSTORAGE - Purse Error', err);
    });

    return () => {
        isCancelled = true;
    };
};

const watchTestData = chainStorageWatcher => {

    const watch = () => {
        return chainStorageWatcher.watchLatest(
            ['data', 'published.agoricNames.vbankAsset'],
            value => {
                console.log('VSTORAGE - Issuer Update', { value })
            },
            log => {
                console.error('VSTORAGE - Issuer Error', log);
            }
        )
    }

    const stopWatching = watch();

    return () => stopWatching();
};

const DataWatcher = ({ agoricFrontendContext }) => {

    useEffect(() => {
        if (!agoricFrontendContext.chainStorageWatcher || !agoricFrontendContext.connection) return;

        watchTestData(agoricFrontendContext.chainStorageWatcher);
        watchPurses(agoricFrontendContext.connection);
    })

    return (
        <div style={{'display': 'none'}}>
            Data Watcher
        </div>
    )
};

export default DataWatcher;