import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { chainboardTicketData } from "../mockData.js";

const ChainboardTicket = () => {
    // Use this data
    const displayData = chainboardTicketData;

    return (
        <Box>
            <Typography>ChaiboardTicket</Typography>
        </Box>
    )
};

export default ChainboardTicket;