import { useEffect } from 'react';
import { useSnackbar } from './SnackbarProvider/SnackbarProvider.jsx';
import { createRentalKeplr } from '../apis/createRentalKeplr';

const RentalCreator = ({ data, onSubmit }) => {
    const showSnackbar = useSnackbar();

    useEffect(() => {
        if (data) {
            const showToast = (status, data) => {
                if (status === 'error') {
                    showSnackbar(`Offer error: ${data}`, 'error');
                } else if (status === 'seated') {
                    showSnackbar('Transaction submitted', 'info');
                    console.log('Transaction submitted:', data.txn);
                    console.log('Offer id:', data.offerId);
                } else if (status === 'refunded') {
                    showSnackbar('Offer refunded', 'warning');
                } else if (status === 'accepted') {
                    showSnackbar('Offer accepted', 'success');
                }
                onSubmit();
            };

            createRentalKeplr(data, showToast);
        }
    }, [data, onSubmit, showSnackbar]);
    return null;
};

export default RentalCreator;
