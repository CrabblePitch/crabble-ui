import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';

import './FilterBar.scss';
import { Chip, IconButton } from "@mui/material";

export const FilterBar = () => {
    return (
        <div className="filter-bar">
            <div className="filter-options">
                <Chip label="Ticket" color="primary" sx={{p: 2, mr: 1 }} clickable />
                <Chip label="Education" color={'primary'}  sx={{p: 2, mr: 1}} clickable/>
                <Chip label="Gaming" color={'primary'}  sx={{p: 2, mr: 1}} clickable/>
                <Chip label="Discount" color={'primary'}  sx={{p: 2, mr: 1}} clickable/>
            </div>
            <div className="filter-btns">
                <IconButton size="large" sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: 2,
                    mr: 1,
                }}>
                    <FilterAltOutlinedIcon/>
                </IconButton>
                <IconButton size="large" sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: 2,
                }}>
                    <SwapVertOutlinedIcon/>
                </IconButton>
            </div>
        </div>
    );
};
