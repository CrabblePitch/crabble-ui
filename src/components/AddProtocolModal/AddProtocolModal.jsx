import './AddProtocolModal.scss';

import { useState } from 'react';
import { TextField, Radio, Select, MenuItem } from '@mui/material';
import {
    buildCreateRentalOfferSpec,
    checkNegativeNumber,
    checkPositiveNumber,
    getBrand,
    getPurseFromSmartWallet,
    makeGenericOnStatusUpdate,
} from '../../utils/helpers.js';
import useStore from '../../store/store.js';
import { ModalWrapper } from '../shared/ModalWrapper/ModalWrapper.jsx';
import { Close as CloseIcon } from '@mui/icons-material';

export const AddProtocolModal = ({ open, onClose }) => {
    const wallet = useStore((state) => state.wallet);

    console.log('open alt: ', open);

    const defaultData = {
        utilityTitle: 'Test Title',
        utilityDescription: 'Test Description',
        utilityAmountIndex: 0,
        rentalFeePerUnitVal: '',
        collateralVal: '',
        rentingTier: 'Ad-Hoc',
        rentingDurationUnit: 'minute',
        minRentingDurationUnits: 1,
        maxRentingDurationUnits: 10,
        gracePeriodDuration: '',
    };

    const defaultErrors = {
        utilityAmountIndex: -1,
        rentalFeePerUnitVal: '',
        collateralVal: '',
        rentingTier: '',
        gracePeriodDuration: '',
    };

    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState(defaultErrors);
    const utilityBrand = getBrand('Utility');
    const utilityPurse = getPurseFromSmartWallet(utilityBrand) || '';

    const onModalClose = () => {
        setData(defaultData);
        onClose();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log('handleChange', { name, value });

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
            [name]: typeof value === 'string' ? value.trim() : value,
        });
    };

    const { onStatusChange } = makeGenericOnStatusUpdate(console.log, onModalClose);

    const validate = () => {
        const possibleErrors = {
            utilityAmountIndex: !checkNegativeNumber(data.utilityAmountIndex) ? '' : 'Required',
            rentalFeePerUnitVal: checkPositiveNumber(data.rentalFeePerUnitVal) ? '' : 'Required',
            collateralVal: checkPositiveNumber(data.collateralVal) ? '' : 'Required',
            gracePeriodDuration: checkPositiveNumber(data.gracePeriodDuration) ? '' : 'Required',
        };

        console.log({ possibleErrors, utilityAmountIndex: data.utilityAmountIndex });

        if (Object.values(possibleErrors).join('')) {
            setErrors({ ...errors, ...possibleErrors });
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        console.log({ data, wallet });
        if (!wallet || !validate()) throw new Error(`Not ready; wallet: ${wallet}, data: ${data}`);

        const offerSpec = buildCreateRentalOfferSpec(data);
        console.log({ offerSpec });
        void wallet.makeOffer(
            offerSpec.invitationSpec,
            offerSpec.proposal,
            offerSpec.offerArgs,
            onStatusChange,
            offerSpec.id,
        );
    };

    console.log('utilityPurse: ', utilityPurse);

    return (
        open && (
            <ModalWrapper className="add-protocol-modal">
                {/*{submittedData && <RentalCreator data={submittedData} onSubmit={() => setSubmittedData(null)} />}*/}
                <header className="modal-header">
                    <h2 className="modal-title">Add Crabble Protocol</h2>
                    <span className="modal-close-btn" onClick={onModalClose}>
                        <CloseIcon />
                    </span>
                </header>
                <main className="modal-body">
                    <div className="modal-column">
                        <section>
                            <h4 className="title">Choose the NFT you want to rent</h4>
                            <Select
                                name="utilityAmountIndex"
                                onChange={handleChange}
                                value={data.utilityAmountIndex}
                                label="Utility Amount"
                            >
                                {[...(utilityPurse.value || [])].map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>
                                            {value.address}
                                        </MenuItem>
                                    );
                                })}
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
                                    name="collateralVal"
                                    inputProps={{ min: 0 }}
                                    label="Collateral Amount"
                                    onChange={handleChange}
                                    value={data.collateralVal || ''}
                                    error={!!errors.collateralVal}
                                    helperText={errors.collateralVal}
                                />
                            </section>
                        )}
                        <section>
                            <p className="title">Renting Duration</p>
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
                                    name="rentalFeePerUnitVal"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    label="Rental Fee Amount"
                                    onChange={handleChange}
                                    value={data.rentalFeePerUnitVal || ''}
                                    error={!!errors.rentalFeePerUnitVal}
                                    helperText={errors.rentalFeePerUnitVal}
                                />
                            </section>
                        )}
                        <section>
                            <h4 className="title">Enter your grace period</h4>
                            <TextField
                                name="gracePeriodDuration"
                                label="Grace Period Duration"
                                onChange={handleChange}
                                type="number"
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
