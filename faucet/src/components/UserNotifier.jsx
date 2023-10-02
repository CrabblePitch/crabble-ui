import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useStore from "../store.js";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars= () => {
    const notifierState = useStore(state => state.notifierState);
    const closeNotifier = useStore(state => state.closeNotifier);

    const { open, message ,severity} = notifierState;

    if(!open) return;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        closeNotifier();
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomizedSnackbars;