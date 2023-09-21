import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavPanel } from '../../components/NavPanel/NavPanel.jsx';
import { About } from '../About/About.jsx';
import { Contact } from '../Contact/Contact.jsx';
import { useState } from 'react';
import { Explore } from '../Explore/Explore.jsx';
import { AddProtocolModal } from '../../components/AddProtocolModal/AddProtocolModal.jsx';
import { Box } from "@mui/material";
import CreateRentalDialog from "../../components/CreateRentalDialog.jsx";

export const Home = () => {
    const [open, setOpen] = useState(false);
    const [bagOpen, setBagOpen] = useState(false);

    const toggleModal = () => {
        setOpen(!open);
    };

    const toggleBag = () => {
        setBagOpen(!bagOpen);
    };

    return (
        <div className="home">
            <BrowserRouter>
                <NavPanel toggleModal={toggleModal} toggleBag={toggleBag} bagOpen={bagOpen} />
                <Routes>
                    <Route path="/" element={<Explore bagOpen={bagOpen} />} />
                    <Route path="/explore" element={<Explore bagOpen={bagOpen} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                {/*<AddProtocolModal open={open} onClose={toggleModal} />*/}
                <CreateRentalDialog open={open} onClose={toggleModal} />
            </BrowserRouter>
        </div>
    );
};
