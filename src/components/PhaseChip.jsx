import { RentalPhase } from "../utils/constants.js";
import { Chip } from "@mui/material";

const PhaseChip = ({ phase }) => {
  let color  = 'onSurface.main';

  if (phase === RentalPhase.AVAILABLE) color = 'success';
  else if (phase === RentalPhase.REMOVED) color = 'onSurfaceTextDark';
  else if (phase === RentalPhase.LIQUIDATED) color = 'error';
  else if (phase === RentalPhase.RENTED) color = 'secondary';
  else if (phase === RentalPhase.GRACE_PERIOD) color = 'warning';

  return (
      <Chip color={color} label={phase}/>
  )
};

export default PhaseChip;