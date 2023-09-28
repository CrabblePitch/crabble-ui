import { Button, Dialog, DialogContent, Divider, Stack } from '@mui/material';
import ModalTitleBar from './ModalTitleBar.jsx';
import Typography from '@mui/material/Typography';
import { TextInput } from './CustomComponents.jsx';
import { useEffect, useState } from 'react';
import DisplayUtility from './DisplayUtility.jsx';
import {
    buildBorrowAdHocOfferSpec,
    displayAmount,
    getValueFromNat,
    isNumeric,
    makeGenericOnStatusUpdate,
    makeRentalConfigValidator,
} from '../utils/helpers.js';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ErrorMessages } from '../utils/constants.js';
import useStore from '../store/store.js';
import { makeDisplayTimeHelper } from '../utils/time.js';
import { AmountMath } from '@agoric/ertp';

const BorrowRentalDialog = ({ open, rentalData, onClose }) => {
    const notifyUser = useStore((state) => state.notifyUser);
    const wallet = useStore((state) => state.wallet);
    const getKeywordFromBrand = useStore((state) => state.getKeywordFromBrand);

    const [rentingDuration, setRentinDuration] = useState('0');
    const [errors, setErrors] = useState({ rentingDuration: false });
    const configuration = { rentingDuration };

    useEffect(() => {
        if (!rentalData) return;
        setRentinDuration(String(rentalData.minRentingDurationUnits));
    }, [rentalData]);

    if (!rentalData) return;

    const timeHelper = makeDisplayTimeHelper(rentalData);

    const handleBorrowClick = () => {
        if (!validate()) {
            console.log('Something wrong', configuration);
            return;
        }

        const offerSpec = buildBorrowAdHocOfferSpec({ ...rentalData, rentingDuration });
        console.log('Offer Spec', { offerSpec });

        console.log({ offerSpec });
        const offerPromise = void wallet.makeOffer(
            offerSpec.invitationSpec,
            offerSpec.proposal,
            offerSpec.offerArgs,
            onStatusChange,
            offerSpec.id,
        );

        if (offerPromise && typeof offerPromise.then === 'function') {
            offerPromise.then(() => {
                onClose();
            });
        } else {
            // close the modal immediately
            onClose();
        }
    };

    const handleClose = () => {
        setRentinDuration(String(rentalData.minRentingDurationUnits));
        onClose();
    };

    const calculateRentinFee = () => {
        if (!isNumeric(rentingDuration)) return '';
        const total = BigInt(Number(rentingDuration) * getValueFromNat(rentalData.rentalFeePerUnitAmount));
        return AmountMath.make(rentalData.rentalFeePerUnitAmount.brand, total);
    };

    const { validate } = makeRentalConfigValidator(errors, setErrors, configuration);
    const { onStatusChange } = makeGenericOnStatusUpdate(notifyUser, handleClose);

    return (
        <Dialog
            open={open}
            onClose={() => console.log('closing!')}
            sx={{
                pb: 8,
                color: 'surfaceDark.main',
                border: 1,
                borderRadius: 1,
                '& .MuiDialog-paper': { bgcolor: 'surfaceDark.main' },
            }}
            maxWidth="md"
            fullWidth
        >
            <ModalTitleBar text={`Borrow ${rentalData.utilityTitle}`} />
            <DialogContent
                sx={{
                    color: 'onSurfaceText.main',
                    bgcolor: 'surface.main',
                    '& .MuiDialog-paper': { bgcolor: '' },
                    display: 'flex',
                }}
            >
                <Stack flex={2}>
                    <DisplayUtility rental={{ configuration: rentalData }} />
                </Stack>

                <Stack flex={3} justifyContent={'space-between'}>
                    <Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} mt={1}>
                            <Typography sx={{ mt: 2 }} variant="h6">
                                How long you'll be renting?
                            </Typography>
                            <TextInput
                                onChange={setRentinDuration}
                                name={`Renting Duration in ${rentalData.rentingDurationUnit}s`}
                                current={rentingDuration}
                                error={{ value: errors.rentingDuration, text: ErrorMessages.NUMERIC }}
                            />
                        </Stack>

                        <Stack justifyContent={'flex-start'} mt={1}>
                            <Typography sx={{ mt: 2 }} variant="h6">
                                You're paying
                            </Typography>
                            <Divider sx={{ bgcolor: 'line.main' }} />

                            <Stack direction="row" justifyContent={'space-between'} sx={{ mt: 1 }}>
                                <Typography variant="subtitle1">Collateral</Typography>
                                <Typography variant="subtitle2">{`${displayAmount(
                                    rentalData.collateralAmount,
                                )} ${getKeywordFromBrand(rentalData.collateralAmount.brand)}`}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent={'space-between'}>
                                <Typography variant="subtitle1">Rental Fee</Typography>
                                <Typography variant="subtitle2">{`${displayAmount(
                                    calculateRentinFee(),
                                )} ${getKeywordFromBrand(rentalData.rentalFeePerUnitAmount.brand)}`}</Typography>
                            </Stack>
                        </Stack>

                        <Stack justifyContent={'flex-start'} mt={1}>
                            <Typography sx={{ mt: 2 }} variant="h6">
                                Terms
                            </Typography>
                            <Divider sx={{ bgcolor: 'line.main' }} />

                            <Stack direction="row" justifyContent={'flex-start'} sx={{ mt: 2 }}>
                                <InfoOutlinedIcon sx={{ mr: 1 }} />
                                <Typography variant="subtitle2">
                                    You will rent {rentalData.utilityTitle} until{' '}
                                    {timeHelper.getRentingEnd(rentingDuration)} for{' '}
                                    {timeHelper.rentingDurationToHumanReadable(rentingDuration)}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent={'flex-start'} sx={{ mt: 1 }}>
                                <InfoOutlinedIcon sx={{ mr: 1 }} />
                                <Typography variant="subtitle2">
                                    You must return {rentalData.utilityTitle} between{' '}
                                    {timeHelper.getRentingEnd(rentingDuration)} and{' '}
                                    {timeHelper.getLiquidateAt(rentingDuration)}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent={'flex-start'} sx={{ mt: 1 }}>
                                <InfoOutlinedIcon sx={{ mr: 1 }} />
                                <Typography variant="subtitle2">
                                    You will lose you collateral if you don't return {rentalData.utilityTitle} before{' '}
                                    {timeHelper.getLiquidateAt(rentingDuration)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} justifyContent={'flex-end'} mb={1}>
                        <Button sx={{ mr: 1 }} variant="outlined" color={'onSurface'} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color={'secondary'} onClick={handleBorrowClick}>
                            Borrow
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default BorrowRentalDialog;
