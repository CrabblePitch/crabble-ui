import { Box } from '@mui/material';
import chainboardCollectionData from '../collections/chainboard-images.json';
import { Explore } from './Explore.jsx';
import { shuffle } from "../helpers.js";
import useStore from "../store.js";

const ChainboardCollection = () => {
    useStore(state => state.notifierState);
    // Use this data
    const displayData = shuffle(chainboardCollectionData);

    return (
        <Box>
            <Explore displayData={displayData} assetKeyword={"ChainboardCollection"}/>
        </Box>
    );
};

export default ChainboardCollection;
