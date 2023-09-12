import './AddProtocolModal.scss';

import { useState } from 'react';
import { TextField, Radio, Select } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { ModalWrapper } from '../shared/ModalWrapper/ModalWrapper.jsx';
import { useNotification } from '../NotificationProvider/NotificationProvider.jsx';

export const AddProtocolModal = ({ open, onClose }) => {
    const defaultData = {
        utilityAmount: 'ERTP',
        rentalFeeAmount: 0,
        collateralAmount: 0,
        rentingTier: 'Ad-Hoc',
        rentingDurationUnit: 'day',
        minRentingDurationUnits: 1,
        maxRentingDurationUnits: 2,
        gracePeriodDuration: 0,
    };

    const defaultErrors = {
        utilityAmount: '',
        rentalFeeAmount: '',
        collateralAmount: '',
        rentingTier: '',
        gracePeriodDuration: '',
    };

    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState(defaultErrors);
    const notify = useNotification();

    // Test data for Utility Dropdown
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
    ])

    const onModalClose = () => {
        setData(defaultData);
        setErrors(defaultErrors);
        onClose();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'minRentingDurationUnits') {
            const convertedValue = Number(value);

            if (convertedValue < 1) {
                return;
            }

            if (convertedValue >= data.maxRentingDurationUnits) {
                return setData({
                    ...data,
                    minRentingDurationUnits: convertedValue,
                    maxRentingDurationUnits: convertedValue + 1,
                });
            }
        }

        if (name === 'maxRentingDurationUnits') {
            const convertedValue = Number(value);

            if (convertedValue <= data.minRentingDurationUnits) {
                return;
            }
        }

        setData({
            ...data,
            [name]: value.trim(),
        });
    };

    const handleSubmit = () => {
        const { utilityAmount, rentalFeeAmount, collateralAmount, gracePeriodDuration } = data;

        const possibleErrors = {
            utilityAmount: utilityAmount ? '' : 'Required',
            rentalFeeAmount: rentalFeeAmount ? '' : 'Required',
            collateralAmount: collateralAmount ? '' : 'Required',
            gracePeriodDuration: gracePeriodDuration ? '' : 'Required',
        };

        if (Object.values(possibleErrors).join('')) {
            setErrors({ ...errors, ...possibleErrors });
            return;
        }

        const processedData = {
            ...data,
            rentalFeeAmount: BigInt(+data.rentalFeeAmount),
            collateralAmount: BigInt(+data.rentalFeeAmount),
            minRentingDurationUnits: BigInt(+data.rentalFeeAmount),
            maxRentingDurationUnits: BigInt(+data.rentalFeeAmount),
        };

        // TODO: 2. Clear state after the tx is successfully done
        onModalClose();
        createRentalKeplr(processedData, notify);
        notify('Transaction pending...', 'info');
    };

    return (
        open && (
            <ModalWrapper className="add-protocol-modal">
                <header className="modal-header">
                    <h2 className="modal-title">Put your NFT on Crabble!</h2>
                    <span className="modal-close-btn" onClick={onModalClose}>
                        <CloseIcon />
                    </span>
                </header>
                <main className="modal-body">
                    <div className="modal-column">
                        <section>
                            <h4 className="title">Choose the NFT you want to rent</h4>
                            <Select
                                name="utilityAmount"
                                onChange={handleChange}
                                value={data.utilityAmount}
                                native={true}
                            >
                                <option value="ERTP">ERTP</option>
                                <option value="AssetKind.SET">AssetKind.SET</option>
                            </Select>
                        </section>
                        <section className="renting-tier">
                            <h4 className="title">What renting tier are you planning to use?</h4>
                            <div className="radio-group">
                                <div className="radio-item">
                                    <label htmlFor="ad-hoc">Ad-Hoc</label>
                                    <Radio
                                        id="ad-hoc"
                                        type="radio"
                                        checked={data.rentingTier === 'Ad-Hoc'}
                                        name="rentingTier"
                                        onChange={handleChange}
                                        value="Ad-Hoc"
                                    />
                                </div>
                                <div className="radio-item">
                                    <label htmlFor="auction">Auction</label>
                                    <Radio
                                        type="radio"
                                        checked={data.rentingTier === 'Auction'}
                                        name="rentingTier"
                                        onChange={handleChange}
                                        value="Auction"
                                    />
                                </div>
                            </div>
                        </section>
                        {data.rentingTier === 'Ad-Hoc' && (
                            <section>
                                <h4 className="title">Secure yourself with a fair amount of collateral</h4>
                                <TextField
                                    type="number"
                                    name="collateralAmount"
                                    onChange={handleChange}
                                    value={data.collateralAmount}
                                    error={!!errors.collateralAmount}
                                    helperText={errors.collateralAmount}
                                />
                            </section>
                        )}
                        <section>
                            <h4 className="title">Renting Duration</h4>
                            <div className="renting-duration">
                                <section className="duration-input">
                                    <TextField
                                        type="number"
                                        name="minRentingDurationUnits"
                                        label="Min"
                                        onChange={handleChange}
                                        value={data.minRentingDurationUnits}
                                    />
                                    <small>{data.rentingDurationUnit}(s)</small>
                                </section>
                                <span>to</span>
                                <section className="duration-input">
                                    <TextField
                                        type="number"
                                        name="maxRentingDurationUnits"
                                        label="Max"
                                        onChange={handleChange}
                                        value={data.maxRentingDurationUnits}
                                    />
                                    <small>{data.rentingDurationUnit}(s)</small>
                                </section>
                            </div>
                        </section>
                    </div>
                    <div className="modal-column">
                        <section>
                            <h4 className="title">What is your unit of renting duration?</h4>
                            <Select
                                name="rentingDurationUnit"
                                onChange={handleChange}
                                value={data.rentingDurationUnit}
                                native={true}
                            >
                                <option value="minute">Minute</option>
                                <option value="hour">Hour</option>
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                            </Select>
                        </section>
                        {data.rentingTier === 'Ad-Hoc' && (
                            <section>
                                <h4 className="title">How much are you going to charge per renting duration ?</h4>
                                <TextField
                                    name="rentalFeeAmount"
                                    type="number"
                                    onChange={handleChange}
                                    value={data.rentalFeeAmount}
                                    error={!!errors.rentalFeeAmount}
                                    helperText={errors.rentalFeeAmount}
                                />
                            </section>
                        )}
                        <section>
                            <h4 className="title">Enter your grace period</h4>
                            <TextField
                                name="gracePeriodDuration"
                                type="number"
                                onChange={handleChange}
                                value={data.gracePeriodDuration}
                                error={!!errors.gracePeriodDuration}
                                helperText={errors.gracePeriodDuration}
                            />
                        </section>
                    </div>
                </main>
                <footer className="modal-footer">
                    <button className="modal-footer-btn" onClick={onModalClose}>
                        Cancel
                    </button>
                    <button className="modal-footer-btn" onClick={handleSubmit}>
                        List My NFT
                    </button>
                </footer>
            </ModalWrapper>
        )
    );
};
