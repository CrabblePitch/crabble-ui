import './RentalModal.scss';

import { ModalWrapper } from '../shared/ModalWrapper/ModalWrapper.jsx';
import { Close as CloseIcon } from '@mui/icons-material';
import { UpdateRentalConfigButton } from '../UpdateRentalConfig/UpdateRentalConfigButton.jsx';
import {
    WithdrawUtility as WithdrawUtilityButton,
    WithdrawRentalFee as WithdrawRentalFeeButton,
    WithdrawCollateral as WithdrawCollateralButton,
} from '../Withdraw';
import { mockUtilityData } from '../../pages/Explore/_mockUtility.js';
import { capitalize } from '../../utils/text-utils.js';
import { Box, Chip, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Stack, TextField } from '@mui/material';
import Typography from "@mui/material/Typography";
import ModalTitleBar from "../ModalTitleBar.jsx";
import { getValueFromSet } from "../../utils/helpers.js";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const RentalModal = ({ rental, closeModal, open }) => {

    const [overrides] = useState('');

    if (!rental) return;

    const onModalClose = () => {
        closeModal();
    };

    const prepareUtilityConfig = (utility) => {
        const { configuration } = utility;

        // INFO: modify according to the requirements if needed
        const uiConfig = {
            'Collateral amount': configuration.collateralAmount.value,
            'Rental fee (per unit)': configuration.rentalFeePerUnitAmount.value,
            'Utility title': configuration.utilityTitle,
            'Utility description': configuration.utilityDescription,
            'Renting tier': configuration.rentingTier,
            'Renting duration unit': configuration.rentingDurationUnit,
            'Maximum renting duration': configuration.maxRentingDurationUnits,
            'Minimum renting duration': configuration.minRentingDurationUnits,
            'Grace period duration': configuration.gracePeriodDuration,
        };

        return Object.entries(uiConfig);
    };

    const controllers = {
        snackbar: console.log,
        modal: () => console.log('This is not a modal'),
    };

    const style = {
        position: 'sticky',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'surface.main',
        borderColor: 'line.main',
        boxShadow: 24,
        overflow: 'visible',
        pb: 2,
    };

    return (
        <Modal
            open={open}
            onClose={closeModal}
            className='MODAL'
        >
            <Box  sx={style}>
                <ModalTitleBar text={'Rent Your NFT on Crabble!'}/>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                }} className="parent">
                    <Box sx={{
                        flex: 4,
                    }}>
                        <Box>
                            <Box sx={{
                                borderRadius: 1,
                                p: 2,
                            }} component="img" src={rental.configuration.utilityAmount.value[0].imagePath}/>

                            <Box sx={{
                                width: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                pl: 2,
                                pr: 2,
                            }}>
                                <Typography variant='h5' align='left' sx={{ color: 'onSurfaceText.main'}}>
                                    {rental.configuration.utilityTitle}
                                </Typography>
                                <Chip label={rental.phase} color='success'/>
                            </Box>



                            {[...Object.entries(getValueFromSet(rental.configuration.utilityAmount))]
                                .filter(([key]) => key !== 'imagePath')
                                .map(([key, value]) => (
                                    <Stack sx={{pl: 2}}>
                                        <Typography variant='subtitle1' align='left' sx={{color: 'onSurfaceText.main'}}>
                                            {key}
                                        </Typography>
                                        <Typography variant='body' align='left' sx={{color: 'onSurfaceTextDark.main'}}>
                                            {value}
                                        </Typography>
                                    </Stack>
                                ))}
                        </Box>
                        </Box>

                    <Box sx={{
                        flex: 6,
                        overflow: 'auto',
                        pr: 2,
                    }} className="target">

                        <Box sx={{
                            height: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                flex: 2,
                            }}>
                                <WithdrawUtilityButton rental={rental} controllers={controllers}/>
                                <WithdrawCollateralButton rental={rental} controllers={controllers}/>
                                <WithdrawRentalFeeButton rental={rental} controllers={controllers}/>
                            </Box>

                            <Box sx={{
                                flex: 4,
                            }}>
                                <Typography variant='h6' align='left' sx={{ color: 'onSurfaceText.main', mt: 2}}>
                                    Config
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <TextField id="standard-basic" label="100" variant="standard" size="small" helperText="Collateral Amount" InputProps={{
                                        readOnly: true,
                                    }}/>
                                    <TextField id="standard-basic" label="100" variant="standard" size="small" helperText="Rental Fee Per Unit Amount" InputProps={{
                                        readOnly: true,
                                    }}/>
                                </Box>

                                <Box sx={{
                                    mt: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <TextField id="standard-basic" label="100" variant="standard" size="small" helperText="Utility Title" InputProps={{
                                        readOnly: false,
                                    }} sx={{
                                        ' label.Mui-focused': { bgcolor: 'secondary.main' },
                                        '& .MuiInput-underline:before': {
                                            color: 'onSurfaceTextDark.dark',
                                            borderBottomColor: 'onSurfaceTextDark.dark'
                                        },
                                        '& .MuiInputBase-root:hover': { color: 'onSurfaceTextDark.dark' },
                                        '& .MuiInputBase-root:before': { color: 'onSurfaceTextDark.dark' },
                                        'p.MuiFormHelperText-root' : { color: 'onSurfaceTextDark.main' }
                                    }}/>
                                    <TextField id="standard-basic" label="100" variant="standard" size="small" helperText="Utility Description" InputProps={{
                                        readOnly: true,
                                    }}/>
                                </Box>

                                <Box sx={{
                                    mt: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}  color="onSurfaceTextDark">
                                    <FormControl variant="standard" color="onSurfaceTextDark" sx={{ minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-filled-label"  sx={{ color: 'onSurfaceTextDark.main' }}>Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            color="onSurfaceTextDark"
                                            sx={{
                                                '&:before': { borderColor: 'onSurfaceTextDark.main'},
                                                '&:not(.Mui-disabled):hover::before': {
                                                    borderColor: 'onSurfaceTextDark.main',
                                                },
                                                '& .MuiSelect-select': { color: 'onSurfaceTextDark.main'},
                                                '& .MuiSelect-icon': { color: 'onSurfaceTextDark.main'},
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField id="standard-basic" label="100" variant="standard" size="small" helperText="Rental Fee Per Unit Amount" InputProps={{
                                        readOnly: true,
                                    }}/>
                                </Box>

                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default RentalModal;
