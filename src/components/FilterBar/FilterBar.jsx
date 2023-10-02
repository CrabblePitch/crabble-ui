import React, { useState } from 'react';

import './FilterBar.scss';
import { Chip } from '@mui/material';

export const FilterBar = ({ onFilterSelect }) => {
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleClick = (filter) => {
        if (selectedFilter === filter) {
            setSelectedFilter('');
            onFilterSelect('-');
        } else {
            setSelectedFilter(filter);
            onFilterSelect(filter);
        }
    };
    return (
        <div className="filter-bar">
            <div className="filter-options">
                {['Ticket', 'Education', 'Art', 'Gaming', 'Discount'].map((filterName) => (
                    <Chip
                        key={filterName}
                        label={filterName}
                        onClick={() => handleClick(filterName)}
                        color={selectedFilter === filterName ? 'secondary' : 'primary'}
                        sx={{ p: 2, mr: 1 }}
                        clickable
                    />
                ))}
            </div>
        </div>
    );
};
