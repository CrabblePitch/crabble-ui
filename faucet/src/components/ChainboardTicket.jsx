import { Box } from '@mui/material';
import { chainboardTicketData } from '../mockData.js';
import { Explore } from './Explore.jsx';

const ChainboardTicket = () => {
    // Use this data
    const displayData = chainboardTicketData;

    return (
        <Box>
            <Explore displayData={displayData} assetKeyword={"ChainboardTicket"}/>
        </Box>
    );
};

export default ChainboardTicket;
