import { AmountMath } from "@agoric/ertp";
import useStore from "./store.js";
import { AgoricChainStoragePathKind } from "@agoric/rpc";

const buildMintOfferSpec = (rawData, keyword) => {
    const { wallet, getBrand } = useStore.getState();
    const brand = getBrand(keyword);

    if (!wallet || !brand) {
        console.log({ wallet, brand });
        throw new Error(`No wallet data`);
    }

    const wantedAmount = AmountMath.make(brand, harden([rawData]));

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

export {
    buildMintOfferSpec,
    makeStorageWatcher,
}