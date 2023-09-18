import './RentalModal.scss';

import { ModalWrapper } from '../shared/ModalWrapper/ModalWrapper.jsx';
import { Close as CloseIcon } from '@mui/icons-material';
import { UpdateRentalConfigButton } from '../UpdateRentalConfig/UpdateRentalConfigButton.jsx';
import {
    WithdrawUtility as WithdrawUtilityButton,
    WithdrawRentalFee as WithdrawRentalFeeButton,
    WithdrawCollateral as WithdrawCollateralButton,
} from '../Withdraw';
import { mockUtilityData } from '../../pages/Explore/_mockUtility.js';
import { capitalize } from '../../utils/text-utils.js';

export const RentalModal = ({ utility, closeModal }) => {
    const onModalClose = () => {
        closeModal();
    };

    const prepareUtilityConfig = (utility) => {
        const { configuration } = utility;

        // INFO: modify according to the requirements if needed
        const uiConfig = {
            'Collateral amount': configuration.collateralAmount.value,
            'Rental fee (per unit)': configuration.rentalFeePerUnitAmount.value,
            'Utility title': configuration.utilityTitle,
            'Utility description': configuration.utilityDescription,
            'Renting tier': configuration.rentingTier,
            'Renting duration unit': configuration.rentingDurationUnit,
            'Maximum renting duration': configuration.maxRentingDurationUnits,
            'Minimum renting duration': configuration.minRentingDurationUnits,
            'Grace period duration': configuration.gracePeriodDuration,
        };

        return Object.entries(uiConfig);
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
                    <p className={utility.phase}>{capitalize(utility.phase)}</p>
                </section>
                <section className="listing">
                    <h4 className="title">Listing</h4>
                    <div className="details">
                        <div className="image">
                            <img src={utility.configuration.utilityAmount.value[0].imagePath} alt="Utility image" />
                        </div>

                        {/* TODO: clarify what should be listing props */}

                        <div className="properties">Props</div>
                    </div>
                </section>
                <section className="config">
                    <h4 className="title">Config</h4>
                    <ul>
                        {prepareUtilityConfig(utility).map(([title, value]) => (
                            <li key={title}>
                                <strong>{title}:</strong> {value}
                            </li>
                        ))}
                    </ul>
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
                {utility.phase === 'liquidated' && <WithdrawCollateralButton rental={utility} controllers={{}} />}
                <WithdrawRentalFeeButton rental={utility} controllers={{}} />
            </footer>
        </ModalWrapper>
    );
};
