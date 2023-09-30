import { AmountMath } from "@agoric/ertp";
import useStore from "./store.js";
import { AgoricChainStoragePathKind } from "@agoric/rpc";

const buildMintOfferSpec = (value, keyword) => {
    const { wallet, getBrand } = useStore.getState();
    const brand = getBrand(keyword);

    if (!wallet || !brand) {
        console.log({ wallet, brand });
        throw new Error(`No wallet data`);
    }

    const wantedAmount = AmountMath.make(brand, value);

    return harden({
        id: `mint-${keyword}-${Date.now()}`,
        invitationSpec: {
            source: 'agoricContract',
            instancePath: [`${keyword}Faucet`],
            callPipe: [
                ['makeMintInvitation']
            ]
        },
        proposal: {
            want: {
                [keyword]: wantedAmount,
            }
        },
    });
};
harden(buildMintOfferSpec);

const makeStorageWatcher = () => {
    const { watcher, updateBrands } = useStore.getState();

    const watchBrands = () => {
        watcher.watchLatest(
            [AgoricChainStoragePathKind.Data, 'published.agoricNames.brand'],
            brands => {
                console.log('Brand Update', brands);
                updateBrands(brands);
            }
        );
    };

    const startWatching = () => {
        if (!watcher) {
            return;
        }

        watchBrands();
    };

    return { startWatching };
};
harden(makeStorageWatcher);

const makeOnStatusChange = notifyUser => {
    const onStatusChange = args => {
        console.log({ args });
        const { status, data } = args;

        if (status === 'error') {
            notifyUser('error', 'Offer with error');
            console.log('ERROR', data);
        }
        if (status === 'seated') {
            notifyUser('secondary', 'Transaction submitted');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
        }
        if (status === 'refunded') {
            notifyUser('warning', 'Transaction refunded');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
        }
        if (status === 'accepted') {
            notifyUser('success', 'Offer accepted');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
        }
    };

    return harden(onStatusChange);
};
harden(makeOnStatusChange);

export {
    buildMintOfferSpec,
    makeStorageWatcher,
    makeOnStatusChange,
}