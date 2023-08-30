import './AddProtocolModal.scss';
import { useState } from 'react';
import { TextField, Radio, Select } from '@mui/material';

export const AddProtocolModal = ({ open, onClose }) => {
    const defaultData = {
        utilityAmount: '',
        rentalFeeAmount: '',
        collateralAmount: '',
        rentingTier: 'Ad-Hoc',
        rentingDurationUnit: '',
        minRentingDurationUnits: '',
        maxRentingDurationUnits: '',
        gracePeriodDuration: '',
    };

    const defaultErrors = {
        utilityAmount: '',
        rentalFeeAmount: '',
        collateralAmount: '',
        rentingTier: '',
        rentingDurationUnit: '',
        minRentingDurationUnits: '',
        maxRentingDurationUnits: '',
        gracePeriodDuration: '',
    };

    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState(defaultErrors);

    const onModalClose = () => {
        setData(defaultData);
        onClose();
    };

    const onSubmit = () => {
        const {
            utilityAmount,
            rentalFeeAmount,
            collateralAmount,
            rentingTier,
            rentingDurationUnit,
            minRentingDurationUnits,
            maxRentingDurationUnits,
            gracePeriodDuration,
        } = data;

        let possibleErrors = {
            ...defaultErrors,
        };

        if (!rentalFeeAmount) {
            possibleErrors = { ...possibleErrors, rentalFeeAmount: 'Required' };
        }

        if (!collateralAmount) {
            possibleErrors = { ...possibleErrors, collateralAmount: 'Required' };
        }

        if (!minRentingDurationUnits) {
            possibleErrors = { ...possibleErrors, minRentingDurationUnits: 'Required' };
        }

        let minRentingDurationUnitsConverted;

        try {
            minRentingDurationUnitsConverted = BigInt(minRentingDurationUnits);
            if (minRentingDurationUnitsConverted <= 0n) {
                possibleErrors = {
                    ...possibleErrors,
                    minRentingDurationUnits: 'Invalid value. Value must be greater then 0.',
                };
            }
        } catch (e) {
            possibleErrors = { ...possibleErrors, minRentingDurationUnits: 'Invalid value. Value must be number.' };
        }

        if (!maxRentingDurationUnits) {
            possibleErrors = { ...possibleErrors, maxRentingDurationUnits: 'Required' };
        }

        let maxRentingDurationUnitsConverted;

        try {
            maxRentingDurationUnitsConverted = BigInt(maxRentingDurationUnits);
            if (maxRentingDurationUnitsConverted <= minRentingDurationUnitsConverted) {
                possibleErrors = {
                    ...possibleErrors,
                    maxRentingDurationUnits: 'Invalid value. Value must be greater min renting duration units.',
                };
            }
        } catch (e) {
            possibleErrors = { ...possibleErrors, maxRentingDurationUnits: 'Invalid value. Value must be number.' };
        }

        if (!gracePeriodDuration) {
            possibleErrors = { ...possibleErrors, gracePeriodDuration: 'Required' };
        }

        let gracePeriodDurationConverted;

        try {
            gracePeriodDurationConverted = BigInt(gracePeriodDuration);
            if (gracePeriodDurationConverted <= 0n) {
                possibleErrors = {
                    ...possibleErrors,
                    gracePeriodDuration: 'Invalid value. Value must be greater then 0.',
                };
            }
        } catch (e) {
            possibleErrors = { ...possibleErrors, gracePeriodDuration: 'Invalid value. Value must be number.' };
        }

        setErrors({ ...errors, ...possibleErrors });

        if (Object.values(possibleErrors).join('')) {
            return;
        }

        console.log('Success: ', JSON.stringify(data, null, 2));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'rentingTier') {
            console.log(event.value);
        }

        setData({
            ...data,
            [name]: value.trim(),
        });
    };

    return (
        open && (
            <div className="add-protocol-modal">
                <header>
                    <h4>Add Crubble Protocol</h4>
                    <button onClick={onModalClose}>x</button>
                </header>
                <section>
                    <Select
                        name="utilityAmount"
                        onChange={handleChange}
                        value={data.utilityAmount}
                        native={true}
                        margin="dense"
                    >
                        <option value="" disabled>
                            Utility Amount
                        </option>
                        <option value="ERTP">ERTP</option>
                        <option value="AssetKind.SET">AssetKind.SET</option>
                    </Select>
                    <TextField
                        name="collateralAmount"
                        margin="normal"
                        label="Collateral Amount"
                        onChange={handleChange}
                        value={data.collateralAmount}
                        error={!!errors.collateralAmount}
                        helperText={errors.collateralAmount}
                    />
                    <TextField
                        name="rentalFeeAmount"
                        margin="normal"
                        label="Rental Fee Amount"
                        onChange={handleChange}
                        value={data.rentalFeeAmount}
                        error={!!errors.rentalFeeAmount}
                        helperText={errors.rentalFeeAmount}
                    />
                    <div className="radio-group">
                        <p>Renting Tier</p>
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
                    <Select
                        name="rentingDurationUnit"
                        onChange={handleChange}
                        value={data.rentingDurationUnit}
                        native={true}
                        margin="dense"
                    >
                        <option>minute</option>
                        <option>hour</option>
                        <option>day</option>
                        <option>week</option>
                    </Select>
                    <TextField
                        name="minRentingDurationUnits"
                        margin="normal"
                        label="Min Renting Duration Units"
                        onChange={handleChange}
                        value={data.minRentingDurationUnits}
                        error={!!errors.minRentingDurationUnits}
                        helperText={errors.minRentingDurationUnits}
                    />
                    <TextField
                        name="maxRentingDurationUnits"
                        margin="normal"
                        label="Max Renting Duration Units"
                        onChange={handleChange}
                        value={data.maxRentingDurationUnits}
                        error={!!errors.maxRentingDurationUnits}
                        helperText={errors.maxRentingDurationUnits}
                    />
                    <TextField
                        name="gracePeriodDuration"
                        margin="normal"
                        label="Grace Period Duration"
                        onChange={handleChange}
                        value={data.gracePeriodDuration}
                        error={!!errors.gracePeriodDuration}
                        helperText={errors.gracePeriodDuration}
                    />
                </section>
                <footer>
                    <button onClick={onModalClose}>Cancel</button>
                    <button onClick={onSubmit}>Submit</button>
                </footer>
            </div>
        )
    );
};
