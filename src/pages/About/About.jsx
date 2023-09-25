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
            <Typography variant="h3" align="center" m={2} color={'surface.contrastText'}>
                How It Works
            </Typography>

            <Paper
                sx={{
                    width: '70%',
                    height: '60vh',
                    overflow: 'auto',
                    pb: 2,
                    bgcolor: 'surface.main',
                    borderRadius: (theme) => theme.spacing(2),
                    boxShadow: '0px 0px 80px 0px rgba(0,0,0,0.75)',
                }}
                elevation={3}
            >
                <Box sx={{ padding: '2rem' }}>
                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.onSurfaceText.main, ml: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.onSurfaceText.main, ml: 2 }}>
                        Another paragraph of explanation...
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};
