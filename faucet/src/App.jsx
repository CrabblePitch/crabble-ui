import { Box } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GreatMonkeys from './components/GreatMonkeys.jsx';
import AwesomeCollection from './components/AwesomeCollection.jsx';
import ChainboardTicket from './components/ChainboardTicket.jsx';
import CrabbleIST from './components/CrabbleIST.jsx';
import { useEffect } from "react";
import useStore from "./store.js";
import { makeStorageWatcher } from "./helpers.js";
import UserNotifier from "../src/components/UserNotifier.jsx";

function App() {
    const watcher = useStore(state => state.watcher);

    useEffect(() => {
        const storageWacher = makeStorageWatcher();
        storageWacher.startWatching();
    }, [watcher])

    return (
        <Box sx={{ height: '100%', bgcolor: 'surface.main', color: 'onSurfaceText.main' }}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/greatMonkeys" element={<GreatMonkeys />} />
                    <Route path="/awesomeCollection" element={<AwesomeCollection />} />
                    <Route path="/chainboardTicket" element={<ChainboardTicket />} />
                    <Route path="/crabbleIst" element={<CrabbleIST />} />
                </Routes>
            </BrowserRouter>
            <UserNotifier/>
        </Box>
    );
}

export default App;
