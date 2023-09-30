import { Box } from '@mui/material';
import { greatMonkeysData } from '../mockData.js';
import { Explore } from './Explore.jsx';

const GreatMonkeys = () => {
    // Use this data
    const displayData = greatMonkeysData;

    return (
        <Box>
            <Explore displayData={displayData} assetKeyword={"GreatMonkeys"}/>
        </Box>
    );
};

export default GreatMonkeys;
