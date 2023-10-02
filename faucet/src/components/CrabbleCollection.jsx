import { Box } from '@mui/material';
import crabbleCollection from '../collections/crabble-images.json';
import { Explore } from './Explore.jsx';

const CrabbleCollection = () => {
    // Use this data
    const displayData = crabbleCollection;

    return (
        <Box sx={{height: '100%'}}>
            <Explore displayData={displayData} assetKeyword={"CrabbleCollection"}/>
        </Box>
    );
};

export default CrabbleCollection;
