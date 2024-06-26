import { Box, Skeleton, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import Image from 'next/image';

interface InputProps {
    form: any;
    name: any;
    label: string;
    rules?: any;
    type?: 'text' | 'number' | 'password' | 'email' | 'tel';
    placeholder: string;
    isColor?: boolean;
    isTextArea?: boolean;
    borderColor?: string;
    isCoin?: any;
    isDisabled?: any;
    startAdornment?: any;
    isLoading?: boolean;
}
const Input: React.FC<InputProps> = ({
    name,
    label,
    rules,
    form,
    type,
    placeholder,
    isTextArea,
    isColor,
    borderColor,
    isDisabled,
    isCoin = false,
    startAdornment,
    isLoading
}) => {
    const {
        formState: { errors }
    } = form;

    const error = errors[name] ? errors[name] : null;

    const errType: string = error?.type;

    let helperText: string = '';
    if (errType === 'maxLength') {
        helperText = `${label} exceed maximum length!`;
    } else if (errType === 'required') {
        helperText = `${label} must be filled`;
    } else if (errType === 'minLength') {
        helperText = type === 'password' ? `Password minimum 6 characters` : `${label} exceed minimum length`;
    } else if (error?.message) {
        helperText = `${label} - ${error.message}`;
    } else {
        helperText = error;
    }

    return (
        <Box
            sx={{
                height: isLoading ? '80px' : 'fit-content',
                '& .MuiFormLabel-root': { color: isColor ? '#9c27b0' : 'rgba(0, 0, 0, 0.6) !important' }
            }}
        >
            {isLoading ? (
                <Skeleton sx={{ height: '100px', mt: '-15px' }} />
            ) : (
                <Controller
                    name={name}
                    control={form.control}
                    rules={rules}
                    render={({ field }) => (
                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: !error || isColor ? 'rgba(0, 0, 0, 0.28) !important' : '',
                                    borderStyle: isDisabled ? 'dashed' : 'solid'
                                },
                                '& .css-19285mc-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                    color: isColor ? 'rgba(0, 0, 0, 0.58) !important' : '#9c27b0',
                                    fontWeight: 700
                                },
                                '& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                    color: !error ? 'rgba(0, 0, 0, 0.38) !important' : 'red'
                                },
                                '& label': { color: borderColor ? 'rgba(0, 0, 0, 0.6) !important' : '#9c27b0' },
                                '& fieldset': { borderColor: `${borderColor} !important`, borderWidth: '1px !important' }
                            }}
                            InputProps={{
                                startAdornment:
                                    startAdornment ||
                                    (isCoin && (
                                        <Image
                                            style={{ marginRight: '10px' }}
                                            src='/images/coin.png'
                                            alt='picture'
                                            width={20}
                                            height={20}
                                        />
                                    ))
                            }}
                            fullWidth
                            multiline={isTextArea}
                            rows={isTextArea ? 3 : 1}
                            helperText={helperText}
                            error={!!errType}
                            id={`input-${name}`}
                            label={label}
                            variant='outlined'
                            color='secondary'
                            type={type}
                            placeholder={placeholder}
                            focused
                            disabled={isDisabled}
                            {...field}
                        />
                    )}
                />
            )}
        </Box>
    );
};

export default Input;
