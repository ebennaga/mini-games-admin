import { Checkbox } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface CheckboxControllerProps {
    name: string;
    form: any;
    onChange?: any;
    checked?: boolean;
    disabled?: boolean;
}

const CheckboxController: React.FC<CheckboxControllerProps> = ({ name, form, onChange, checked, disabled }) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={() => <Checkbox disabled={disabled} onChange={onChange} checked={checked} />}
        />
    );
};

export default CheckboxController;
