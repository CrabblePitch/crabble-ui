// import './App.scss';

import { useEffect } from 'react';
import useStore from './store/store.js';
import { Home } from './pages/Home/Home.jsx';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet.jsx';
import { makeStorageWatcher } from './utils/storageWatcher.js';
import { Box } from "@mui/material";
import UserNotifier from "./components/UserNotifier.jsx";

export const App = () => {
    console.log('App!!!');
    const wallet = useStore((state) => state.wallet);

    useEffect(() => {
        const storageWatcher = makeStorageWatcher();
        storageWatcher.startWatching();
    }, [wallet]);

    return (
        <>
            <Box sx={{ height: '100%', bgcolor: 'surface.main', overflow: 'auto' }} className='APP'>
                {/*{!wallet && <ConnectWallet/>}*/}
                {/*{wallet && <Home/>}*/}
                <Home/>
                <UserNotifier/>
            </Box>
        </>

    );
};
