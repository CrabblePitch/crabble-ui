import './BorrowModal.scss';

import { TextField } from '@mui/material';
import { useState } from 'react';
import { ModalWrapper } from '../shared/ModalWrapper/ModalWrapper';
import { Close as CloseIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';
import {
    buildBorrowAdHocOfferSpec,
    getValueFromSet,
    makeGenericOnStatusUpdate
} from "../../utils/helpers.js";
import useStore from "../../store/store.js";

export const BorrowModal = ({ ticketData, closeTicket }) => {
    if (!ticketData || !closeTicket) {
        console.log('Missing BorrowModal props', { ticketData, closeTicket });
        return;
    }
    const [rentingDuration, setRentingDuration] = useState(Number(ticketData.minRentingDurationUnits));
    const wallet = useStore(state => state.wallet);

    const onModalClose = () => {
        closeTicket();
    };

    const handleChange = (event) => {
        const value = Number(event.target.value);

        if (!value || value < ticketData.minRentingDurationUnits) {
            return;
        }

        setRentingDuration(value);
    };

    const { onStatusChange } = makeGenericOnStatusUpdate(console.log, onModalClose);

    const handleSubmit = () => {
        console.log('Submitted: ', rentingDuration);
        const offerSpec = buildBorrowAdHocOfferSpec({ ...ticketData, rentingDuration });
        console.log('Submitted', {
            offerSpec
        });
        void wallet.makeOffer(offerSpec.invitationSpec, offerSpec.proposal,
            offerSpec.offerArgs, onStatusChange, offerSpec.id);
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
                            value={rentingDuration}
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
                            {Object.entries(getValueFromSet(ticketData.utilityAmount)).map(([key, value]) => (
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
                            <InfoIcon /> You have {Number(ticketData.gracePeriodDuration)} after {rentingDuration} expires
                        </li>
                        <li>
                            <InfoIcon /> You must return NFT before {Number(ticketData.maxRentingDurationUnits)}
                        </li>
                        <li>
                            <InfoIcon /> You can return after {rentingDuration}
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
