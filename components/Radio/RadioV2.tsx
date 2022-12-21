import { Box, Radio, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface RadioButtonProps {
    handleChange: any;
    form: any;
    name: string;
    rules: any;
    checked: any;
    label: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ form, name, rules, checked, handleChange, label }) => {
    return (
        <Controller
            control={form.control}
            rules={rules}
            name={name}
            render={() => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio onChange={handleChange} checked={checked} color='secondary' />
                    <Typography sx={{ ml: '-6px' }}>{label}</Typography>
                </Box>
            )}
        />
    );
};

export default RadioButton;
