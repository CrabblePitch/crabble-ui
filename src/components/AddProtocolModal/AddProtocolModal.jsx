import './AddProtocolModal.scss';

import { useState } from 'react';
import { TextField, Radio, Select } from '@mui/material';
import RentalCreator from '../RentalCreator';

export const AddProtocolModal = ({ open, onClose }) => {
    const defaultData = {
        utilityAmount: '',
        rentalFeeAmount: null,
        collateralAmount: null,
        rentingTier: 'Ad-Hoc',
        rentingDurationUnit: 'day',
        minRentingDurationUnits: 1,
        maxRentingDurationUnits: 2,
        gracePeriodDuration: '',
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
    const [submittedData, setSubmittedData] = useState(null);

    const onModalClose = () => {
        setData(defaultData);
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

        console.log('Success: ', data);
        // TODO: 2. Clear state after the tx is successfully done
        onModalClose();
        setSubmittedData(processedData);
        RentalCreator(processedData);
    };

    return (
        open && (
            <div className="add-protocol-modal">
                {submittedData && <RentalCreator data={submittedData} onSubmit={() => setSubmittedData(null)} />}
                <header>
                    <h4>Add Crubble Protocol</h4>
                    <button onClick={onModalClose}>x</button>
                </header>
                <section>
                    <div className="modal-column">
                        <div>
                            <p className="label">Choose the NFT you want to rent</p>
                            <Select
                                name="utilityAmount"
                                onChange={handleChange}
                                value={data.utilityAmount}
                                native={true}
                            >
                                <option value="" disabled>
                                    Utility Amount
                                </option>
                                <option value="ERTP">ERTP</option>
                                <option value="AssetKind.SET">AssetKind.SET</option>
                            </Select>
                        </div>
                        <div className="renting-tier">
                            <p className="label">What renting tier are you planning to use?</p>
                            <label>
                                Ad-Hoc
                                <Radio
                                    type="radio"
                                    checked={data.rentingTier === 'Ad-Hoc'}
                                    name="rentingTier"
                                    onChange={handleChange}
                                    value="Ad-Hoc"
                                />
                            </label>
                            <label>
                                Auction
                                <Radio
                                    type="radio"
                                    checked={data.rentingTier === 'Auction'}
                                    name="rentingTier"
                                    onChange={handleChange}
                                    value="Auction"
                                />
                            </label>
                        </div>
                        {data.rentingTier === 'Ad-Hoc' && (
                            <div>
                                <p className="label">Secure yourself with a fair amount of collateral</p>
                                <TextField
                                    type="number"
                                    name="collateralAmount"
                                    inputProps={{ min: 0 }}
                                    label="Collateral Amount"
                                    onChange={handleChange}
                                    value={data.collateralAmount}
                                    error={!!errors.collateralAmount}
                                    helperText={errors.collateralAmount}
                                />
                            </div>
                        )}
                        <div>
                            <p className="label">Renting Duration</p>
                            <div className="renting-duration">
                                <label>
                                    <TextField
                                        type="number"
                                        name="minRentingDurationUnits"
                                        label="Min"
                                        onChange={handleChange}
                                        value={data.minRentingDurationUnits}
                                    />
                                    <small>{data.rentingDurationUnit}(s)</small>
                                </label>
                                <span>to</span>
                                <label>
                                    <TextField
                                        type="number"
                                        name="maxRentingDurationUnits"
                                        label="Max"
                                        onChange={handleChange}
                                        value={data.maxRentingDurationUnits}
                                    />
                                    <small>{data.rentingDurationUnit}(s)</small>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-column">
                        <div>
                            <p className="label">What is your unit of renting duration?</p>
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
                        </div>
                        {data.rentingTier === 'Ad-Hoc' && (
                            <div>
                                <p className="label">How much are you going to charge per renting duration ?</p>
                                <TextField
                                    name="rentalFeeAmount"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    label="Rental Fee Amount"
                                    onChange={handleChange}
                                    value={data.rentalFeeAmount}
                                    error={!!errors.rentalFeeAmount}
                                    helperText={errors.rentalFeeAmount}
                                />
                            </div>
                        )}
                        <div>
                            <p className="label">Enter your grace period</p>
                            <TextField
                                name="gracePeriodDuration"
                                label="Grace Period Duration"
                                onChange={handleChange}
                                value={data.gracePeriodDuration}
                                error={!!errors.gracePeriodDuration}
                                helperText={errors.gracePeriodDuration}
                            />
                        </div>
                    </div>
                </section>
                <footer>
                    <button onClick={onModalClose}>Cancel</button>
                    <button onClick={handleSubmit}>List My NFT</button>
                </footer>
            </div>
        )
    );
};
