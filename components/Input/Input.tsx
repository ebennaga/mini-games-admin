import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface InputProps {
    form?: any;
    name: any;
    label: string;
    rules: any;
    type?: 'text' | 'number' | 'password' | 'email' | 'tel';
    placeholder: string;
    isTextArea?: boolean;
}
const Input: React.FC<InputProps> = ({ name, label, rules, form, type, placeholder, isTextArea }) => {
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
                    {...field}
                />
            )}
        />
    );
};

export default Input;
