import { Box } from '@mui/material';
import crabbleCollection from '../collections/crabble-images.json';
import { Explore } from './Explore.jsx';
import { shuffle } from "../helpers.js";
import useStore from "../store.js";

const CrabbleCollection = () => {
    useStore(state => state.notifierState);
    // Use this data
    const displayData = shuffle(crabbleCollection);

    return (
        <Box sx={{height: '100%'}}>
            <Explore displayData={displayData} assetKeyword={"CrabbleCollection"}/>
        </Box>
    );
};

export default CrabbleCollection;
