import { mockData } from './_mockData.js';
import { useState } from 'react';
import { Ticket } from '../../components/Ticket/Ticket.jsx';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';
import { BorrowModal } from '../../components/BorrowModal/BorrowModal.jsx';

import './Explore.scss';

export const Explore = () => {
    const [activeTicket, setActiveTicket] = useState(null);
    console.log('activeTicket', activeTicket);

    const closeActiveTicket = () => {
        setActiveTicket(null);
    };

    return (
        <div className="explore">
            <h1 className="title">Rent whatever you want</h1>
            <FilterBar />
            <div className="tickets">
                {mockData.map((data) => (
                    <Ticket key={data.name} data={data} onTicketClick={setActiveTicket} />
                ))}
            </div>
            {activeTicket && <BorrowModal ticketData={activeTicket} closeTicket={closeActiveTicket} />}
        </div>
    );
};
