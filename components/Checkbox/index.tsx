import { Checkbox } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface CheckboxControllerProps {
    name: string;
    form: any;
    onChange: any;
    checked: any;
}

const CheckboxController: React.FC<CheckboxControllerProps> = ({ name, form, onChange, checked }) => {
    return <Controller name={name} control={form.control} render={() => <Checkbox onChange={onChange} checked={checked} />} />;
};

export default CheckboxController;
