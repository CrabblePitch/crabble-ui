import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavPanel } from '../../components/NavPanel/NavPanel.jsx';
import { About } from '../About/About.jsx';
import { Contact } from '../Contact/Contact.jsx';
import { AddProtocolModal } from '../../components/AddProtocolModal/AddProtocolModal.jsx';
import { useState } from 'react';
import { Explore } from '../Explore/Explore.jsx';
import { Alternative } from "../../components/AddProtocolModal/Alternative.jsx";

export const Home = () => {
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        setOpen(!open);
    };

    return (
        <div className="home">
            <BrowserRouter>
                <NavPanel toggleModal={toggleModal} />
                <Routes>
                    <Route path="/" element={<Explore />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                {/*<AddProtocolModal open={open} onClose={toggleModal} />*/}
                <Alternative open={open} onClose={toggleModal} />
            </BrowserRouter>
        </div>
    );
};
