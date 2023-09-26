import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { AccountCircle } from "@mui/icons-material";
import useStore from "../store/store.js";
import { AmountMath, AssetKind } from "@agoric/ertp";
import { displayAmount, isSet } from "../utils/helpers.js";

const mergeRentalBalances = (rentalBalances, policy = AssetKind.NAT) => {
    const mergedBalances = new Map();

    const isValid = policy === AssetKind.NAT ? (amount) => isSet(amount)
        : (amount) => !isSet(amount) ;

    [...rentalBalances].forEach(([keyword, amount]) => {
        if (isValid(amount)) return;

        if (mergedBalances.has(keyword)) {
            const current = mergedBalances.get(keyword);
            mergedBalances.set(keyword, AmountMath.add(current, amount));
            return;
        }
        mergedBalances.set(keyword, amount);
    });

    return [...mergedBalances.entries()];
};

const BagInfo = () => {
    const wallet = useStore(state => state.wallet);
    const getOwnedRentals = useStore(state => state.getOwnedRentals);
    const getBorrowedRentals = useStore(state => state.getBorrowedRentals);
    const getRentalBalances = useStore(state => state.getRentalBalances);
    const getCollateralBalances = useStore(state => state.getCollateralBalances);

    if(!wallet || !getBorrowedRentals || !getBorrowedRentals) return;

    const ownedRentals = getOwnedRentals() || [];
    const borrowedRentals = getBorrowedRentals() || [];

    const rentalBalances = getRentalBalances();
    const collateralBalances = getCollateralBalances();
    const mergedRentalBalances = mergeRentalBalances(rentalBalances);
    const mergedCollateralBalances = mergeRentalBalances(collateralBalances);

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', pl: 2, pt: 1 }}>
                        <AccountCircle color='altText'/>
                        <Typography variant='h6' ml={1} sx={{ color: 'altText.main' }}>
                            {wallet.address}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={2} mt={2}>
                    <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2 }}>
                        Renting
                    </Typography>
                    <Divider sx={{ color: 'line' }}/>
                    <Typography variant='subtitle2' ml={1} sx={{ color: (theme) => theme.palette.line.main, ml: 2 }}>
                        {ownedRentals.length}
                    </Typography>
                </Grid>
                <Grid item xs={2} mt={2}>
                    <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2 }}>
                        Borrowing
                    </Typography>
                    <Divider sx={{ color: 'line' }}/>
                    <Typography variant='subtitle2' ml={1} sx={{ color: (theme) => theme.palette.line.main, ml: 2 }}>
                        {borrowedRentals.length}
                    </Typography>
                </Grid>
                <Grid item xs={4} mt={2}>
                    <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2 }}>
                        Rental Fee Balance
                    </Typography>
                    <Divider sx={{ color: 'line' }}/>
                    <Box sx={{ maxHeight: 100, overflow: 'auto' }}>
                        {[...mergedRentalBalances].map(([keyword, amount]) => (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }}>
                                <Typography variant='subtitle1'
                                            sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 2 }}>
                                    {displayAmount(amount)}
                                </Typography>
                                <Typography variant='subtitle2'
                                            sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 2 }}>
                                    {keyword}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={4} mt={2}>
                    <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2 }}>
                        Collateral Balance
                    </Typography>
                    <Divider sx={{ color: 'line' }}/>
                    <Box sx={{ maxHeight: 100, overflow: 'auto' }}>
                        {[...mergedCollateralBalances].map(([keyword, amount]) => (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                            }}>
                                <Typography align={"justify"} variant='subtitle1'
                                            sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 2 }}>
                                    {displayAmount(amount)}
                                </Typography>
                                <Typography variant='subtitle2'
                                            sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 2 }}>
                                    {keyword}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default BagInfo;