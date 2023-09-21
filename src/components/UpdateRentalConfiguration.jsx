import Typography from "@mui/material/Typography";
import { Box, IconButton, MenuItem, Stack } from "@mui/material";
import { Selector, TextInput } from "./CustomComponents.jsx";
import { UpdateRentalConfigButton } from "./UpdateRentalConfig/UpdateRentalConfigButton.jsx";
import { getValueFromNat, getValueFromSet } from "../utils/helpers.js";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { RentalPhase } from "../utils/constants.js";

const UpdateRentalConfiguration = ({ rental }) => {
    const [isEditing, setEditing] = useState(false);

    // Override State
    const [collateralAmount, setColAmount] = useState('');
    const [rentalFeePerUnitAmount, setRentalFeePerUnitAmount] = useState('');
    const [utilityDescription, setUtilityDescription] = useState('');
    const [utilityTitle, setUtilityTitle] = useState('');
    const [rentingDurationUnit, setRentinDurationUnit] = useState('');
    const [minRentingDurationUnits, setMinRentinDurationUnit] = useState('');
    let configDisabled = false;

    useEffect(() => {
        if (!rental) return;

        resetState(rental.configuration);

        configDisabled = !(rental.phase === RentalPhase.AVAILABLE);
    }, [rental]);

    const resetState = (configuration) => {
        setEditing(false);
        setColAmount(getValueFromNat(configuration.collateralAmount));
        setRentalFeePerUnitAmount(getValueFromNat(configuration.rentalFeePerUnitAmount));
        setUtilityDescription(configuration.utilityDescription);
        setUtilityTitle(configuration.utilityTitle);
        setRentinDurationUnit(configuration.rentingDurationUnit);
        setMinRentinDurationUnit(Number(configuration.minRentingDurationUnits))
    };

    const handleEditClick = () => {
      setEditing(true);
    };

    const handleClearClick = () => {
        resetState(rental.configuration);
    };

    if (!rental) return;

    return (
        <Box sx={{
            height: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                <Typography variant='h6' align='left' sx={{ color: 'onSurfaceText.main', mr: 2}}>
                    Config
                </Typography>
                {!isEditing && <IconButton onClick={handleEditClick} size={"small"} sx={{
                    bgcolor: 'primary.main',
                    color: 'onSurfaceText.main',
                    borderRadius: 2,
                    mr: 2
                }} disabled={configDisabled}>
                    <EditIcon/>
                </IconButton>}
                {isEditing && <IconButton onClick={handleClearClick} size={"small"} sx={{
                    bgcolor: 'error.main',
                    color: 'onSurfaceText.main',
                    borderRadius: 2
                }} disabled={configDisabled}>
                    <ClearRoundedIcon/>
                </IconButton>}
            </Box>


            <Box sx={{
                pointerEvents: isEditing ? '' : 'none',
                borderRadius: 2,
                color: isEditing ? 'success.main' : 'onSurfaceTextDark.main',
                border: isEditing ? 3 : 1,
                pr: 2,
                pl: 2,
                pb: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>

                    <TextInput  name={'Collateral Amount'}
                               current={collateralAmount}
                                onChange={setColAmount}
                    />
                    <TextInput  name={'Rental Fee Per Unit Amount'}
                               current={rentalFeePerUnitAmount}
                                onChange={setRentalFeePerUnitAmount}
                    />
                </Box>

                <Box sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <TextInput onChange={setUtilityTitle}  name={'Utility Title'} current={utilityTitle}/>
                    <TextInput onChange={setUtilityDescription}  name={'Utility Description'} current={utilityDescription}/>
                </Box>

                <Box sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Selector label={"Renting Unit"} helperText={"Renting Unit"}
                              current={rentingDurationUnit} callback={setRentinDurationUnit}
                    >
                        <MenuItem value="minute">Minute</MenuItem>
                        <MenuItem value="hour">Hour</MenuItem>
                        <MenuItem value="day">Day</MenuItem>
                        <MenuItem value="week">Week</MenuItem>
                    </Selector>
                    <TextInput onChange={setMinRentinDurationUnit} name={'Minimum Renting Duration'}
                               current={Number(minRentingDurationUnits)}
                    />

                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }}>
                <UpdateRentalConfigButton disabled={configDisabled}/>
            </Box>

        </Box>
  )
};

export default UpdateRentalConfiguration;