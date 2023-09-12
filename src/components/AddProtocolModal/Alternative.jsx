import './AddProtocolModal.scss';

import { useState } from 'react';
import { TextField, Radio, Select, MenuItem } from '@mui/material';
import {
    buildCreateRentalOfferSpec,
    checkNumber,
    getBrand,
    getPurseFromSmartWallet,
    makeGenericOnStatusUpdate
} from "../../utils/helpers.js";
import useStore from "../../store/store.js";
import { ModalWrapper } from "../shared/ModalWrapper/ModalWrapper.jsx";

export const Alternative = ({ open, onClose }) => {
    const wallet = useStore(state => state.wallet);

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
    const [submittedData, setSubmittedData] = useState(null);
    const utilityBrand = getBrand('Utility');
    const utilityPurse = getPurseFromSmartWallet(utilityBrand);

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
            [name]: typeof value === 'string' ? value.trim() : value,
        });
    };

    const validate = () => {
        const possibleErrors = {
            utilityAmountIndex: checkNumber(data.utilityAmountIndex) ? '' : 'Required',
            rentalFeePerUnitVal: checkNumber(data.rentalFeePerUnitVal) ? '' : 'Required',
            collateralVal: checkNumber(data.collateralVal) ? '' : 'Required',
            gracePeriodDuration: checkNumber(data.gracePeriodDuration) ? '' : 'Required',
        };

        console.log({ possibleErrors, utilityAmountIndex: data.utilityAmountIndex });

        if (Object.values(possibleErrors).join('')) {
            setErrors({ ...errors, ...possibleErrors });
            return false;
        }

        return true;
    };

    const { onStatusChange } = makeGenericOnStatusUpdate(console.log, onModalClose);

    const handleSubmit = () => {
        console.log({ data, wallet })
        if (!wallet || !validate()) throw new Error(`Not ready; wallet: ${wallet}, data: ${data}`);

        const offerSpec= buildCreateRentalOfferSpec(data);
        console.log({ offerSpec });
        void wallet.makeOffer(offerSpec.invitationSpec, offerSpec.proposal, offerSpec.offerArgs, onStatusChange, offerSpec.id);
    };

    return (
        open && (
            <ModalWrapper className="add-protocol-modal">
                {/*{submittedData && <RentalCreator data={submittedData} onSubmit={() => setSubmittedData(null)} />}*/}
                <header>
                    <h4>Add Crubble Protocol</h4>
                    <button onClick={onModalClose}>x</button>
                </header>
                <section>
                    <div className="modal-column">
                        <div>
                            <p className="label">Choose the NFT you want to rent</p>
                            <Select
                                name="utilityAmountIndex"
                                onChange={handleChange}
                                value={data.utilityAmountIndex}
                                label="Utility Amount"
                            >
                                {[...utilityPurse.value].map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>
                                            {value.address}
                                        </MenuItem>
                                    )
                                })}
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
                                    name="collateralVal"
                                    inputProps={{ min: 0 }}
                                    label="Collateral Amount"
                                    onChange={handleChange}
                                    value={data.collateralVal || ''}
                                    error={!!errors.collateralVal}
                                    helperText={errors.collateralVal}
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
                                    name="rentalFeePerUnitVal"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    label="Rental Fee Amount"
                                    onChange={handleChange}
                                    value={data.rentalFeePerUnitVal || ''}
                                    error={!!errors.rentalFeePerUnitVal}
                                    helperText={errors.rentalFeePerUnitVal}
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
            </ModalWrapper>
        )
    );
};
