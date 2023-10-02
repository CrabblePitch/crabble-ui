import { Stack } from "@mui/material";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Typography from "@mui/material/Typography";

const NothingToShow = ({ message }) => {
    return (
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}
               sx={{ color: 'onSurfaceText.main', mt: 4 }}>
            <SentimentDissatisfiedIcon fontSize={"large"}/>
            <Typography variant={"subtitle1"} sx={{ ml: 2 }}>
                {message}
            </Typography>
        </Stack>
    )
};

export default NothingToShow;