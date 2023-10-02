import './About.scss';
import { Box, Typography, Paper } from '@mui/material';
export const About = () => {
    return (
        <Box
            className="how-it-works"
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                pb: 2,
            }}
        >
            <Paper
                sx={{
                    width: '70%',
                    overflow: 'auto',
                    pb: 2,
                    bgcolor: 'surface.main',
                }}
                elevation={3}
            >
                <Box sx={{ padding: '2rem' }}>
                    <img src="/slides-case-study.svg"/>
                </Box>
            
            </Paper>
        </Box>
    );
};