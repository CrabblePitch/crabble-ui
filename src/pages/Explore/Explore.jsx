import './Explore.scss';

import { useState } from 'react';
import { Ticket } from '../../components/Ticket/Ticket.jsx';
import { FilterBar } from '../../components/FilterBar/FilterBar.jsx';
import { BorrowModal } from '../../components/BorrowModal/BorrowModal.jsx';
import { Bag } from '../../components/Bag/Bag.jsx';
import useStore from '../../store/store.js';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { catalogData } from '../../utils/mockData.js';
import TicketContainer from '../../components/TicketContainer.jsx';

export const Explore = ({ bagOpen }) => {
    const catalog = useStore((state) => state.catalog) || [];
    const [activeTicket, setActiveTicket] = useState(null);
    console.log('activeTicket', activeTicket);

    // const displayData = [...catalog].filter(({ phase }) => phase === 'available');
    let displayData = catalogData;
    displayData = [];
    const closeActiveTicket = () => {
        setActiveTicket(null);
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

            <Paper
                sx={{
                    width: '70%',
                    height: '100vh',
                    overflow: 'auto',
                    pb: 2,
                    bgcolor: 'surface.main',
                    borderRadius: (theme) => theme.spacing(2),
                    boxShadow: '0px 0px 80px 0px rgba(0,0,0,0.75)',
                }}
                elevation={3}
                className="Paper"
            >
                {bagOpen ? (
                    <Bag />
                ) : (
                    <>
                        <Box sx={{ width: 1, pt: 2 }}>
                            <FilterBar />
                        </Box>

                        <Grid
                            container
                            rowSpacing={1}
                            justifyContent="flex-start"
                            className="GRID"
                            sx={{ bgcolor: 'secondary' }}
                        >
                            {displayData.length === 0 ? (
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 'calc(100vh - 250px)',
                                        width: '100%',
                                    }}
                                >
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: '2rem',
                                            bgcolor: (theme) => theme.palette.surface.main,
                                            borderRadius: (theme) => theme.spacing(2),
                                            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                            maxWidth: '400px',
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            align="center"
                                            color="textSecondary"
                                            sx={{ color: (theme) => theme.palette.surface.contrastText }}
                                        >
                                            Oops, there is no NFT to show.
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ) : (
                                displayData.map((data, index) => (
                                    <Grid
                                        key={index * 10}
                                        spacing={2}
                                        item
                                        xs={4}
                                        sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                                    >
                                        <TicketContainer>
                                            <Ticket key={index} data={data} onTicketClick={setActiveTicket} />
                                        </TicketContainer>
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </>
                )}
            </Paper>
            {activeTicket && <BorrowModal ticketData={activeTicket} closeTicket={closeActiveTicket} />}
        </Box>
    );
};
