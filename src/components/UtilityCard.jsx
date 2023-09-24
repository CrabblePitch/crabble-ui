import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardContent, CardMedia, Stack } from "@mui/material";
import PhaseChip from "./PhaseChip.jsx";
import { displayAmount, getValueFromSet } from "../utils/helpers.js";
import useStore from "../store/store.js";
import { stringifyValue } from "@agoric/ui-components";
import { AssetKind } from "@agoric/ertp";
import { useEffect } from "react";

const cardDefaults = {
    bgcolor: 'surface.main',
    border: 1,
    color: 'onSurface.main', boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)'
}

const UtilityCard = ({
                         data,
                         onCardClick,
                         detailed = true,
                         cardStyles = {}
                     }) => {
    const getKeywordFromBrand = useStore(state => state.getKeywordFromBrand);

    const ticketData = data.configuration ? data.configuration : data;
    const utilityValue = getValueFromSet(ticketData.utilityAmount);

    console.log('Utility Card', { data });

    return (
        <Card sx={{
            ...cardDefaults,
            ...cardStyles
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
                                    {Number(ticketData.maxRentingDurationUnits)} {ticketData.rentingDurationUnit}(s),
                                    {displayAmount(ticketData.rentalFeePerUnitAmount)} {getKeywordFromBrand(ticketData.rentalFeePerUnitAmount.brand)} per {ticketData.rentingDurationUnit}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {displayAmount(ticketData.collateralAmount)} {getKeywordFromBrand(ticketData.collateralAmount.brand)} of Collateral
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