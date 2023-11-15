import { useState } from 'react';
import { Tabs, Box } from '@mui/material';
import RentalModal from '../RentalModal/RentalModal.jsx';

import{ BagStyledTab } from "../BagTab.jsx";
import BagInfo from "../BagInfo.jsx";
import Grid from "@mui/material/Grid";
import useStore from "../../store/store.js";
import UtilityCard from "../UtilityCard.jsx";
import ReturnUtilityCard from "../ReturnUtilityCard.jsx";
import NothingToShow from "../NothingToShow.jsx";
import { EmptyTexts } from "../../utils/constants.js";

export const Bag = () => {
    useStore(state => state.crabbleOffers);
    const getOwnedRentals = useStore((state) => state.getOwnedRentals);
    const getActiveBorrows = useStore((state) => state.getActiveBorrows);

    const ownedRentals = getOwnedRentals();
    const borrowedRentals = getActiveBorrows();
    //
    // const ownedRentals = mockUtilityData;
    // const borrowedRentals = mockUtilityData;

    const [tabValue, setTabValue] = useState(1);
    const [activeRental, setActiveRental] = useState(false);
    const [rentalDialogOpen, setRentalDialogOpen] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const closeActiveRental = () => {
        setRentalDialogOpen(false);
        setActiveRental(null);
    };

    const handleTicketClick = activeTicket => {
      setRentalDialogOpen(true);
      setActiveRental(activeTicket);
    };

    const displayOwnedRentals = () => {
        if (ownedRentals.length === 0) {
            return (<NothingToShow message={EmptyTexts.OWNED_RENTALS}/>)
        }

        return (
            <Grid container spacing={2} >
                {ownedRentals.map((data, index) => (
                    <Grid key={`owned-${index}`} item xs={4}>
                        <UtilityCard data={data} onCardClick={handleTicketClick} detailed={false}/>
                    </Grid>
                ))}
            </Grid>
        );
    };

    const displayBorrowedRentals = () => {
        if (borrowedRentals.length === 0) {
            return (<NothingToShow message={EmptyTexts.BORROWED_RENTALS}/>)
        }

        return (
            <Grid container spacing={2}>
                {borrowedRentals.map((data, index) => (
                    <Grid key={`borrowed-${index}`} item xs={4}>
                        <ReturnUtilityCard rental={data}/>
                    </Grid>
                ))}
            </Grid>
        )
    };

    return (
        <Box sx={{ p: 2}}>
            <div>
                <BagInfo></BagInfo>
                <main>
                    <Tabs
                        sx={{
                            bgcolor: 'surfaceDark.main',
                            width: '100%',
                            borderRadius: 2,
                            mt: 2
                        }}
                        centered
                        value={tabValue} indicatorColor={'surface.main'} onChange={handleTabChange}>
                        <BagStyledTab label="Owned"/>
                        <BagStyledTab label="Borrowed" />
                    </Tabs>
                    <Box sx={{ mt: 2}}>
                        {tabValue === 0 && displayOwnedRentals()}
                        {tabValue === 1 && displayBorrowedRentals()}
                    </Box>
                </main>
            </div>
            <RentalModal rental={activeRental} closeModal={closeActiveRental} open={rentalDialogOpen}/>
        </Box>
    );
};
