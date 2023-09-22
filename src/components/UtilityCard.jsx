import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardContent, CardMedia, Stack } from "@mui/material";
import PhaseChip from "./PhaseChip.jsx";
import { getValueFromSet } from "../utils/helpers.js";

const UtilityCard = ({ data, onCardClick, detailed = true }) => {
    const ticketData = data.configuration ? data.configuration : data;
    const utilityValue = getValueFromSet(ticketData.utilityAmount);

    return (
        <Card sx={{
            bgcolor: 'surface.main',
            border: 1,
            color: 'onSurface.main', boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)'
        }}>
            <CardActionArea onClick={() => onCardClick(data)}>
                <CardMedia
                    component="img"
                    // height="140"
                    image={utilityValue.imagePath}
                    alt="utility"
                    sx={{
                        pl: 4, pr: 4, pt: 2,
                        borderColor: 'onSurface.main',
                    }}
                />
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography gutterBottom variant="h5">
                            {ticketData.utilityTitle}
                        </Typography>
                        <PhaseChip phase={data.phase}/>
                    </Stack>
                    {detailed ? (
                            <>
                                <Typography variant="subtitle1">
                                    {Number(ticketData.minRentingDurationUnits)} to{' '}
                                    {Number(ticketData.maxRentingDurationUnits)} {ticketData.rentingDurationUnit}(s), $
                                    {Number(ticketData.rentalFeePerUnitAmount?.value)} per{' '}
                                    {ticketData.rentingDurationUnit}
                                </Typography>
                                <Typography variant="subtitle1">
                                    ${Number(ticketData.collateralAmount.value)} Collateral
                                </Typography>
                            </>

                        ) :
                        (
                            <>
                                <Typography variant="subtitle1">
                                    {ticketData.utilityDescription}
                                </Typography>
                            </>
                        )
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default UtilityCard;