import './Ticket.scss';

import { capitalize } from '../../utils/text-utils.js';
import { ReturnUtilityButton } from '../ReturnUtility/ReturnUtilityButton.jsx';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import React, { useState } from 'react';

// TODO: Clarify: if the data shape for catalog items (see explore page) and rental/utility (see the provided mock data) is the same or not

export const Ticket = ({ data, onTicketClick, showDescription = true, rental, controllers, showButton = false }) => {
    const { configuration } = data;
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
export const Ticket = ({ data, onTicketClick, showDescription = true }) => {
    const ticketData = data.configuration ? data.configuration : data;

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleClick = (event) => {
        if (event.target.closest('.borrow-ticket-button')) {
            return;
        }

        if (onTicketClick) {
            onTicketClick(data);
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#9c27b0',
            },
        },
    });

    const buttonStateClass = data.phase === 'liquidated' ? 'hide' : data.phase === 'rented' ? 'disable' : '';
    console.log('buttonStateClass: ', buttonStateClass);

    return (
        <div className="ticket">
            <div className="ticket-image">
                <img src={ticketData.utilityAmount.value[0].imagePath}/>
            </div>
            <div className="ticket-info">
                <p className="title" onClick={handleClick}>
                    {ticketData.utilityTitle}
                </p>
                {showDescription && (
                    <>
                        <p className="description">
                            {Number(ticketData.minRentingDurationUnits)} to{' '}
                            {Number(ticketData.maxRentingDurationUnits)} {ticketData.rentingDurationUnit}(s), $
                            {Number(ticketData.rentalFeePerUnitAmount?.value)} per{' '}
                            {ticketData.rentingDurationUnit}
                        </p>
                        <p className="description">${Number(ticketData.collateralAmount.value)} Collateral</p>
                    </>
                )}
                {data.phase && <p className="description">{capitalize(data.phase)}</p>}
                {showButton && data.phase !== 'liquidated' && (
                    <>
                        <ReturnUtilityButton
                            className={`borrow-ticket-button ${buttonStateClass}`}
                            rental={data}
                            controllers={controllers}
                            disabled={data.phase === 'rented'}
                            onClick={handleClickOpen}
                            onButtonClick={handleClickOpen}
                        />
                        <Dialog open={openDialog} onClose={handleClose}>
                            <DialogTitle>You're returning your NFT. Please confirm.</DialogTitle>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <ThemeProvider theme={theme}>
                                    <Button
                                        onClick={() => {
                                            handleClose();
                                            // TODO: Add any additional logic to handle the "Return my NFT" button
                                        }}
                                        color="primary"
                                    >
                                        Return my NFT
                                    </Button>
                                </ThemeProvider>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
};
