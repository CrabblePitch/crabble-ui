import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    MenuItem, Radio,
    Stack,
} from "@mui/material";
import ModalTitleBar from "./ModalTitleBar.jsx";
import Typography from "@mui/material/Typography";
import { Selector, TextInput } from "./CustomComponents.jsx";
import { useState } from "react";
import { ErrorMessages } from "../utils/constants.js";
import {
    buildCreateRentalOfferSpec, displayAmount,
    getBrand,
    getPurseFromSmartWallet, makeGenericOnStatusUpdate,
    makeRentalConfigValidator
} from "../utils/helpers.js";
import useStore from "../store/store.js";
import { brandData } from "../utils/mockData.js";
import { stringifyValue } from "@agoric/ui-components";
import { AssetKind } from "@agoric/ertp";

const CreateRentalDialog = ({ open, onClose }) => {
    const wallet = useStore(state => state.wallet);
    const notifyUser = useStore(state => state.notifyUser);
    const getDisplayableUtilityBrands = useStore(state => state.getDisplayableUtilityBrands);
    const vbankPurses = useStore(state => state.vbankPurses);

    const [utilityAmountIndex, setutilityAmountIndex] = useState('');
    const [rentingDurationUnit, setRentinDurationUnit] = useState('minute');
    const [rentingTier, setRentingTier] = useState('Ad-Hoc');
    const [rentalFeePerUnitVal, setRentalFeePerUnitVal] = useState(0n);
    const [collateralVal, setCollateralVal] = useState(0n);
    const [gracePeriodDuration, setGracePeriodDuration] = useState('0');
    const [minRentingDurationUnits, setMinRentingDurationUnits] = useState('0');
    const [maxRentingDurationUnits, setMaxRentingDurationUnits] = useState('0');
    const [utilityTitle, setUtilityTitle] = useState('');
    const [utilityDescription, setUtilityDescription] = useState('');
    const [utilityBrand, setUtilityBrand] = useState('');
    const [rentalFeeBrand, setRentalFeeBrand] = useState('');
    const [collateralBrand, setCollateralBrand] = useState('');

    const [errors, setErrors] = useState({
        utilityAmountIndex: false,
        rentingDurationUnit: false,
        rentingTier: false,
        rentalFeePerUnitVal: false,
        collateralVal: false,
        gracePeriodDuration: false,
        minRentingDurationUnits: false,
        maxRentingDurationUnits: false,
        utilityTitle: false,
        utilityDescription: false,
        utilityBrand: false,
        collateralBrand: false,
        rentalFeeBrand: false,
    });

    const utilityBrands = getDisplayableUtilityBrands();
    // const utilityBrand = getBrand('Utility');
    const utilityPurse = getPurseFromSmartWallet(utilityBrand) || { value: [] };
    const vbankDisplayData = vbankPurses || [];

    const validationConfig = {
        utilityAmountIndex,
        rentingDurationUnit,
        rentingTier,
        rentalFeePerUnitVal,
        collateralVal,
        gracePeriodDuration,
        minRentingDurationUnits,
        maxRentingDurationUnits,
        utilityTitle,
        utilityDescription,
        utilityBrand,
        collateralBrand,
        rentalFeeBrand,
    };

    const handleListClick = () => {
        if (!wallet || !validate()) {
            console.log('Something is wrong', {
                validationConfig
            });
            return;
        }

        const offerSpec = buildCreateRentalOfferSpec(validationConfig);

        console.log({ offerSpec });
        void wallet.makeOffer(
            offerSpec.invitationSpec,
            offerSpec.proposal,
            offerSpec.offerArgs,
            onStatusChange,
            offerSpec.id,
        );
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const resetState = () => {
        setErrors({
            utilityAmountIndex: false,
            rentingDurationUnit: false,
            rentingTier: false,
            rentalFeePerUnitVal: false,
            collateralVal: false,
            gracePeriodDuration: false,
            minRentingDurationUnits: false,
            maxRentingDurationUnits: false,
            utilityTitle: false,
            utilityDescription: false,
            utilityBrand: false,
            collateralBrand: false,
            rentalFeeBrand: false,
        });
        setutilityAmountIndex(0);
        setRentinDurationUnit('minute');
        setRentingTier('Ad-Hoc');
        setRentalFeePerUnitVal(0n);
        setCollateralVal(0n);
        setGracePeriodDuration('0');
        setMinRentingDurationUnits('0');
        setMaxRentingDurationUnits('0');
        setUtilityTitle('');
        setUtilityDescription('');
        setUtilityBrand('');
        setRentalFeeBrand('');
        setCollateralBrand('');
    };

    const { validate } = makeRentalConfigValidator(errors, setErrors, validationConfig);
    const { onStatusChange } = makeGenericOnStatusUpdate(notifyUser, handleClose);

    return (
        <Dialog open={open} onClose={resetState} sx={{
             pb: 8, color: 'surfaceDark.main', border: 1, borderRadius: 1, width: '100%'
        }} maxWidth="md" fullWidth>
            <ModalTitleBar text='Rent Your NFT on Crabble!'/>
            <DialogContent sx={{ color: 'onSurfaceText.main', bgcolor: 'surface.main', '& .MuiDialog-paper': {bgcolor: ''} }}>
                <Stack direction={"row"} justifyContent="space-between" sx={{mb: 3}}>
                    <Stack flex={1} sx={{alignItems: 'space-between', mr: 4}}>
                        <Typography variant="h6">Choose the NFT you want to rent</Typography>
                        <Stack direction={"row"} justifyContent={'space-between'}>
                            <Selector label={"NFT Selected"}
                                      current={utilityAmountIndex}
                                      callback={setutilityAmountIndex}
                                      // fullWidth={true}
                                      margins={{mr: 1}}
                                      widths={{minWidth: 200}}
                                      error={{ value: errors.utilityAmountIndex, text: ErrorMessages.UTILITY_AMOUNT_INDEX}}
                            >
                                <MenuItem key="balance-empty" value="">
                                    <em>None</em>
                                </MenuItem>
                                {[...utilityPurse.value].map((data, index) => (
                                    <MenuItem key={`balance-${index}`} value={index}>{data.address}</MenuItem>
                                ))}
                            </Selector>
                            <Selector label={"NFT Brand"}
                                      current={utilityBrand}
                                      callback={setUtilityBrand}
                                      margins={{ml: 1}}
                                      widths={{minWidth: 100}}
                                      error={{ value: errors.utilityBrand, text: ErrorMessages.BRAND}}
                            >
                                <MenuItem key="balance-empty" value={''}>
                                    <em>None</em>
                                </MenuItem>
                                {[...utilityBrands].map(({keyword, brand}) => (
                                    <MenuItem key={`brand-${keyword}`} value={brand}>{keyword}</MenuItem>
                                ))}
                            </Selector>
                        </Stack>

                    </Stack>
                    <Stack flex={1} sx={{pl: 4}}>
                        <Typography variant={"h6"}>Briefly Describe Your NFT</Typography>
                        <Stack>
                            <Stack direction="row" justifyContent='space-between' alignItems="center">
                                <TextInput onChange={setUtilityTitle}
                                           name={'Title'}
                                           current={utilityTitle}
                                           size={"small"}
                                           margins={{mr: 1}}
                                           multiline={true}
                                           error={{value: errors.utilityTitle, text: ErrorMessages.STRING}}
                                />

                                <TextInput onChange={setUtilityDescription}
                                           name={'Description'}
                                           current={utilityDescription}
                                           margins={{ml: 1}}
                                           size={"small"}
                                           multiline={true}
                                           error={{value: errors.utilityDescription, text: ErrorMessages.STRING}}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between" sx={{mb: 3}}>
                    <Stack flex={1}>
                        <Typography variant="h6">What renting tier are you planning<br/> to use?</Typography>
                        <Stack direction="row" alignItems="center" pt={2}>
                            <Radio
                                id="ad-hoc"
                                type="radio"
                                checked={rentingTier === 'Ad-Hoc'}
                                onChange={ev => setRentingTier(ev.target.value)}
                                name="rentingTier"
                                size="small"
                                value="Ad-Hoc"
                                color="onSurfaceText"
                                sx={{ color: 'onSurfaceTextDark.main'}}
                            />
                            <Typography variant="body1">Ad-Hoc</Typography>
                            <Radio
                                id="ad-hoc"
                                type="radio"
                                checked={rentingTier === 'auction'}
                                size="small"
                                onChange={ev => setRentingTier(ev.target.value)}
                                name="rentingTier"
                                value="auction"
                                color="onSurfaceText"
                                sx={{ color: 'onSurfaceTextDark.main'}}
                            />
                            <Typography variant="body1">Auction</Typography>
                        </Stack>
                    </Stack>
                    <Stack flex={1} alignItems={'flex-start'} sx={{ml: 8}}>
                        <Typography variant="h6" align={"left"}>How much are you going to charge<br/> per renting duration ?</Typography>
                        <Stack direction={"row"} alignItems={"baseline"}>
                            <TextInput onChange={setRentalFeePerUnitVal}
                                       name={'Rental Fee Per Unit'}
                                       current={displayAmount({ brand: rentalFeeBrand, value: rentalFeePerUnitVal})}
                                       error={{ value: errors.rentalFeePerUnitVal, text: ErrorMessages.NUMERIC}}
                                       amountInput={true}
                            />
                            <Selector label={"Rental Fee Brand"}
                                      current={rentalFeeBrand}
                                      callback={setRentalFeeBrand}
                                      margins={{ml: 2}}
                                      widths={{minWidth: 100}}
                                      error={{ value: errors.rentalFeeBrand, text: ErrorMessages.BRAND}}
                            >
                                <MenuItem key="balance-empty" value={''}>
                                    <em>None</em>
                                </MenuItem>
                                {[...vbankDisplayData].map(({brandPetname, brand}) => (
                                    <MenuItem key={`brand-${brandPetname}`} value={brand}>{brandPetname}</MenuItem>
                                ))}
                            </Selector>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between" sx={{mb: 2}}>
                    <Stack flex={1}>
                        <Typography variant="h6">Secure yourself with a fair amount of collateral</Typography>
                        <Stack direction={"row"} alignItems={"baseline"}>
                            <TextInput onChange={setCollateralVal}
                                       name={'Collateral Amount'}
                                       amountInput={true}
                                       current={displayAmount({ brand: collateralBrand, value: collateralVal})}
                                       error={{value: errors.collateralVal, text: ErrorMessages.NUMERIC}}
                                       fullWidth={false}
                                       validate={validate}
                            />
                            <Selector label={"Collateral Brand"}
                                      current={collateralBrand}
                                      callback={setCollateralBrand}
                                      margins={{ml: 2}}
                                      widths={{minWidth: 100}}
                                      error={{ value: errors.collateralBrand, text: ErrorMessages.BRAND}}
                            >
                                <MenuItem key="balance-empty" value={''}>
                                    <em>None</em>
                                </MenuItem>
                                {[...vbankDisplayData].map(({brandPetname, brand}) => (
                                    <MenuItem key={`brand-${brandPetname}`} value={brand}>{brandPetname}</MenuItem>
                                ))}
                            </Selector>
                        </Stack>

                    </Stack>
                    <Stack flex={1} alignItems="flex-start" sx={{ml: 8}}>
                        <Typography variant="h6">Enter Grace Period</Typography>
                        <TextInput onChange={setGracePeriodDuration}
                                   name={'Grace Period'}
                                   current={gracePeriodDuration}
                                   error={{value: errors.gracePeriodDuration, text: ErrorMessages.NUMERIC}}
                        />
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"}>
                    <Stack flex={1}>
                        <Typography variant={"h6"}>Renting Duration</Typography>
                        <Stack direction="row" justifyContent='flex-start' alignItems="center">
                            <Selector label={"Unit"}
                                      current={rentingDurationUnit}
                                      callback={setRentinDurationUnit}
                                      fullWidth={false}
                                      margins={{ mr: 4 }}
                                      error={{ value: errors.rentingDurationUnit, text: ErrorMessages.STRING}}
                            >
                                <MenuItem value="minute">Minute</MenuItem>
                                <MenuItem value="hour">Hour</MenuItem>
                                <MenuItem value="day">Day</MenuItem>
                                <MenuItem value="week">Week</MenuItem>
                            </Selector>
                            <TextInput onChange={setMinRentingDurationUnits}
                                       name={'Min'}
                                       current={minRentingDurationUnits}
                                       size={"small"}
                                       width={50}
                                       error={{value: errors.minRentingDurationUnits, text: ErrorMessages.NUMERIC}}
                            />
                            <Typography sx={{ml: 2, mr: 2}} variant="body1">{rentingDurationUnit}(s) to</Typography>
                            <TextInput onChange={setMaxRentingDurationUnits}
                                       name={'Max'}
                                       size={"small"}
                                       current={maxRentingDurationUnits}
                                       width={50}
                                       error={{value: errors.maxRentingDurationUnits, text: ErrorMessages.NUMERIC}}
                            />
                            <Typography variant="body1" sx={{ml: 1, mr: 1}}>{rentingDurationUnit}(s)</Typography>
                        </Stack>
                    </Stack>


                </Stack>
            </DialogContent>
            <DialogActions sx={{bgcolor: 'surface.main', pb: 2, pr: 2}}>
                <Button variant="outlined" color={"onSurface"} onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color={"secondary"} onClick={handleListClick}>List My NFT</Button>
            </DialogActions>
        </Dialog>
    )
};

export default CreateRentalDialog;