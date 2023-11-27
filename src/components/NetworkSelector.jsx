import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

/**
 * We might include this in the future
 */

const NetworkSelector = () => {
    const [age, setAge] = useState("");

    const handleChange = ev => {
        setAge(ev.target.value)
    };

    return (
        <Box>
            <FormControl sx={{ mr: 2, p :0,  minWidth: 120 }}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    variant={"filled"}
                    sx={{
                        '&:before': { border: 'none', content: 'none' },
                        '&:after': { border: 'none' },
                        '& .MuiFilledInput-input': {
                            borderRadius: 1,
                            pt: 1,
                            color: 'secondary.contrastText',
                            bgcolor: 'secondary.main',
                        },
                        '& .MuiFilledInput-input:focus': {
                            bgcolor: 'secondary.main',
                            borderRadius: 1,
                        },
                        '& .MuiSelect-icon': { color: 'secondary.contrastText' },
                        '& .MuiSelect-root': { border: 'none' },
                    }}
                >
                    <MenuItem value="">
                        choose network
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
};

export default NetworkSelector;