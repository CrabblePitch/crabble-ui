import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, MenuItem, Radio,
    Stack,
    TextField
} from "@mui/material";
import ModalTitleBar from "./ModalTitleBar.jsx";
import Typography from "@mui/material/Typography";
import { Selector, TextInput } from "./CustomComponents.jsx";
import { useState } from "react";

const CreateRentalDialog = ({ open, onClose }) => {
    const [utilityValueIndex, setUtilityValueIndex] = useState(0);
    const [rentingDurationUnit, setRentinDurationUnit] = useState(0);
    const [rentingTier, setRentingTier] = useState(0);
    const [rentalFeePerUnitAmountValue, setRentalFeePerUnitAmountValue] = useState(0);
    const [collateralAmountValue, setCollateralAmountValue] = useState(0);
    const [gracePeriod, setGracePeriod] = useState(0);


    return (
        <Dialog open={open} onClose={() => console.log('closing!')} sx={{
            pt: 8, pb: 8, color: 'surfaceDark.main', border: 1, borderRadius: 1
        }} maxWidth={800}>
            <ModalTitleBar text='Rent Your NFT on Crabble!'/>
            <DialogContent sx={{ color: 'onSurfaceText.main', minWidth: 600,bgcolor: 'surface.main', '& .MuiDialog-paper': {bgcolor: ''} }}>
                <Stack direction={"row"} justifyContent="space-between">
                    <Stack sx={{mr: 2, alignItems: 'flex-start'}}>
                        <Typography variant="h6">Choose the NFT you want to rent</Typography>
                        <Selector label={"NFT Balance"} helperText={"NFT Balance"}
                                  current={utilityValueIndex} callback={setUtilityValueIndex}
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
                                  current={rentingDurationUnit} callback={setRentinDurationUnit}
                        >
                            <MenuItem value="minute">Minute</MenuItem>
                            <MenuItem value="hour">Hour</MenuItem>
                            <MenuItem value="day">Day</MenuItem>
                            <MenuItem value="week">Week</MenuItem>
                        </Selector>
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between">
                    <Stack>
                        <Typography variant="h6">What renting tier are you planning to use?</Typography>
                        <Stack direction="row" alignItems="center">
                            <Radio
                                id="ad-hoc"
                                type="radio"
                                checked={rentingTier === 'ad-hoc'}
                                onChange={ev => setRentingTier(ev.target.data)}
                                name="rentingTier"
                                value="Ad-Hoc"
                                color="onSurfaceText"
                                sx={{ color: 'onSurfaceTextDark.main'}}
                            />
                            <Typography variant="body1">Ad-Hoc</Typography>
                            <Radio
                                id="ad-hoc"
                                type="radio"
                                checked={rentingTier === 'auction'}
                                onChange={ev => setRentingTier(ev.target.data)}
                                name="rentingTier"
                                value="auction"
                                color="onSurfaceText"
                                sx={{ color: 'onSurfaceTextDark.main'}}
                            />
                            <Typography variant="body1">Auction</Typography>
                        </Stack>
                    </Stack>
                    <Stack alignItems={'flex-end'}>
                        <Typography variant="h6">How much are you going to charge per renting duration ?</Typography>
                        <TextInput onChange={setRentalFeePerUnitAmountValue} name={'Rental Fee Per Unit Amount'}
                                   current={Number(rentalFeePerUnitAmountValue)}
                        />
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between">
                    <Stack>
                        <Typography variant="h6">Secure yourself with a fair amount of collateral</Typography>
                        <TextInput onChange={setCollateralAmountValue} name={'Collateral Amount'}
                                   current={Number(collateralAmountValue)}
                        />
                    </Stack>
                    <Stack>
                        <Typography variant="h6">Enter Grace Period</Typography>
                        <TextInput onChange={setGracePeriod} name={'Grace Period'}
                                   current={Number(gracePeriod)}
                        />
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between">
                    <Stack>
                        <Typography variant={"h6"}>Renting Duration</Typography>
                        <Stack>
                            <Stack>

                            </Stack>
                            <Stack>

                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions sx={{bgcolor: 'surface.main'}}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
};

export default CreateRentalDialog;