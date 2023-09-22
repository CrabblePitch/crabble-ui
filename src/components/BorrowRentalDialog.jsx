import {
    Button,
    Dialog,
    DialogActions,
    DialogContent, Divider,
    MenuItem, Radio,
    Stack,
} from "@mui/material";
import ModalTitleBar from "./ModalTitleBar.jsx";
import Typography from "@mui/material/Typography";
import { Selector, TextInput } from "./CustomComponents.jsx";
import { useEffect, useState } from "react";
import DisplayUtility from "./DisplayUtility.jsx";
import { getValueFromNat, getValueFromSet } from "../utils/helpers.js";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const BorrowRentalDialog = ({ open, rentalData, onClose }) => {
    const [rentingDuration, setRentinDuration] = useState(0);

    useEffect(() => {
        if (!rentalData) return;
        setRentinDuration(rentalData.minRentingDurationUnits);
    }, [rentalData]);

    if (!rentalData) return;

    const calculateRentinFee = () => {
      return Number(rentingDuration) * getValueFromNat(rentalData.rentalFeePerUnitAmount);
    };

    return (
        <Dialog open={open} onClose={() => console.log('closing!')} sx={{
            pb: 8, color: 'surfaceDark.main', border: 1, borderRadius: 1, '& .MuiDialog-paper': {bgcolor: 'surfaceDark.main'}
        }} maxWidth="md" fullWidth>
            <ModalTitleBar text={`Borrow ${rentalData.utilityTitle}`}/>
            <DialogContent sx={{
                color: 'onSurfaceText.main',
                bgcolor: 'surface.main',
                '& .MuiDialog-paper': {bgcolor: ''},
                display: 'flex',
                // alignItems: 'stretch'
            }}>
                <Stack flex={2}>
                    <DisplayUtility rental={{ configuration: rentalData }}/>
                </Stack>

                <Stack flex={3} justifyContent={'space-between'} >
                    <Stack>
                        <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
                            <Typography sx={{mt:2}} variant="h6">How long you'll be renting?</Typography>
                            <TextInput onChange={setRentinDuration} name={`Renting Duration ${rentalData.rentingDurationUnit}s`}
                                       current={Number(rentingDuration)}
                            />
                        </Stack>

                        <Stack justifyContent={"flex-start"} mt={1}>
                            <Typography sx={{mt:2}} variant="h6">You're paying</Typography>
                            <Divider sx={{ bgcolor: 'line.main'}}/>

                            <Stack direction="row" justifyContent={'space-between'} sx={{mt: 1}}>
                                <Typography variant="subtitle1">Collateral</Typography>
                                <Typography variant="subtitle2">{`${getValueFromNat(rentalData.collateralAmount)} {COL_KEYWORD}`}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent={'space-between'}>
                                <Typography variant="subtitle1">Rental Fee</Typography>
                                <Typography variant="subtitle2">{`${calculateRentinFee()} {FEE_KEYWORD}`}</Typography>
                            </Stack>
                        </Stack>

                        <Stack justifyContent={"flex-start"} mt={1}>
                            <Typography sx={{mt:2}} variant="h6">Terms</Typography>
                            <Divider sx={{ bgcolor: 'line.main'}}/>

                            <Stack direction="row" justifyContent={'flex-start'} sx={{mt: 2}}>
                                <InfoOutlinedIcon sx={{mr: 1}}/>
                                <Typography variant="subtitle2">{`${getValueFromNat(rentalData.collateralAmount)} {COL_KEYWORD}`}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent={'flex-start'} sx={{mt: 1}}>
                                <InfoOutlinedIcon sx={{mr: 1}}/>
                                <Typography variant="subtitle2">{`${getValueFromNat(rentalData.collateralAmount)} {COL_KEYWORD}`}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent={'flex-start'} sx={{mt: 1}}>
                                <InfoOutlinedIcon sx={{mr: 1}}/>
                                <Typography variant="subtitle2">{`${getValueFromNat(rentalData.collateralAmount)} {COL_KEYWORD}`}</Typography>
                            </Stack>

                        </Stack>
                    </Stack>

                    <Stack direction={"row"} justifyContent={"flex-end"} mb={1}>
                        <Button sx={{mr: 1}} variant="outlined" color={"onSurface"} onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color={"secondary"} onClick={onClose}>List My NFT</Button>
                    </Stack>



                </Stack>


            </DialogContent>
        </Dialog>
    )
};

export default BorrowRentalDialog;