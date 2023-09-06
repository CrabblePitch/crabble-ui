import { mockData } from './_mockData.js';
import { Ticket } from '../../components/Ticket/Ticket.jsx';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';

import './Explore.scss';

export const Explore = () => {
    return (
        <div className="explore">
            <h1>Rent whatever you want</h1>
            <FilterBar />
            <div className="tickets">
                {mockData.map((data) => (
                    <Ticket key={data.name} data={data} />
                ))}
            </div>
        </div>
    );
};
