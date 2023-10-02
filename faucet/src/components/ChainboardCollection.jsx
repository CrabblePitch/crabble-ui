import { Box } from '@mui/material';
import chainboardCollectionData from '../collections/chainboard-images.json';
import { Explore } from './Explore.jsx';

const ChainboardCollection = () => {
    // Use this data
    const displayData = chainboardCollectionData;

    return (
        <Box>
            <Explore displayData={displayData} assetKeyword={"ChainboardCollection"}/>
        </Box>
    );
};

export default ChainboardCollection;
