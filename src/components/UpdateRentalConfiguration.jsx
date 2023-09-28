import Typography from "@mui/material/Typography";
import { Box, IconButton, MenuItem, Stack } from "@mui/material";
import { Selector, TextInput } from "./CustomComponents.jsx";
import { UpdateRentalConfigButton } from "./UpdateRentalConfig/UpdateRentalConfigButton.jsx";
import { displayAmount, makeRentalConfigValidator } from "../utils/helpers.js";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { ErrorMessages, RentalPhase } from "../utils/constants.js";
import { secToUnitOfTime, unitOfTimeToSec } from "../utils/time.js";

const getDisplayConfigDefaults = configuration => {
    return harden({
        rentingDurationUnit: configuration.rentingDurationUnit,
        rentalFeePerUnitVal: configuration.rentalFeePerUnitAmount.value,
        collateralVal: configuration.collateralAmount.value,
        gracePeriodDuration: String(configuration.gracePeriodDuration),
        minRentingDurationUnits: String(configuration.minRentingDurationUnits),
        maxRentingDurationUnits: String(configuration.maxRentingDurationUnits),
    })
};

const makeUpdateHelper = (currentValues, configuration) => {
    const defaults = getDisplayConfigDefaults(configuration);

    const checkForChange = (overrides) => {
        return Object.entries(overrides).length > 0;
    };

    const buildOverrides = () => {
        const overrides = {};

        [...Object.entries(currentValues)].forEach(([key, value]) => {
            if (defaults[key] !== value) overrides[key] = value;
        });

        return overrides;
    };

    return harden({
        checkForChange,
        buildOverrides,
    })
};

const UpdateRentalConfiguration = ({ rental, onClose }) => {
    const [isEditing, setEditing] = useState(false);

    // Override State
    const [collateralVal, setCollateralVal] = useState(0n);
    const [rentalFeePerUnitVal, setRentalFeePerUnitVal] = useState(0n);
    const [rentingDurationUnit, setRentinDurationUnit] = useState('minute');
    const [gracePeriodDuration, setGracePeriodDuration] = useState(0);
    const [minRentingDurationUnits, setMinRentingDurationUnits] = useState(0);
    const [maxRentingDurationUnits, setMaxRentingDurationUnits] = useState(0);

    const [errors, setErrors] = useState({
        rentingDurationUnit: false,
        rentalFeePerUnitVal: false,
        collateralVal: false,
        gracePeriodDuration: false,
        minRentingDurationUnits: false,
        maxRentingDurationUnits: false,
    });

    const validationConfig = {
        rentingDurationUnit,
        rentalFeePerUnitVal,
        collateralVal,
        gracePeriodDuration,
        minRentingDurationUnits,
        maxRentingDurationUnits,
    };

    const { validate } = makeRentalConfigValidator(errors, setErrors, validationConfig);

    useEffect(() => {
        if (!rental) return;

        resetState(rental.configuration);
    }, [rental]);

    const resetState = (configuration) => {
        const defaults = getDisplayConfigDefaults(configuration);
        setEditing(false);
        setCollateralVal(defaults.collateralVal);
        setRentalFeePerUnitVal(defaults.rentalFeePerUnitVal);
        setRentinDurationUnit(defaults.rentingDurationUnit);
        setMinRentingDurationUnits(defaults.minRentingDurationUnits);
        setMaxRentingDurationUnits(defaults.maxRentingDurationUnits);
        setGracePeriodDuration(defaults.gracePeriodDuration);
    };

    const handleEditClick = () => {
      setEditing(true);
    };

    const handleClearClick = () => {
        resetState(rental.configuration);
    };

    const handleRentalDurationUnitChange = (value) => {
      setGracePeriodDuration("0");
      setRentinDurationUnit(value);
    };

    const displayCollateral = () => {
        if (!rental) return '';

        const brand = rental.configuration.collateralAmount.brand;
        return displayAmount({ brand, value: collateralVal });
    };

    const displayRentalFeePerUnit = () => {
        if (!rental) return '';

        const brand = rental.configuration.rentalFeePerUnitAmount.brand;
        return displayAmount({ brand, value: rentalFeePerUnitVal });
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
                    mr: 2,
                }} disabled={!(rental.phase === RentalPhase.AVAILABLE)}>
                    <EditIcon/>
                </IconButton>}
                {isEditing && <IconButton onClick={handleClearClick} size={"small"} sx={{
                    bgcolor: 'error.main',
                    color: 'onSurfaceText.main',
                    borderRadius: 2
                }} disabled={!(rental.phase === RentalPhase.AVAILABLE)}>
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

                    <TextInput name={'Collateral Amount'}
                               current={displayCollateral()}
                               onChange={setCollateralVal}
                               amountInput={true}
                               error={{value: errors.collateralVal, text: ErrorMessages.NUMERIC}}
                    />
                    <TextInput onChange={setRentalFeePerUnitVal}
                               name={'Rental Fee Per Unit'}
                               current={displayRentalFeePerUnit()}
                               amountInput={true}
                               error={{ value: errors.rentalFeePerUnitVal, text: ErrorMessages.NUMERIC}}
                    />
                </Box>

                <Box sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Selector label={"Renting Unit"}
                              helperText={"Renting Unit"}
                              current={rentingDurationUnit}
                              callback={handleRentalDurationUnitChange}
                              // fullWidth={true}
                              error={{ value: errors.rentingDurationUnit, text: ErrorMessages.STRING}}
                    >
                        <MenuItem value="minute">Minute</MenuItem>
                        <MenuItem value="hour">Hour</MenuItem>
                        <MenuItem value="day">Day</MenuItem>
                        <MenuItem value="week">Week</MenuItem>
                    </Selector>


                    <TextInput onChange={value => setGracePeriodDuration(unitOfTimeToSec(rentingDurationUnit, value))}
                               name={`Grace Period in ${rentingDurationUnit}s`}
                               current={secToUnitOfTime(rentingDurationUnit, gracePeriodDuration)}
                               error={{value: errors.gracePeriodDuration, text: ErrorMessages.NUMERIC}}
                    />
                </Box>

                <Box sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'onSurfaceText.main'
                }}>
                    <Stack direction="row" justifyContent='flex-start' alignItems="center">

                        <TextInput onChange={setMinRentingDurationUnits}
                                   name={'Min'}
                                   current={minRentingDurationUnits}
                                   size={"small"}
                                   width={50}
                                   error={{ value: errors.minRentingDurationUnits, text: ErrorMessages.NUMERIC }}
                        />
                        <Typography sx={{ ml: 2, mr: 2 }} variant="body1">{rentingDurationUnit}(s) to</Typography>
                        <TextInput onChange={setMaxRentingDurationUnits}
                                   name={'Max'}
                                   current={maxRentingDurationUnits}
                                   width={50}
                                   error={{ value: errors.maxRentingDurationUnits, text: ErrorMessages.NUMERIC }}
                        />
                        <Typography variant="body1" sx={{ ml: 1, mr: 1 }}>{rentingDurationUnit}(s)</Typography>
                    </Stack>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }}>
                <UpdateRentalConfigButton
                    rental={rental}
                    controllers={{ validate, helper: makeUpdateHelper(validationConfig, rental.configuration) }}
                    onClose={onClose}
                />
            </Box>

        </Box>
  )
};

export default UpdateRentalConfiguration;