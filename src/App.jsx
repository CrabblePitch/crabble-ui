import './App.scss';

import { useEffect } from 'react';
import useStore from './store/store.js';
import { Home } from './pages/Home/Home.jsx';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet.jsx';
import { makeStorageWatcher } from './utils/storageWatcher.js';
import { NotificationProvider } from './components/NotificationProvider/NotificationProvider.jsx';

export const App = () => {
    console.log('App!!!');
    const wallet = useStore((state) => state.wallet);

    useEffect(() => {
        const storageWatcher = makeStorageWatcher();
        storageWatcher.startWatching();
    }, [wallet]);

    return (
        <NotificationProvider>
            {/*{<ConnectWallet />}*/}
            {<Home />}
        </NotificationProvider>
    );
};
