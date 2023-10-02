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
                <img src="/slides-contact-us.svg"/>
            </Box>
        
        </Paper>
    </Box>
    );
};