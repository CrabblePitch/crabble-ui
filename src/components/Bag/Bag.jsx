import './Bag.scss';

import { useState } from 'react';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Tabs, Tab } from '@mui/material';
import { Ticket } from '../Ticket/Ticket.jsx';
import { RentalModal } from '../RentalModal/RentalModal.jsx';
import { mockData } from '../../pages/Explore/_mockData.js';

export const Bag = () => {
    const [tabValue, setTabValue] = useState(1);
    const [activeRental, setActiveRental] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const closeActiveRental = () => {
        setActiveRental(null);
    };

    return (
        <div className="bag-wrapper">
            <div className="bag">
                <header className="bag-header">
                    <section className="user-info">
                        <AccountCircleIcon />
                        <span className="user-name">Username111</span>
                    </section>
                    <section className="user-bag-info">
                        <section className="rent-borrow">
                            <div className="rent">
                                <p className="title">Renting</p>
                                <div className="value">2</div>
                            </div>
                            <div className="borrow">
                                <p className="title">Borrowing</p>
                                <div className="value">0</div>
                            </div>
                        </section>
                        <section className="rent-options">
                            <div className="rental-available">
                                <p className="title">Rental Fee Available</p>
                                <ul className="values">
                                    <li>10 IST</li>
                                    <li>8 USDC_axl</li>
                                </ul>
                            </div>
                            <div className="coleterial-available">
                                <p className="title">Collateral Available</p>
                                <ul className="values">
                                    <li>Awesome Collateral</li>
                                    <li>Gating Hub</li>
                                </ul>
                            </div>
                        </section>
                    </section>
                </header>
                <main className="bag-body">
                    <div className="tabs">
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Owned" />
                            <Tab label="Borrowed" />
                        </Tabs>
                    </div>
                    <div className="tab-sections">
                        {tabValue === 0 && (
                            <section className="owned-tickets tab">
                                {mockData.map((data, index) => (
                                    <Ticket key={index} data={data} onTicketClick={setActiveRental} />
                                ))}
                            </section>
                        )}
                        {tabValue === 1 && (
                            <section className="borrowed-tickets tab">
                                {mockData.slice(5).map((data, index) => (
                                    <Ticket key={index} data={data} onTicketClick={setActiveRental} />
                                ))}
                            </section>
                        )}
                    </div>
                </main>
            </div>
            {activeRental && <RentalModal utility={activeRental} closeModal={closeActiveRental} />}
        </div>
    );
};
