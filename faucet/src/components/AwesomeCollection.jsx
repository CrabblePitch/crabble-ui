import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { awesomeCollectionData } from "../mockData.js";

const AwsomeCollection = () => {
    // Use this data
    const displayData = awesomeCollectionData;

    return (
        <Box>
            <Typography>AwsomeCollection</Typography>
        </Box>
    )
};

export default AwsomeCollection;