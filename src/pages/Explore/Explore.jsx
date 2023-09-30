import { useState } from 'react';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';
import { Bag } from '../../components/Bag/Bag.jsx';
import useStore from '../../store/store.js';
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import UtilityCard from "../../components/UtilityCard.jsx";
import BorrowRentalDialog from "../../components/BorrowRentalDialog.jsx";
import NothingToShow from "../../components/NothingToShow.jsx";
import { EmptyTexts } from "../../utils/constants.js";

export const Explore = ({ bagOpen }) => {
    const catalog = useStore((state) => state.catalog) || [];
    const [activeTicket, setActiveTicket] = useState(null);
    const [borrowOpen, setBorrowOpen] = useState(false);
    console.log('activeTicket', activeTicket);

    const displayData = [...catalog].filter(({ phase }) => phase === 'available');
    // const displayData = catalogData;

    const handleCardClick = rentalData => {
      setActiveTicket(rentalData);
      setBorrowOpen(true);
    };

    const closeActiveTicket = () => {
        setActiveTicket(null);
        setBorrowOpen(false);
    };

    const displayBody = () => {
        if (displayData.length === 0) {
            return (<NothingToShow message={EmptyTexts.CATALOG}/>)
        }

        return (
            <Grid container spacing={4} className='GRID'>
                {displayData.map((data, index) => (
                    <Grid key={index * 10} item xs={4}
                          sx={{ display: 'flex', justifyContent: 'center' }}>
                        <UtilityCard key={index} data={data} onCardClick={handleCardClick}/>
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <Box className="catalog" sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            pb: 2,
        }}>
            <Typography variant="h3" align='center' m={2} color={'surface.contrastText'}>Rent whatever you
                want</Typography>

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
                    <Bag/>
                ) : (
                    <>
                        <Box sx={{ width: 1}}>
                            <FilterBar/>
                        </Box>

                        {displayBody()}
                    </>
                )}
            </Paper>
            <BorrowRentalDialog open={borrowOpen} rentalData={activeTicket} onClose={closeActiveTicket}/>
        </Box>
    );
};
