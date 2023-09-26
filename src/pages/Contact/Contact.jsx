import './Contact.scss';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { Email, Twitter, Forum } from '@mui/icons-material';
import crabbleLogo from '../../assets/crabble.svg';

export const Contact = () => {
    const handleEmailClick = () => {
        window.location.href = 'mailto:admin@crabble.io';
    };

    const handleDiscordClick = () => {
        window.open(
            'https://www.google.com/url?q=https://discord.gg/9wB6XeU2nM&sa=D&source=editors&ust=1695643843562963&usg=AOvVaw1a8QJsujC5PaMcsw5tcGZz',
            '_blank',
        );
    };

    const handleTwitterClick = () => {
        window.open(
            'https://www.google.com/url?q=https://twitter.com/Crabble_&sa=D&source=editors&ust=1695643843561531&usg=AOvVaw3T4XYg21JDzO3PZvdwvRsn',
            '_blank',
        );
    };

    return (
        <Box
            className="contact"
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
                Contact Us
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
                <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ marginBottom: 3, ml: ['25%', '17%', '10%', '10%'] }}>
                        <img src={crabbleLogo} alt="Crabble Logo" className="crabble-logo" />
                        <Typography
                            variant="h4"
                            sx={{
                                color: (theme) => theme.palette.onSurfaceText.main,
                                marginLeft: ['-5%', '-3%', '-2%', '-3%'],
                            }}
                        >
                            Crabble
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: (theme) => theme.palette.onSurfaceText.main,
                                marginTop: 2,
                                marginLeft: ['-22%', '-20%', '-18%', '-18%'],
                            }}
                        >
                            You can reach out or join us via
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <IconButton onClick={handleEmailClick} color="primary" aria-label="send email">
                            <Email />
                            <Typography
                                variant="body2"
                                sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 1 }}
                            >
                                admin@crabble.io
                            </Typography>
                        </IconButton>

                        <IconButton onClick={handleTwitterClick} color="primary" aria-label="twitter">
                            <Twitter />
                            <Typography
                                variant="body2"
                                sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 1 }}
                            >
                                @_Crabble_
                            </Typography>
                        </IconButton>

                        <IconButton onClick={handleDiscordClick} color="primary" aria-label="join on discord">
                            <Forum />
                            <Typography
                                variant="body2"
                                sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 1 }}
                            >
                                Join us
                            </Typography>
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
