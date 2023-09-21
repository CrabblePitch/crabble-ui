import './Explore.scss';

import { useState } from 'react';
import { Ticket } from '../../components/Ticket/Ticket.jsx';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';
import { BorrowModal } from '../../components/BorrowModal/BorrowModal.jsx';
import { Bag } from '../../components/Bag/Bag.jsx';
import useStore from '../../store/store.js';
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { catalogData } from "../../utils/mockData.js";
import TicketContainer from "../../components/TicketContainer.jsx";
import UtilityCard from "../../components/UtilityCard.jsx";

export const Explore = ({ bagOpen }) => {
    const catalog = useStore((state) => state.catalog) || [];
    const [activeTicket, setActiveTicket] = useState(null);
    console.log('activeTicket', activeTicket);

    // const displayData = [...catalog].filter(({ phase }) => phase === 'available');
    const displayData = catalogData;

    const closeActiveTicket = () => {
        setActiveTicket(null);
    };

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
                minWidth: 0,
                minHeight: 0,
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

                        <Grid container spacing={4} className='GRID'>
                            {displayData.map((data, index) => (
                                <Grid key={index * 10} item xs={4}
                                      sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <UtilityCard key={index} data={data} onCardClick={setActiveTicket}/>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Paper>
            {activeTicket && <BorrowModal ticketData={activeTicket} closeTicket={closeActiveTicket}/>}
        </Box>
    );
};
