import './Bag.scss';

import { useState } from 'react';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Tabs, Tab, Divider, Paper, Box } from '@mui/material';
import { Ticket } from '../Ticket/Ticket.jsx';
import { RentalModal } from '../RentalModal/RentalModal.jsx';

// TODO: to be removed
import { mockUtilityData } from '../../pages/Explore/_mockUtility.js';
import{ BagStyledTab } from "../BagTab.jsx";
import BagInfo from "../BagInfo.jsx";
import Grid from "@mui/material/Grid";
import useStore from "../../store/store.js";

export const Bag = () => {
    const getOwnedRentals = useStore((state) => state.getOwnedRentals);
    const getBorrowedRentals = useStore((state) => state.getBorrowedRentals);

    const ownedRentals = getOwnedRentals();
    const borrowedRentals = getBorrowedRentals();
    const [tabValue, setTabValue] = useState(1);
    const [activeRental, setActiveRental] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const closeActiveRental = () => {
        setActiveRental(null);
    };

    return (
        <Box sx={{ height: '100vh', overflow: 'auto', p: 2}}>
            <div>
                <BagInfo></BagInfo>
                <main>
                    <Tabs
                        sx={{
                            bgcolor: 'surface.main',
                            width: '100%',
                            borderRadius: 2,
                            mt: 2
                        }}
                        centered
                        value={tabValue} indicatorColor={'primary.contrastText'} onChange={handleTabChange}>
                        <BagStyledTab color="secondary" label="Owned"/>
                        <BagStyledTab label="Borrowed" />
                    </Tabs>
                    <Box sx={{ mt: 2}}>
                        {tabValue === 0 && (
                            <Grid container spacing={2}>
                                {ownedRentals.map((data, index) => (
                                    <Grid item xs={4}>
                                        <Paper sx={{ p: 4, bgcolor: 'container.main' }}>
                                            <Ticket
                                                key={index}
                                                data={data}
                                                onTicketClick={setActiveRental}
                                                showDescription={false}
                                            />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        {tabValue === 1 && (
                            <Grid container spacing={2}>
                                {borrowedRentals.map((data, index) => (
                                    <Grid item xs={4}>
                                        <Paper sx={{ p: 4, bgcolor: 'container.main' }} elevation={3}>
                                            <Ticket
                                                key={index}
                                                data={data}
                                                onTicketClick={setActiveRental}
                                                showDescription={false}
                                            />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </main>
            </div>
            {activeRental && <RentalModal utility={activeRental} closeModal={closeActiveRental} />}
        </Box>
    );
};
