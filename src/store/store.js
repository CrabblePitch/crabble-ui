import { create } from 'zustand';
import { makeAgoricChainStorageWatcher } from '@agoric/rpc';

const useStore = create((set) => ({
    watcher: makeAgoricChainStorageWatcher('http://localhost:26657', 'agoriclocal'),
    brands: [],
    smartWalletPurses: [],
    wallet: null,
    crabbleInstance: null,
}));

export default useStore;
