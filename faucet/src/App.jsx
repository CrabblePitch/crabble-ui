import { Box, Typography } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GreatMonkeys from "./components/GreatMonkeys.jsx";
import AwesomeCollection from "./components/AwesomeCollection.jsx";
import ChainboardTicket from "./components/ChainboardTicket.jsx";
import CrabbleIST from "./components/CrabbleIST.jsx";

function App() {
  return (
    <Box sx={{height: '100vh', bgcolor: 'surface.main', color: 'onSurfaceText.main'}}>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/greatMonkeys" element={<GreatMonkeys />} />
                <Route path="/awesomeCollection" element={<AwesomeCollection/>} />
                <Route path="/chainboardTicket" element={<ChainboardTicket/>} />
                <Route path="/crabbleIst" element={<CrabbleIST />} />
            </Routes>
        </BrowserRouter>

    </Box>
  )
}

export default App
