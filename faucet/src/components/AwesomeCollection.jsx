import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { awesomeCollectionData } from '../mockData.js';
import { Explore } from './Explore.jsx';

const AwsomeCollection = () => {
    // Use this data
    const displayData = awesomeCollectionData;

    return (
        <Box>
            <Explore displayData={displayData} />
        </Box>
    );
};

export default AwsomeCollection;
