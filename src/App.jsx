import './App.css';

import { useEffect } from 'react';
import useStore from './store/store.js';
import { Home } from './pages/Home/Home.jsx';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet.jsx';
import { makeStorageWatcher } from './utils/storageWatcher.js';
import { SnackbarProvider } from './components/SnackbarProvider/SnackbarProvider.jsx';

export const App = () => {
    console.log('App!!!');
    const wallet = useStore((state) => state.wallet);

    useEffect(() => {
        const storageWatcher = makeStorageWatcher();
        storageWatcher.startWatching();
    }, [wallet]);

    return (
        <>
            <SnackbarProvider>
                {!wallet && <ConnectWallet />}
                {wallet && <Home />}
            </SnackbarProvider>
        </>
    );
};
