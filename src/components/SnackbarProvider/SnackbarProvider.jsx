import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const SnackbarContext = React.createContext();

export const SnackbarProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const openSnackbar = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
    };

    const closeSnackbar = () => {
        setMessage('');
    };

    return (
        <div></div>
        // <SnackbarContext.Provider value={openSnackbar}>
        //     {children}
        //     <Snackbar
        //         open={!!message}
        //         autoHideDuration={3000}
        //         onClose={closeSnackbar}
        //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        //     >
        //         <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
        //             {message}
        //         </Alert>
        //     </Snackbar>
        // </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = React.useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
