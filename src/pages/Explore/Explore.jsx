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

export const Explore = ({ bagOpen }) => {
    const catalog = useStore((state) => state.catalog) || [];
    const [activeTicket, setActiveTicket] = useState(null);
    console.log('activeTicket', activeTicket);

    // const displayData = [...catalog].filter(({ phase }) => phase === 'available');
    const displayData = [
        {
            configuration: {
                collateralAmount: { value: 100n},
                utilityTitle: 'House',
                utilityDescription : 'Family house available for vacations',
                rentingTier: 'Ad-Hoc',
                rentingDurationUnit: 'minute',
                minRentingDurationUnits: 1n,
                maxRentingDurationUnits: 60n,
                gracePeriodDuration: 10n * 60n, // 10 mins grace period,
            },
            phase: 'available'
        },
        {
            configuration: {
                collateralAmount: { value: 100n},
                utilityTitle: 'House',
                utilityDescription : 'Family house available for vacations',
                rentingTier: 'Ad-Hoc',
                rentingDurationUnit: 'minute',
                minRentingDurationUnits: 1n,
                maxRentingDurationUnits: 60n,
                gracePeriodDuration: 10n * 60n, // 10 mins grace period,
            },
            phase: 'available'
        },
        {
            configuration: {
                collateralAmount: { value: 100n},
                utilityTitle: 'House',
                utilityDescription : 'Family house available for vacations',
                rentingTier: 'Ad-Hoc',
                rentingDurationUnit: 'minute',
                minRentingDurationUnits: 1n,
                maxRentingDurationUnits: 60n,
                gracePeriodDuration: 10n * 60n, // 10 mins grace period,
            },
            phase: 'available'
        },
        {
            configuration: {
                collateralAmount: { value: 100n},
                utilityTitle: 'House',
                utilityDescription : 'Family house available for vacations',
                rentingTier: 'Ad-Hoc',
                rentingDurationUnit: 'minute',
                minRentingDurationUnits: 1n,
                maxRentingDurationUnits: 60n,
                gracePeriodDuration: 10n * 60n, // 10 mins grace period,
            },
            phase: 'available'
        }
    ]

    const closeActiveTicket = () => {
        setActiveTicket(null);
    };

    return (
        <div className="explore">
            {bagOpen ? (
                <Bag />
            ) : (
                <Box className="catalog" sx={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant="h3" align='center' m={2} color={'surface.contrastText'}>Rent whatever you want</Typography>

                    <Paper sx={{ width: '70%', height: '100vh', bgcolor: 'onSurface.main'}} elevation={3} className='Paper'>
                        <Box sx={{ width: 1, pt: 2}}>
                            <FilterBar />
                        </Box>

                        <Grid container rowSpacing={1} justifyContent='flex-start' className='GRID' sx={{bgcolor: 'secondary'}}>
                            {displayData.map((data, index) => (
                                <Grid key={index * 10} spacing={2} item xs={4} sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Ticket key={index} data={data} onTicketClick={setActiveTicket} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                    {/*<div className="tickets">*/}
                    {/*    {displayData.map((data, index) => (*/}
                    {/*        <Ticket key={index} data={data} onTicketClick={setActiveTicket} />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    {activeTicket && <BorrowModal ticketData={activeTicket} closeTicket={closeActiveTicket} />}
                </Box>
            )}
        </div>
    );
};
