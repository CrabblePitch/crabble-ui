import UtilityCard from './UtilityCard.jsx';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ReturnUtilityButton } from './ReturnUtility/ReturnUtilityButton.jsx';
import { RentalPhase } from '../utils/constants.js';
import { makeDisplayTimeHelper } from '../utils/time.js';

export const ReturnUtilityCard = ({ rental }) => {
    if (!rental) return;

    const timerHelper = makeDisplayTimeHelper(rental.configuration);

    const getExpireText = () => {
        if (rental.phase === RentalPhase.RENTED) {
            return `Your lease will expire in ${timerHelper.howLongLeft(rental.gracePeriod.gracePeriodStart.absValue)}`;
        } else if (rental.phase === RentalPhase.GRACE_PERIOD) {
            return `You have ${timerHelper.howLongLeft(rental.gracePeriod.gracePeriodEnd.absValue)} until liquidation`;
        }
        return 'Oops';
    };

    return (
        <Paper
            sx={{
                bgcolor: 'surface.main',
                boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
                p: 2,
            }}
        >
            <UtilityCard data={rental} detailed={false} cardStyles={{ boxShadow: '', pointerEvents: 'none' }} />

            <Typography
                variant={'body1'}
                sx={{
                    mt: 3,
                    display: rental.phase === RentalPhase.LIQUIDATED ? '' : 'none',
                    color: 'onSurfaceText.main',
                }}
            >
                Liquidated assets cannot be returned
            </Typography>
            <Typography
                variant={'body1'}
                sx={{
                    display: rental.phase === RentalPhase.LIQUIDATED ? 'none' : '',
                    color: 'onSurfaceText.main',
                    mt: 3,
                }}
            >
                {getExpireText()}
            </Typography>
            <ReturnUtilityButton
                styles={{ mt: 1, visibility: rental.phase === RentalPhase.LIQUIDATED ? 'hidden' : '' }}
                rental={rental}
            />
        </Paper>
    );
};
