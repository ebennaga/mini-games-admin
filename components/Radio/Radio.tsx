import { FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface RadioButtonProps {
    handleChange: any;
    form: any;
    name: string;
    rules: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({ handleChange, form, name, rules }) => {
    return (
        <Controller
            control={form.control}
            rules={rules}
            name={name}
            render={({ field }) => (
                <FormGroup row {...field}>
                    <RadioGroup
                        aria-labelledby='demo-controlled-radio-buttons-group'
                        name='controlled-radio-buttons-group'
                        value={form.watch('isActive')}
                        onChange={handleChange}
                        row
                    >
                        <FormControlLabel
                            // checked={form.watch('isActive')}
                            value='true'
                            defaultChecked
                            // control={<Checkbox color='secondary' checked={checked[0]} onChange={handleChange1} />}
                            control={<Radio defaultChecked color='secondary' />}
                            label='Yes'
                        />
                        <FormControlLabel
                            // checked={!Boolean(form.watch('isActive'))}
                            value='false'
                            // control={<Checkbox color='secondary' checked={!checked[0]} onChange={handleChange2} />}
                            control={<Radio color='secondary' />}
                            label='No'
                        />
                    </RadioGroup>
                </FormGroup>
            )}
        />
    );
};

export default RadioButton;
