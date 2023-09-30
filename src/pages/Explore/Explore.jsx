import './Explore.scss';

import { useEffect, useState } from 'react';
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
import { catalogData } from '../../utils/mockData.js';
import { tags } from '../../utils/crabble-config.js';

export const Explore = ({ bagOpen }) => {
    const getKeywordFromBrand = useStore((state) => state.getKeywordFromBrand);
    const catalog = useStore((state) => state.catalog) || [];
    const [activeTicket, setActiveTicket] = useState(null);
    const [borrowOpen, setBorrowOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('-');
    const [displayList, setDisplayList] = useState([]);

    // const displayData = [...catalog].filter(({ phase }) => phase === 'available');
    const displayData = catalogData;

    useEffect(() => {
        setDisplayList(filterTags());
    }, [selectedTag]);

    const handleFilterSelect = (filter) => {
        console.log('Handling filter select:', filter);
        setSelectedTag(filter.toLowerCase());
    };
    const filterTags = () => {
        if (selectedTag === '-') {
            return displayData;
        }

        return displayData.filter((item) => {
            const keyword = getKeywordFromBrand(item.utilityAmount.brand);
            if (keyword === 'Unknown') {
                console.warn('Unknown brand:', item.utilityAmount.brand);
                return false;
            }
            const tagSet = tags[keyword];
            return tagSet && tagSet.has(selectedTag.toLowerCase());
        });
    };

    const handleCardClick = (rentalData) => {
        setActiveTicket(rentalData);
        setBorrowOpen(true);
    };

    const closeActiveTicket = () => {
        setActiveTicket(null);
        setBorrowOpen(false);
    };

    const displayBody = () => {
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
            <Typography variant="h3" align="center" m={2} color={'surface.contrastText'}>
                Rent whatever you want
            </Typography>

            <Paper sx={{
                width: '70%',
                height: '100vh',
                overflow: 'auto',
                p: 2,
                bgcolor: 'surface.main',
                borderRadius: (theme) => theme.spacing(2),
                boxShadow: '0px 0px 80px 0px rgba(0,0,0,0.75)'
            }} elevation={3} className='Paper'>
                {bagOpen ? (
                    <Bag />
                ) : (
                    <>
                        <Box sx={{ width: 1 }}>
                            <FilterBar onFilterSelect={handleFilterSelect} />
                        </Box>

                        {displayBody()}
                    </>
                )}
            </Paper>
            <BorrowRentalDialog open={borrowOpen} rentalData={activeTicket} onClose={closeActiveTicket} />
        </Box>
    );
};
