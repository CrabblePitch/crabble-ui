import { Paper } from "@mui/material";

const TicketContainer = ({ children }) => {
    return (
        <Paper
            variant='outlined'
            sx={{
                p: 4,
                bgcolor: 'surface.main',
                color: 'onSurface.main',
                borderColor: 'onSurface.main',
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)'
            }}
        >
            {children}
        </Paper>
    )
};

export default TicketContainer;