import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const ModalTitleBar = ({ text }) => {
  return (
      <Box sx={{width: 1, bgcolor: 'surfaceDark.main', p: 2, boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)'}}>
          <Typography color='onSurfaceText.main' variant='h5' align="start">{text}</Typography>
      </Box>
  )
};

export default ModalTitleBar;
