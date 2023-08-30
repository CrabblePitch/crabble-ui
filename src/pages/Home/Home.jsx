import { AddProtocolModal } from '../../components/AddProtocolModal/AddProtocolModal.jsx';
import { useState } from 'react';

export const Home = () => {
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        setOpen(!open);
    };

    return (
        <div className="home">
            <button onClick={toggleModal}>Rental</button>
            <AddProtocolModal open={open} onClose={toggleModal} />
        </div>
    );
};
