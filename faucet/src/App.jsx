import { Box } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChainboardCollection from './components/ChainboardCollection.jsx';
import CrabbleIST from './components/CrabbleIST.jsx';
import { useEffect } from "react";
import useStore from "./store.js";
import { makeStorageWatcher, getNetworkHref } from "./helpers.js";
import UserNotifier from "../src/components/UserNotifier.jsx";
import CrabbleCollection from "./components/CrabbleCollection.jsx";

function App() {
    const watcher = useStore(state => state.watcher);
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


        const storageWacher = makeStorageWatcher();
        storageWacher.startWatching();
    }, [watcher])

    return (
        <Box sx={{ height: '100%', bgcolor: 'surface.main', color: 'onSurfaceText.main' }}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<CrabbleCollection />} />
                    <Route path="/crabbleCollection" element={<CrabbleCollection />} />
                    <Route path="/chainboardCollection" element={<ChainboardCollection />} />
                    <Route path="/crabbleIst" element={<CrabbleIST />} />
                </Routes>
            </BrowserRouter>
            <UserNotifier/>
        </Box>
    );
}

export default App;
