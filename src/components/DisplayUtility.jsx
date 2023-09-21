import { Box, Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getValueFromSet } from "../utils/helpers.js";
import PhaseChip from "./PhaseChip.jsx";

const DisplayUtility = ({ rental }) => {
    const  { phase, configuration} = rental;
    const utilityValue = getValueFromSet(configuration.utilityAmount);
    return (
        <Box sx={{
            borderRadius: 1,
            border: 1,
            borderColor: 'onSurfaceTextDark.main',
            p: 2,
            m: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }}>
            <Box sx={{
                flex: 2,
                borderRadius: 1,
                pb: 4
            }} component="img" src={utilityValue.imagePath}/>

            <Box sx={{
                width: 1,
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography variant='h5' align='left' sx={{ color: 'onSurfaceText.main' }}>
                    {configuration.utilityTitle}
                </Typography>
            </Box>

            <Divider sx={{ mt: 1, bgcolor: 'onSurfaceTextDark.main'}}/>

            <Box sx={{flex: 2}}>
                {[...Object.entries(utilityValue)]
                    .filter(([key]) => key !== 'imagePath')
                    .map(([key, value]) => (
                        <Stack sx={{flex: 1}}>
                            <Typography variant='subtitle1' align='left'
                                        sx={{ color: 'onSurfaceText.main' }}>
                                {key}
                            </Typography>
                            <Typography variant='body' align='left'
                                        sx={{ color: 'onSurfaceTextDark.main' }}>
                                {value}
                            </Typography>
                        </Stack>
                    ))}
            </Box>
        </Box>
    )
};

export default DisplayUtility;