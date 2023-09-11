import './BorrowModal.scss';

import { TextField } from '@mui/material';
import { useState } from 'react';
import { ModalWrapper } from '../shared/ModalWrapper/ModalWrapper';
import { Close as CloseIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';

export const BorrowModal = ({ ticketData, closeTicket }) => {
    const [borrowDuration, setBorrowDuration] = useState(ticketData.minRentingDurationUnits);

    const mockUtilPurseValues = harden([
        {
            organization: 'Airbnb rental',
            address: 'Sesame Street n12345',
            accessKeyHash: 'bf34q7hiufb3',
        },
        {
            organization: 'Airbnb rental',
            address: 'Sesame Street n123456',
            accessKeyHash: 'bf34q7hiufb3',
        },
        {
            organization: 'Airbnb rental',
            address: 'Sesame Street n1234567',
            accessKeyHash: 'bf34q7hiufb3',
        },
        {
            organization: 'Airbnb rental',
            address: 'Sesame Street n12345678',
            accessKeyHash: 'bf34q7hiufb3',
        },
    ]);

    const onModalClose = () => {
        closeTicket();
    };

    const handleChange = (event) => {
        const value = Number(event.target.value);

        if (!value || value < ticketData.minRentingDurationUnits) {
            return;
        }

        setBorrowDuration(value);
    };

    const handleSubmit = () => {
        console.log('Submitted: ', borrowDuration);
    };

    return (
        <ModalWrapper className="borrow-modal">
            <header className="modal-header">
                <h2 className="modal-title">Borrow {ticketData.utilityTitle}</h2>
                <span className="modal-close-btn" onClick={onModalClose}>
                    <CloseIcon />
                </span>
            </header>
            <main className="modal-body">
                <section className="borrow-duration">
                    <h4 className="title">How long you'll be renting?</h4>
                    <div className="duration-input">
                        <TextField
                            type="number"
                            name="rentingDuration"
                            onChange={handleChange}
                            value={borrowDuration}
                        />
                        <small>{ticketData.rentingDurationUnit}(s)</small>
                    </div>
                </section>
                <section className="borrow-info">
                    <div className="payment-info">
                        <h4 className="title">You're paying:</h4>
                        <div className="details">
                            <div>
                                <p className="sub-title">Collateral</p>
                                <div className="value">{Number(ticketData.collateralAmount.value)}</div>
                            </div>
                            <div>
                                <p className="sub-title">Renting Fee</p>
                                <div className="value">{Number(ticketData.rentalFeePerUnitAmount.value)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="receipt-info">
                        <h4 className="title">You're getting:</h4>
                        <p className="sub-title">UtilityAmount:</p>
                        <ul className="details">
                            {Object.entries(mockUtilPurseValues[0]).map(([key, value]) => (
                                <li key={key}>
                                    {key}: {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section>
                    <h4 className="title">Terms</h4>
                    <ul className="borrow-terms">
                        <li>
                            <InfoIcon /> You have {ticketData.gracePeriodDuration} after {borrowDuration} expires
                        </li>
                        <li>
                            <InfoIcon /> You must return NFT before {ticketData.maxRentingDurationUnits}
                        </li>
                        <li>
                            <InfoIcon /> You can return after {borrowDuration}
                        </li>
                    </ul>
                </section>
            </main>
            <footer className="modal-footer">
                <button className="modal-footer-btn" onClick={onModalClose}>
                    Cancel
                </button>
                <button className="modal-footer-btn" onClick={handleSubmit}>
                    Borrow
                </button>
            </footer>
        </ModalWrapper>
    );
};
