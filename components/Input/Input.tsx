import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import Image from 'next/image';

interface InputProps {
    form?: any;
    name: any;
    label: string;
    rules?: any;
    type?: 'text' | 'number' | 'password' | 'email' | 'tel';
    placeholder: string;
    isColor?: boolean;
    isTextArea?: boolean;
    isCoin?: any;
    isDisabled?: any;
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
    isCoin = false,
    isDisabled = false
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
                        }
                    }}
                    InputProps={{
                        startAdornment: isCoin && (
                            <Image style={{ marginRight: '10px' }} src='/images/coin.png' alt='picture' width={20} height={20} />
                        )
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
                    placeholder={placeholder}
                    focused
                    disabled={isDisabled}
                    {...field}
                />
            )}
        />
    );
};

export default Input;
