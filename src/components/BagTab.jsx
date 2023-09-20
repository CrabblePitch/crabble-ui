import { styled } from '@mui/material/styles';
import { Tab } from "@mui/material";

export const BagStyledTab = styled((props) => <Tab disableRipple disableFocusRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        color: theme.palette.surface.contrastText,
        '&.Mui-selected': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: theme.spacing(1),
        },
    }),
);

