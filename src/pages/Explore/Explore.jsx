import { Ticket } from '../../components/Ticket/Ticket.jsx';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';

import './Explore.scss';
import useStore from "../../store/store.js";

export const Explore = () => {
    const catalog = useStore(state => state.catalog);
    if(!catalog) return;

    return (
        <div className="explore">
            <h1>Rent whatever you want</h1>
            <FilterBar />
            <div className="tickets">
                {catalog.map((data, index) => (
                    <Ticket key={index} data={data} />
                ))}
            </div>
        </div>
    );
};
