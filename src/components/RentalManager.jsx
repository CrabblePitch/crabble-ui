import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    WithdrawCollateral as WithdrawCollateralButton,
    WithdrawRentalFee as WithdrawRentalFeeButton
} from "./Withdraw/index.js";
import { RentalPhase } from "../utils/constants.js";
import WithdrawUtility from "./Withdraw/WithdrawUtility.jsx";
import PhaseChip from "./PhaseChip.jsx";
import { displayAmount } from "../utils/helpers.js";

const RentalManager = ({ rental, onClose }) => {
    const { phase } = rental;
    const withdrawCollateralVisible = phase === RentalPhase.LIQUIDATED;
    const withdrawUtilityVisible = phase === RentalPhase.AVAILABLE;

    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={{width: 1}}>
                <PhaseChip phase={phase} />
                <Stack direction="row">
                    <Stack>
                        <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2 }}>
                            Rental Balance
                        </Typography>
                        {[...Object.entries(rental.rentalBalance)]
                            .filter(([keyword]) => keyword !== 'Utility')
                            .map(([keyword, amount]) => (
                            <Typography align="center" variant='subtitle2' ml={1}
                                        sx={{ color: 'onSurfaceTextDark.main', ml: 2 }}>
                                {displayAmount(amount)} {keyword}
                            </Typography>
                        ))}
                    </Stack>
                    <Stack>
                        <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2 }}>
                            Collateral Balance
                        </Typography>
                        {[...Object.entries(rental.collateralBalance)].map(([keyword, amount]) => (
                            <Typography align="center" variant='subtitle2' ml={1}
                                        sx={{ color: 'onSurfaceTextDark.main', ml: 2 }}>
                                {displayAmount(amount)} {keyword}
                            </Typography>
                        ))}

                    </Stack>
                </Stack>

            </Stack>

            <Stack direction="row">
                {withdrawCollateralVisible && <WithdrawCollateralButton rental={rental} onClose={onClose}/>}
                {withdrawUtilityVisible && <WithdrawUtility rental={rental} onClose={onClose}/>}
                <WithdrawRentalFeeButton rental={rental} onClose={onClose}/>
            </Stack>
        </>
    )
};

export default RentalManager;