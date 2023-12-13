// import './App.scss';

import { useEffect } from 'react';
import useStore from './store/store.js';
import { Home } from './pages/Home/Home.jsx';
import { makeStorageWatcher } from './utils/storageWatcher.js';
import { Box } from "@mui/material";
import UserNotifier from "./components/UserNotifier.jsx";
import { getNetworkHref } from "./utils/helpers.js";

export const App = () => {
    console.log('App!!!');
    const wallet = useStore((state) => state.wallet);
    const watcher = useStore((state) => state.watcher);
    const crabbleInstance = useStore((state) => state.crabbleInstance);
    const setWatcher = useStore((state) => state.setWatcher);

    useEffect(() => {
        const initWatcher = () => {
            const networkConfigHref = getNetworkHref();
            fetch(networkConfigHref)
                .then(response => response.json())
                .then(data => {
                    const { chainName, rpcAddrs: [rpcAddress]} = data;
                    setWatcher(rpcAddress, chainName);
                    console.log('Watcher initialized.');
                })
                .catch(err => console.log('ERROR Fetching network config: ', err));
        };

        if (!watcher) {
            initWatcher();
        }

        const storageWatcher = makeStorageWatcher();
        storageWatcher.startWatching();
    }, [wallet, crabbleInstance]);

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
