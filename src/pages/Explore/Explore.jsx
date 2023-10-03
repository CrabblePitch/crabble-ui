import './Explore.scss';

import { useState } from 'react';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';
import { Bag } from '../../components/Bag/Bag.jsx';
import useStore from '../../store/store.js';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import UtilityCard from '../../components/UtilityCard.jsx';
import BorrowRentalDialog from '../../components/BorrowRentalDialog.jsx';
import NothingToShow from '../../components/NothingToShow.jsx';
import { EmptyTexts } from '../../utils/constants.js';
// import { catalogData } from '../../utils/mockData.js';
import { tags } from '../../utils/crabble-config.js';

export const Explore = ({ bagOpen }) => {
    const getKeywordFromBrand = useStore((state) => state.getKeywordFromBrand);
    const catalog = useStore((state) => state.catalog) || [];
    const [activeTicket, setActiveTicket] = useState(null);
    const [borrowOpen, setBorrowOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('-');

    const handleFilterSelect = (filter) => {
        console.log('Handling filter select:', filter);
        setSelectedTag(filter.toLowerCase());
    };

    const filterCallback = item => {
        const keyword = getKeywordFromBrand(item.utilityAmount.brand);
        if (!keyword) {
            console.warn('Unknown brand:', item.utilityAmount.brand);
            return false;
        }
        const tagSet = tags[keyword];
        return tagSet && tagSet.has(selectedTag.toLowerCase());
    }

    const handleCardClick = (rentalData) => {
        setActiveTicket(rentalData);
        setBorrowOpen(true);
    };

    const closeActiveTicket = () => {
        setActiveTicket(null);
        setBorrowOpen(false);
    };

    const displayBody = displayList => {
        if (displayList.length === 0) {
            return <NothingToShow message={EmptyTexts.CATALOG} />;
        }

        return (
            <Grid container spacing={4} className="GRID">
                {displayList.map((data, index) => (
                    <Grid key={index * 10} item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <UtilityCard key={index} data={data} onCardClick={handleCardClick} />
                    </Grid>
                ))}
            </Grid>
        );
    };

    const availableCatalog = [...catalog].filter(({ phase }) => phase === 'available');
    const displayList = selectedTag === '-' ? availableCatalog : [...availableCatalog].filter(filterCallback);

    return (
        <Box
            className="catalog"
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                pb: 2,
            }}
        >
        
            <Paper sx={{
                width: '70%',
                p: 2,
                bgcolor: 'surface.main',
                mt: 4,
                // borderRadius: (theme) => theme.spacing(2),
                // boxShadow: '0px 0px 80px 0px rgba(0,0,0,0.75)'
            }} elevation={6} className='Paper'>
                {bagOpen ? (
                    <Bag />
                ) : (
                    <>
                        <Box sx={{ width: 1 }}>
                            <FilterBar onFilterSelect={handleFilterSelect} />
                        </Box>

                        {displayBody(displayList)}
                    </>
                )}
            </Paper>
            <BorrowRentalDialog open={borrowOpen} rentalData={activeTicket} onClose={closeActiveTicket} />
        </Box>
    );
};
