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

const CreateRentalDialog = ({ open, onClose }) => {
    const [utilityValueIndex, setUtilityValueIndex] = useState(0);
    const [rentingDurationUnit, setRentinDurationUnit] = useState('minute');
    const [rentingTier, setRentingTier] = useState('ad-hoc');
    const [rentalFeePerUnitAmountValue, setRentalFeePerUnitAmountValue] = useState(0);
    const [collateralAmountValue, setCollateralAmountValue] = useState(0);
    const [gracePeriod, setGracePeriod] = useState(0);


    return (
        <Dialog open={open} onClose={() => console.log('closing!')} sx={{
             pb: 8, color: 'surfaceDark.main', border: 1, borderRadius: 1, width: '100%'
        }} maxWidth="md" fullWidth>
            <ModalTitleBar text='Rent Your NFT on Crabble!'/>
            <DialogContent sx={{ color: 'onSurfaceText.main', bgcolor: 'surface.main', '& .MuiDialog-paper': {bgcolor: ''} }}>
                <Stack direction={"row"} justifyContent="space-between" sx={{mb: 3}}>
                    <Stack sx={{alignItems: 'flex-start'}}>
                        <Typography variant="h6">Choose the NFT you want to rent</Typography>
                        <Selector label={"NFT Balance"} helperText={"NFT Balance"}
                                  current={utilityValueIndex} callback={setUtilityValueIndex} fullWidth={true}
                        >
                            <MenuItem value="minute">Minute</MenuItem>
                            <MenuItem value="hour">Hour</MenuItem>
                            <MenuItem value="day">Day</MenuItem>
                            <MenuItem value="week">Week</MenuItem>
                        </Selector>
                    </Stack>
                    <Stack sx={{alignItems: 'flex-end'}}>
                        <Typography variant="h6">What is your renting duration?</Typography>
                        <Selector label={"Renting Unit"} helperText={"Renting Unit"}
                                  current={rentingDurationUnit} callback={setRentinDurationUnit} fullWidth={true}
                        >
                            <MenuItem value="minute">Minute</MenuItem>
                            <MenuItem value="hour">Hour</MenuItem>
                            <MenuItem value="day">Day</MenuItem>
                            <MenuItem value="week">Week</MenuItem>
                        </Selector>
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between" sx={{mb: 3}}>
                    <Stack sx={{flexGrow: 1}}>
                        <Typography variant="h6">What renting tier are you planning<br/> to use?</Typography>
                        <Stack direction="row" alignItems="center" pt={2}>
                            <Radio
                                id="ad-hoc"
                                type="radio"
                                checked={rentingTier === 'ad-hoc'}
                                onChange={ev => setRentingTier(ev.target.value)}
                                name="rentingTier"
                                size="small"
                                value="ad-hoc"
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
                    <Stack alignItems={'flex-end'}>
                        <Typography variant="h6" align={"right"}>How much are you going to charge<br/> per renting duration ?</Typography>
                        <TextInput onChange={setRentalFeePerUnitAmountValue} name={'Rental Fee Per Unit'}
                                   current={Number(rentalFeePerUnitAmountValue)}
                        />
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between" sx={{mb: 2}}>
                    <Stack>
                        <Typography variant="h6">Secure yourself with a fair amount of collateral</Typography>
                        <TextInput onChange={setCollateralAmountValue} name={'Collateral Amount'}
                                   current={Number(collateralAmountValue)}
                        />
                    </Stack>
                    <Stack alignItems="flex-end">
                        <Typography variant="h6">Enter Grace Period</Typography>
                        <TextInput onChange={setGracePeriod} name={'Grace Period'}
                                   current={Number(gracePeriod)}
                        />
                    </Stack>
                </Stack>
                <Stack justifyContent="">
                    <Typography variant={"h6"}>Renting Duration</Typography>
                    <Stack>
                        <Stack direction="row" justifyContent='flex-start' alignItems="center">

                            <TextInput onChange={setGracePeriod} name={'Min'}
                                       current={Number(gracePeriod)} size={"small"} width={50}
                            />
                            <Typography sx={{ml: 2, mr: 2}} variant="body1">{rentingDurationUnit}(s) to</Typography>
                            <TextInput onChange={setGracePeriod} name={'Max'}
                                       current={Number(gracePeriod)} width={50}
                            />
                            <Typography variant="body1" sx={{ml: 1, mr: 1}}>{rentingDurationUnit}(s)</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions sx={{bgcolor: 'surface.main', pb: 2, pr: 2}}>
                <Button variant="outlined" color={"onSurface"} onClick={onClose}>Cancel</Button>
                <Button variant="contained" color={"secondary"} onClick={onClose}>List My NFT</Button>
            </DialogActions>
        </Dialog>
    )
};

export default CreateRentalDialog;