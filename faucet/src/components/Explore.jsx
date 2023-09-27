import './Explore.scss';

import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { UtilityCard } from './UtilityCard.jsx';

export const Explore = ({ displayData }) => {
    useEffect(() => {
        console.log('Data updated:', displayData);
    }, [displayData]);

    return (
        <Box
            className="catalog"
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
                Rent whatever you want
            </Typography>

            <Paper
                sx={{
                    width: '70%',
                    minWidth: 0,
                    minHeight: 0,
                    height: '100vh',
                    overflow: 'auto',
                    p: 2,
                    bgcolor: 'surface.main',
                    borderRadius: (theme) => theme.spacing(2),
                    boxShadow: '0px 0px 80px 0px rgba(0,0,0,0.75)',
                }}
                elevation={3}
                className="Paper"
            >
                <Grid container spacing={4} className="GRID">
                    {displayData.map((data, index) => (
                        <Grid key={index * 10} item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <UtilityCard key={index} data={data} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
};
