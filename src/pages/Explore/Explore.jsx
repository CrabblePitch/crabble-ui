import './Explore.scss';

import { useState } from 'react';
import { Ticket } from '../../components/Ticket/Ticket.jsx';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';
import { BorrowModal } from '../../components/BorrowModal/BorrowModal.jsx';
import { Bag } from '../../components/Bag/Bag.jsx';
import useStore from '../../store/store.js';

export const Explore = ({ bagOpen }) => {
    const catalog = useStore((state) => state.catalog) || [];
    const [activeTicket, setActiveTicket] = useState(null);
    console.log('activeTicket', activeTicket);

    const displayData = [...catalog].filter(({ phase }) => phase === 'available');

    const closeActiveTicket = () => {
        setActiveTicket(null);
    };

    return (
        <div className="explore">
            {bagOpen ? (
                <Bag />
            ) : (
                <div className="catalog">
                    <h1 className="title">Rent whatever you want</h1>
                    <FilterBar />
                    <div className="tickets">
                        {displayData.map((data, index) => (
                            <Ticket key={index} data={data} onTicketClick={setActiveTicket} />
                        ))}
                    </div>
                    {activeTicket && <BorrowModal ticketData={activeTicket} closeTicket={closeActiveTicket} />}
                </div>
            )}
        </div>
    );
};
