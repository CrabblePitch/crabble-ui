import { Box } from '@mui/material';
import { awesomeCollectionData } from '../mockData.js';
import { Explore } from './Explore.jsx';

const AwsomeCollection = () => {
    // Use this data
    const displayData = awesomeCollectionData;

    return (
        <Box>
            <Explore displayData={displayData} assetKeyword={"AwesomeCollection"}/>
        </Box>
    );
};

export default AwsomeCollection;
