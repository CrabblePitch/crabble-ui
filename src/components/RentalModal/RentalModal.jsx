import './RentalModal.scss';

import { ModalWrapper } from '../shared/ModalWrapper/ModalWrapper.jsx';
import { Close as CloseIcon } from '@mui/icons-material';

export const RentalModal = ({ utility, closeModal }) => {
    const onModalClose = () => {
        closeModal();
    };

    const handleChange = (event) => {};

    const handleSubmit = () => {};

    return (
        <ModalWrapper className="rental-modal">
            <header className="modal-header">
                <h2 className="modal-title">{utility.utilityTitle}</h2>
                <span className="modal-close-btn" onClick={onModalClose}>
                    <CloseIcon />
                </span>
            </header>
            <main className="modal-body">
                <section className="phase">Phases</section>
                <section className="listing">Listing</section>
                <section className="config">Config</section>
            </main>
            <footer className="modal-footer">
                <button className="modal-footer-btn" onClick={onModalClose}>
                    Cancel
                </button>
                <button className="modal-footer-btn">Update Config</button>
                <button className="modal-footer-btn">Withdraw Utility</button>
                <button className="modal-footer-btn">Withdraw Collateral</button>
                <button className="modal-footer-btn">Withdraw Rental Fee</button>
            </footer>
        </ModalWrapper>
    );
};
