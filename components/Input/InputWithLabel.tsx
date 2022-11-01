/* eslint-disable no-nested-ternary */
import { Box, Typography, TextField, IconButton, ButtonBase } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface InputWithLabelProps {
    label?: string;
    form?: any;
    name: string;
    type?: 'text' | 'number' | 'password' | 'email' | 'tel';
    rules?: any;
    component?: any;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({ component, label = 'Email address', form, name, rules, type }) => {
    const {
        formState: { errors }
    } = form;
    const [showPwd, setShowPwd] = React.useState<boolean>(false);
    const error = errors[name] ? errors[name] : null;

    const errType: string = error?.type;

    let helperText: string = '';
    if (errType === 'maxLength') {
        helperText = `${label} exceed maximum length!`;
    } else if (errType === 'required') {
        helperText = `${label} is required!`;
    } else if (errType === 'minLength') {
        helperText = type === 'password' ? `Password minimum 6 characters` : `${label} exceed minimum length`;
    } else if (error?.message) {
        helperText = `${label} - ${error.message}`;
    } else {
        helperText = error;
    }

    return (
        <Controller
            control={form.control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>{label}</Typography>
                        <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                    </Box>
                    <Box sx={{ width: '70%' }}>
                        <TextField
                            error={!!errType}
                            helperText={helperText}
                            id='outlined-basic'
                            label={label}
                            variant='outlined'
                            fullWidth
                            type={type === 'password' ? (showPwd ? 'text' : 'password') : type === 'tel' ? 'number' : type}
                            {...field}
                            InputProps={{
                                id: `input-${name}`,
                                // disableUnderline: true,
                                startAdornment: type === 'tel' && (
                                    <Typography
                                        variant='subtitle1'
                                        component='span'
                                        fontWeight='bold'
                                        sx={{ paddingRight: 2, borderRight: '1px solid rgba(148, 148, 148, 0.2)' }}
                                    >
                                        +62
                                    </Typography>
                                ),
                                endAdornment:
                                    type === 'password' ? (
                                        <IconButton onClick={() => setShowPwd(!showPwd)}>
                                            {!showPwd ? (
                                                <VisibilityIcon sx={{ color: '#A54CE5' }} />
                                            ) : (
                                                <VisibilityOffIcon sx={{ color: '#A54CE5' }} />
                                            )}
                                        </IconButton>
                                    ) : (
                                        <ButtonBase>{component}</ButtonBase>
                                    )
                            }}
                            {...field}
                        />
                    </Box>
                </Box>
            )}
        />
    );
};
export default InputWithLabel;
