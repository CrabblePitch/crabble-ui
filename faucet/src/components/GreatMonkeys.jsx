import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { greatMonkeysData } from '../mockData.js';
import { Explore } from './Explore.jsx';

const GreatMonkeys = () => {
    // Use this data
    const displayData = greatMonkeysData;

    return (
        <Box>
            <Explore displayData={displayData} />
        </Box>
    );
};

export default GreatMonkeys;
