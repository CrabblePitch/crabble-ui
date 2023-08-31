import { create } from 'zustand'
import { makeAgoricChainStorageWatcher } from "@agoric/rpc";

const useStore = create((set) => ({
    watcher: makeAgoricChainStorageWatcher(
        'http://localhost:26657',
        'agoriclocal'
    ),
}));

export default useStore;