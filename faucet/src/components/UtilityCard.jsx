import { Button, Card, CardContent, CardMedia, Grid, Typography, Paper } from '@mui/material';

export const UtilityCard = ({ data }) => {
    return (
        <Card
            sx={{ width: '100%', bgcolor: 'surface.main', boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)', mb: 2, p: 2 }}
        >
            <Grid container>
                <Grid item md={5}>
                    <Paper elevation={3} sx={{ m: 2 }}>
                        {' '}
                        <CardMedia
                            component="img"
                            image={data.imagePath}
                            alt="data info"
                            sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                        />
                    </Paper>
                </Grid>
                <Grid item md={7}>
                    <CardContent>
                        {Object.keys(data).map((key, index) => {
                            if (key !== 'imagePath') {
                                return (
                                    <Typography key={index} variant="body2" sx={{ color: 'onSurfaceText.main' }}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {data[key]}
                                    </Typography>
                                );
                            }
                            return null;
                        })}
                    </CardContent>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{
                    mt: 1,
                    py: 1,
                    fontSize: '1rem',
                    boxShadow: '0 3px 5px 2px rgba(0,0,0,0.3)',
                    borderRadius: '0',
                    '&:hover': {
                        boxShadow: '0 4px 8px 3px rgba(0,0,0,0.4)',
                    },
                }}
            >
                Mint
            </Button>
        </Card>
    );
};
