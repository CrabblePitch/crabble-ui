import { Box, SvgIcon } from "@mui/material";
import { ReactComponent as Crabble } from '../assets/crabble.svg';
import Typography from "@mui/material/Typography";

const CrabbleIcon = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mr: 2,
        }}>
            <SvgIcon sx={{ width: '56', height: '56', mr: 2}} component={Crabble} inheritViewBox />
            <Typography variant='h6' color='primary.contrastText' sx={{ textTransform: 'none'}}>
                <b>crabble</b>
            </Typography>
        </Box>
    )
};

export default CrabbleIcon;