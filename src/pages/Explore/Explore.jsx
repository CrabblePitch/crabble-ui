import { useState } from 'react';
import { Ticket } from '../../components/Ticket/Ticket.jsx';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';
import { BorrowModal } from '../../components/BorrowModal/BorrowModal.jsx';

import './Explore.scss';
import useStore from "../../store/store.js";

export const Explore = () => {
    const catalog = useStore(state => state.catalog);
    const [activeTicket, setActiveTicket] = useState(null);
    console.log('activeTicket', activeTicket);

    if(!catalog) return;

    const displayData = [...catalog].filter(({ phase }) => phase === 'available');

    const closeActiveTicket = () => {
        setActiveTicket(null);
    };

    return (
        <div className="explore">
            <h1 className="title">Rent whatever you want</h1>
            <FilterBar />
            <div className="tickets">
                {displayData.map((data, index) => (
                    <Ticket key={index} data={data} onTicketClick={setActiveTicket} />
                ))}
            </div>
            {activeTicket && <BorrowModal ticketData={activeTicket} closeTicket={closeActiveTicket} />}
        </div>
    );
};
