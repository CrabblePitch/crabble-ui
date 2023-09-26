import { FormControl, FormHelperText, InputLabel, Select, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { stringifyValue, parseAsValue } from '@agoric/ui-components';
import { AssetKind } from "@agoric/ertp";

const textColorLight = 'onSurfaceText.main';
const textColorDark = 'onSurfaceTextDark.main';

const Selector = ({
                      label,
                      children,
                      current,
                      callback,
                      margins,
                      widths,
                      fullWidth,
                      error = { value: false, text: '' }
                  }) => {
    const helperText = error.value ? error.text : '';
    return (
        <FormControl variant="standard" color="onSurfaceTextDark" fullWidth={fullWidth} error={error.value}
                     sx={{
                         mt: 1,
                         ...margins,
                         ...widths,
                         '.Mui-error': { color: 'error.light' },
                         'label.Mui-error': { color: 'onSurfaceText.main' },
                     }}>
            <InputLabel id="demo-simple-select-filled-label"
                        sx={{
                            color: 'onSurfaceText.main',
                        }}
            >
                {label}
            </InputLabel>
            <Select
                autoWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                sx={{
                    '&:before': { borderColor: 'onSurfaceTextDark.main' },
                    '&:not(.Mui-disabled):hover::before': {
                        borderColor: 'onSurfaceTextDark.main',
                    },
                    '& .MuiSelect-select': { color: 'onSurfaceTextDark.main' },
                    '& .MuiSelect-icon': { color: 'onSurfaceTextDark.main' },
                    '& .MuiSelect-select.Mui-error': { color: 'onSurfaceTextDark.main' },

                }}
                value={current}
                onChange={ev => callback(ev.target.value)}
            >
                {children}
            </Select>
            {error.value && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
};

const TextInput = ({
                       name,
                       current,
                       onChange,
                       margins,
                       width,
                       multiline = false,
                       error = { value: false, text: '' },
                       amountInput = false,
                   }) => {
    const handleChange = ev => {
        const str = ev.target.value;

        if (amountInput) {
            const str = ev.target?.value
                ?.replace('-', '')
                .replace('e', '')
                .replace('E', '');
            const parsed = parseAsValue(str, AssetKind.NAT, 6);
            onChange(parsed);
            return;
        }

        onChange(str);
    }

    return (
        <Stack>
            <TextField
                id="standard-basic"
                label={" "}
                variant="standard"
                value={current}
                onChange={handleChange}
                size="small"
                fullWidth
                multiline={multiline}
                autoComplete="off"
                helperText={name}
                sx={{
                    width,
                    ...margins,
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
                    'p.Mui-error': { color: 'error.light' },
                }}/>
            {error.value && <Typography color={"error"} variant={"subtitle2"}>{error.text}</Typography>}
        </Stack>
    )
};

export {
    Selector,
    TextInput,
};