import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    WithdrawCollateral as WithdrawCollateralButton,
    WithdrawRentalFee as WithdrawRentalFeeButton
} from "./Withdraw/index.js";
import { RentalPhase } from "../utils/constants.js";
import WithdrawUtility from "./Withdraw/WithdrawUtility.jsx";
import PhaseChip from "./PhaseChip.jsx";

const RentalManager = ({ rental, controllers }) => {
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
                            Rental Fee Balance
                        </Typography>
                        <Typography align="center" variant='subtitle2' ml={1}
                                    sx={{ color: 'onSurfaceTextDark.main', ml: 2 }}>
                            100
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2 }}>
                            Rental Fee Balance
                        </Typography>
                        <Typography align="center" variant='subtitle2' ml={1}
                                    sx={{ color: 'onSurfaceTextDark.main', ml: 2 }}>
                            100
                        </Typography>
                    </Stack>
                </Stack>

            </Stack>

            <Stack direction="row">
                {withdrawCollateralVisible && <WithdrawCollateralButton rental={rental} controllers={controllers}/>}
                {withdrawUtilityVisible && <WithdrawUtility rental={rental} controllers={controllers}/>}
                <WithdrawRentalFeeButton rental={rental} controllers={controllers}/>
            </Stack>


        </>
    )
};

export default RentalManager;