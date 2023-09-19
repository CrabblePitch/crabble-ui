// import './App.scss';

import { useEffect } from 'react';
import useStore from './store/store.js';
import { Home } from './pages/Home/Home.jsx';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet.jsx';
import { makeStorageWatcher } from './utils/storageWatcher.js';
import { NotificationProvider } from './components/NotificationProvider/NotificationProvider.jsx';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { NavPanel } from "./components/NavPanel/NavPanel.jsx";
import { Explore } from "./pages/Explore/Explore.jsx";
import Album from "./Album.jsx";
import Container from "@mui/material/Container";



export const App = () => {
    console.log('App!!!');
    const wallet = useStore((state) => state.wallet);

    useEffect(() => {
        const storageWatcher = makeStorageWatcher();
        storageWatcher.startWatching();
    }, [wallet]);

    return (
        <>
            <Box sx={{ height: '100%', bgcolor: 'onSurface.main' }} className='TEST'>
                {!wallet && <ConnectWallet/>}
                {wallet && <Home/>}
            </Box>
        </>

    );
};
