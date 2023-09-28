import { Button, Card, CardContent, CardMedia, Grid, Typography, Stack } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { buildMintOfferSpec } from "../helpers.js";
import useStore from "../store.js";

export const UtilityCard = ({ data, keyword }) => {
    const wallet = useStore(state => state.wallet);
    const notifyUser = useStore(state => state.notifyUser);

    const onStatusChange = args => {
        console.log({ args });
        const { status, data } = args;

        if (status === 'error') {
            notifyUser('error', 'Offer with error');
            console.log('ERROR', data);
        }
        if (status === 'seated') {
            notifyUser('secondary', 'Transaction submitted');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
        }
        if (status === 'refunded') {
            notifyUser('warning', 'Transaction refunded');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
        }
        if (status === 'accepted') {
            notifyUser('success', 'Offer accepted');
            console.log('Transaction:', data.txn);
            console.log('Offer id:', data.offerId);
        }
    };

    const handleClick = () => {
        const offerSpec = buildMintOfferSpec(data, keyword);
        console.log({ offerSpec });

        void wallet.makeOffer(
            offerSpec.invitationSpec,
            offerSpec.proposal,
            offerSpec.offerArgs,
            onStatusChange,
            offerSpec.id,
        );
    };

    return (
        <Card
            sx={{
                width: '100%',
                bgcolor: 'surface.main',
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
                mb: 2,
                p: 2,
                border: 1,
                borderColor: 'onSurfaceText.main'
        }}
        >
            <Grid container >
                <Grid item xs={4} sx={{ height: 200}}>
                    <CardMedia
                        component="img"
                        image={data.imagePath}
                        alt="data info"
                        sx={{ height: '100%', borderRadius: 1 }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <CardContent >
                        {[...Object.keys(data)].map((key, index) => {
                            if (key !== 'imagePath') {
                                return (
                                    <Stack key={`${key}-${index}`} direction={"row"} alignItems={"center"} sx={{ color: 'onSurfaceText.main' }}>
                                        <ArrowRightIcon/>
                                        <Typography key={key} variant="subtitle1" sx={{ ml: 1, fontWeight: 'bold' }}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        </Typography>
                                        <Typography key={index} variant="subtitle1" sx={{ ml: 1 }}>
                                            {data[key]}
                                        </Typography>
                                    </Stack>
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
                sx={{ mt: 2 }}
                onClick={handleClick}
            >
                Mint
            </Button>
        </Card>
    );
};
