import { Box, FormControl, InputLabel, Select, TextField } from "@mui/material";

const textColorLight = 'onSurfaceText.main';
const textColorDark = 'onSurfaceTextDark.main';

const Selector = ({ label, children, current, callback, fullWidth }) => {
  return (
      <FormControl variant="standard" color="onSurfaceTextDark" fullWidth={fullWidth}  sx={{ minWidth: 120, mt: 1 }}>
          <InputLabel id="demo-simple-select-filled-label"  sx={{ color: 'onSurfaceTextDark.main' }}>{label}</InputLabel>
          <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              sx={{
                  '&:before': { borderColor: 'onSurfaceTextDark.main'},
                  '&:not(.Mui-disabled):hover::before': {
                      borderColor: 'onSurfaceTextDark.main',
                  },
                  '& .MuiSelect-select': { color: 'onSurfaceTextDark.main'},
                  '& .MuiSelect-icon': { color: 'onSurfaceTextDark.main'},
              }}
              value={current}
              onChange={ev => callback(ev.target.value)}
          >
              {children}
          </Select>
      </FormControl>
  )
};

const TextInput = ({ name, current, onChange, size = 'medium', width}) => {
    return (
        <Box>
            <TextField
                id="standard-basic"
                label={" "}
                variant="standard"
                value={current}
                onChange={ev => onChange(ev.target.value)}
                size="small"
                fullWidth
                autoComplete="off"
                helperText={name}
                sx={{
                    width,
                    // maxWidth: 150,
                    ' label.Mui-focused': { color: textColorDark },
                    ' label': { color: textColorDark },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: textColorDark
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: textColorDark
                    },
                    '& .MuiInput-underline.Mui-focused': {
                        color: textColorDark,
                        borderBottomColor: textColorDark
                    },
                    '& .MuiInputBase-root:hover': { color: textColorDark, borderBottomColor: textColorDark },
                    '& .MuiInputBase-root.Mui-focused': { color: textColorDark, borderBottomColor: textColorDark},
                    '& .MuiInputBase-root:before': { color: textColorDark, borderBottomColor: textColorDark},
                    '& .MuiInputBase-input': { color: textColorDark},
                    'p.MuiFormHelperText-root': { color: textColorLight },
                }}/>
        </Box>

    )
};

export {
    Selector,
    TextInput,
};