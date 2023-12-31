import { create } from 'zustand';
import { makeAgoricChainStorageWatcher } from '@agoric/rpc';

const useStore = create((set, get) => ({
    watcher: null,
    keywordToBrand: {},
    setWatcher: (rpcAddr, chainId) => {
        const watcher = makeAgoricChainStorageWatcher(rpcAddr, chainId);
        set(() => ({ watcher }));
    },
    updateBrands: (brands) => {
        const keywordToBrand = {};
        [...brands].forEach(([keyword, brand]) => keywordToBrand[keyword] = brand);
        set(() => ({ keywordToBrand }));
    },
    getBrand: keyword => {
        const { keywordToBrand } = get();
        return keywordToBrand[keyword];
    },
    notifierState: { open: false, severity: '', message: ''},
    notifyUser: (severity, message) => {
        set( () => ({
            notifierState: { open: true, severity, message }
        }));
    },
    closeNotifier: () => {
        set( () => ({
            notifierState: { open: false, severity: '', message: ''}
        }));
    },
}));

export default useStore;