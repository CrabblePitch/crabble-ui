import { Input as RootInput } from '@mui/material';

export const Input = (props) => {
    const { label, ...rest } = props;
    return (
        <div className="input">
            <div className="input-label">{label}</div>
            <RootInput {...rest} />
        </div>
    );
};
