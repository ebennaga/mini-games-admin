import { Switch } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface InputSwitchProps {
    form: any;
    name: string;
}

const InputSwitch: React.FC<InputSwitchProps> = ({ form, name }) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => {
                const value = form.watch(name);
                return (
                    <Switch
                        {...field}
                        defaultChecked={value}
                        sx={{
                            '& .MuiSwitch-track': { bgcolor: value ? '#A54CE5 !important' : 'rgba(0, 0, 0, 0.6)' },
                            '& .MuiButtonBase-root': { color: value ? '#9C27B0 !important' : '#fff' }
                        }}
                    />
                );
            }}
        />
    );
};

export default InputSwitch;
