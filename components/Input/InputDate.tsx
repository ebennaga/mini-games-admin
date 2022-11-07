import React from 'react';
import { Box, TextField } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Controller } from 'react-hook-form';

interface InputDateProps {
    label: string;
    type: 'date' | 'time';
    form: any;
    name: string;
    rules?: any;
}

const InputDate: React.FC<InputDateProps> = ({ label, type, form, name, rules }) => {
    return (
        <Box display='flex' alignItems='center' justifyContent='center' width='100%' my='15px'>
            {type === 'date' ? <DateRangeIcon sx={{ mr: '-30px' }} /> : <AccessTimeIcon sx={{ mr: '-30px' }} />}

            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={({ field }) => {
                    return (
                        <TextField
                            fullWidth
                            id='date'
                            label={label}
                            type={type}
                            defaultValue={form.watch(name)}
                            sx={{ '& input': { pl: '40px' } }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            {...field}
                        />
                    );
                }}
            />
            <KeyboardArrowDownIcon sx={{ ml: '-30px' }} />
        </Box>
    );
};

export default InputDate;
