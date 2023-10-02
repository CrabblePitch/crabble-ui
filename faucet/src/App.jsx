import { Box } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChainboardCollection from './components/ChainboardCollection.jsx';
import CrabbleIST from './components/CrabbleIST.jsx';
import { useEffect } from "react";
import useStore from "./store.js";
import { makeStorageWatcher } from "./helpers.js";
import UserNotifier from "../src/components/UserNotifier.jsx";
import CrabbleCollection from "./components/CrabbleCollection.jsx";

function App() {
    const watcher = useStore(state => state.watcher);

    useEffect(() => {
        const storageWacher = makeStorageWatcher();
        storageWacher.startWatching();
    }, [watcher])

    return (
        <Box sx={{ height: '100vh', bgcolor: 'surface.main', color: 'onSurfaceText.main' }}>
            <BrowserRouter>
                <Navbar />
                <Routes>
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
