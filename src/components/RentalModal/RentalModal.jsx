import './RentalModal.scss';

import { Box, Divider, Modal } from '@mui/material';
import ModalTitleBar from "../ModalTitleBar.jsx";
import UpdateRentalConfiguration from "../UpdateRentalConfiguration.jsx";
import DisplayUtility from "../DisplayUtility.jsx";
import RentalManager from "../RentalManager.jsx";

const RentalModal = ({ rental, closeModal, open }) => {

    const controllers = {
        snackbar: console.log,
        modal: () => console.log('This is not a modal'),
    };

    const style = {
        position: 'relative',
        width: '50%',
        height: '100%',
        borderColor: 'line.main',
        boxShadow: 24,
    };

    return (
        <Modal
            open={open}
            onClose={closeModal}
            className='MODAL'
            sx={{ display: 'flex', justifyContent: 'center', pt: 16, pb: 24}}
        >
            <Box sx={style}>
                <ModalTitleBar text={'Rent Your NFT on Crabble!'}/>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    height: 1,
                    bgcolor: 'surface.main',
                    // p: 1
                }} className="parent">
                    <Box sx={{
                        flex: 4,
                        // m: 1,
                        display: 'flex',
                        alingnItems: 'stretch'
                    }}>
                        <DisplayUtility rental={rental} />
                    </Box>

                    <Box sx={{
                        flex: 6,
                        p: 2
                    }} className="target">

                        <Box sx={{
                            height: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                height: 1,
                                flex: 2,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end'
                            }}>
                                <RentalManager rental={rental} controllers={controllers}/>
                            </Box>
                            <Divider sx={{mt: 1, bgcolor: 'onSurfaceTextDark.main'}}/>
                            <Box sx={{
                                flex: 4,
                                overflow: 'auto',
                            }}>
                                <UpdateRentalConfiguration rental={rental}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default RentalModal;
