import React from 'react';
import { Box, Skeleton, TextField } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { KeyboardArrowDown, ArrowDropDown } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Controller } from 'react-hook-form';

interface InputDateProps {
    label: string;
    type: 'date' | 'time';
    form: any;
    name: string;
    rules?: any;
    isCreate?: any;
    disabled?: any;
    isLoading?: boolean;
}

const InputDate: React.FC<InputDateProps> = ({ isLoading, disabled = false, label, type, form, name, rules, isCreate = false }) => {
    const {
        formState: { errors }
    } = form;
    const error = errors[name] ? errors[name] : null;
    const errType: string = error?.type;
    let helperText: string = '';

    if (errType === 'required') {
        helperText = `${label} is required`;
    }

    if (isLoading) {
        return <Skeleton sx={{ height: '100px', mt: '-15px' }} />;
    }
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
                            disabled={disabled}
                            fullWidth
                            id='date'
                            label={label}
                            type={type}
                            helperText={helperText}
                            // defaultValue={form.watch(name)}
                            sx={{
                                '& input': { pl: '40px' },
                                '& input[type="date"]::-webkit-inner-spin-button, input[type="date"]::-webkit-calendar-picker-indicator': {
                                    backgroundColor: 'red',
                                    opacity: 0
                                },
                                '& input[type="time"]::-webkit-inner-spin-button, input[type="time"]::-webkit-calendar-picker-indicator': {
                                    backgroundColor: 'red',
                                    opacity: 0
                                },
                                '& fieldset': {
                                    border: !error ? '1px solid rgba(0, 0, 0, 0.28) !important' : '1px solid red !important'
                                },

                                '& .MuiFormHelperText-root ': {
                                    color: 'red'
                                }
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            {...field}
                        />
                    );
                }}
            />
            {isCreate ? <ArrowDropDown sx={{ ml: '-32px' }} /> : <KeyboardArrowDown sx={{ ml: '-32px' }} />}
        </Box>
    );
};

export default InputDate;
