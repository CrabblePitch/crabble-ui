import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { chainboardTicketData } from '../mockData.js';
import { Explore } from './Explore.jsx';

const ChainboardTicket = () => {
    // Use this data
    const displayData = chainboardTicketData;

    return (
        <Box>
            <Explore displayData={displayData} />
        </Box>
    );
};

export default ChainboardTicket;
