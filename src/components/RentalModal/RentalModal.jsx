import './RentalModal.scss';

import { Chip } from '@mui/material';
import { ModalWrapper } from '../shared/ModalWrapper/ModalWrapper.jsx';
import { Close as CloseIcon } from '@mui/icons-material';
import { UtilityConfig } from '../UtilityConfig/UtilityConfig.jsx';
import { UpdateRentalConfigButton } from '../UpdateRentalConfig/UpdateRentalConfigButton.jsx';
import {
    WithdrawUtility as WithdrawUtilityButton,
    WithdrawRentalFee as WithdrawRentalFeeButton,
    WithdrawCollateral as WithdrawCollateralButton,
} from '../Withdraw';
import { capitalize } from '../../utils/text-utils.js';
import { getValueFromSet } from '../../utils/helpers.js';

export const RentalModal = ({ utility, closeModal }) => {
    const onModalClose = () => {
        closeModal();
    };

    const controllers = {
        snackbar: console.log,
        modal: () => console.log('This is not a modal'),
    };

    const style = {
        position: 'relative',
        width: '50%',
        height: '100%',
        borderColor: 'line.main',
        boxShadow: 24,
    };

    const getChipClr = (phase) => {
        if (phase === 'available') {
            return 'success';
        } else if (phase === 'rented') {
            return 'warning';
        } else {
            return 'error';
        }
    };

    const getListingDetails = () => {
        const imagePath = utility.configuration.utilityAmount.value[0].imagePath;

        return imagePath ? (
            <div className="image">
                <img src={utility.configuration.utilityAmount.value[0].imagePath} alt="Utility image" />
            </div>
        ) : (
            <ul className="details">
                {Object.entries(utility.configuration.utilityAmount.value[0]).map(([key, value]) => (
                    <li key={key}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ModalWrapper className="rental-modal">
            <header className="modal-header">
                <h2 className="modal-title">{utility.configuration.utilityTitle}</h2>
                <span className="modal-close-btn" onClick={onModalClose}>
                    <CloseIcon />
                </span>
            </header>
            <main className="modal-body">
                <section className="phase">
                    <h4 className="title">Phase</h4>
                    <Chip color={getChipClr(utility.phase)} label={capitalize(utility.phase)} variant="outlined" />
                </section>
                <section className="listing">
                    <h4 className="title">Listing</h4>
                    <div className="details">{getListingDetails()}</div>
                </section>
                <section className="config">
                    <h4 className="title">Config</h4>
                    <UtilityConfig config={utility.configuration} />
                </section>
            </main>
            <footer className="modal-footer">
                <button className="modal-footer-btn" onClick={onModalClose}>
                    Cancel
                </button>

                {/* TODO: clarify and provide correct values for 'overrides' and 'controllers' */}

                {utility.phase !== 'liquidated' && (
                    <UpdateRentalConfigButton rental={utility} overrides={{}} controllers={{}} />
                )}
                {utility.phase === 'available' && <WithdrawUtilityButton rental={utility} controllers={{}} />}
                {utility.phase === 'liquidation' && (
                    <WithdrawCollateralButton rental={utility} controllers={controllers} />
                )}
                <WithdrawRentalFeeButton rental={utility} controllers={controllers} />
            </footer>
        </ModalWrapper>
    );
};
