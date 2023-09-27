import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { greatMonkeysData } from "../mockData.js";

const GreatMonkeys = () => {
    // Use this data
    const displayData = greatMonkeysData;

    return (
        <Box>
            <Typography>GreatMonkeys</Typography>
        </Box>
    )
};

export default GreatMonkeys;