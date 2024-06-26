import React from 'react';
import { FormControl, Select, MenuItem, Typography, Box, Skeleton, OutlinedInput, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

interface InputPrizingTableProps {
    form: any;
    name: string;
    dataSelect: any;
    title: string;
    placeholder: string;
    rules?: any;
    isLoading?: boolean;
}

const InputPrizingTable: React.FC<InputPrizingTableProps> = ({ form, name, dataSelect, title, placeholder, rules, isLoading }) => {
    const {
        formState: { errors }
    } = form;

    const error = errors[name] || null;
    const errType = !form.watch(name) && error?.type;
    const errText = errType === 'required' ? 'Must be Filled' : '';

    const handleChange = (e: any) => {
        form.setValue(name, e.target.value);
    };

    return (
        <Box>
            {isLoading ? (
                <Skeleton sx={{ height: '100px', mt: '-10px' }} />
            ) : (
                <FormControl fullWidth>
                    <Typography
                        component='span'
                        fontSize='12px'
                        sx={{
                            background: '#fff',
                            position: 'absolute',
                            top: '-9px',
                            zIndex: 1,
                            left: 14,
                            px: 1,
                            color: 'rgba(0,0,0,1)'
                        }}
                    >
                        {title}
                    </Typography>
                    <Controller
                        name={name}
                        control={form.control}
                        rules={rules}
                        render={() => {
                            return (
                                <Select
                                    fullWidth
                                    displayEmpty
                                    error={!!errType}
                                    value={form.watch(name)}
                                    onChange={handleChange}
                                    input={<OutlinedInput />}
                                    placeholder='Select Category'
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    label='Role Code'
                                    sx={{
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#A54CE5'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#A54CE5'
                                        },
                                        '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                                            color: form.watch(name) ? 'rgba(0, 0, 0,1)' : 'rgba(0, 0, 0, 0.38)'
                                        }
                                    }}
                                >
                                    <MenuItem sx={{ fontSize: '16px' }} disabled value=''>
                                        {placeholder}
                                    </MenuItem>
                                    {dataSelect.length > 0 &&
                                        dataSelect.map((item: any) => <MenuItem value={item.id}>{item.label}</MenuItem>)}
                                </Select>
                            );
                        }}
                    />
                    <FormHelperText error={!!errType}>{errText}</FormHelperText>
                </FormControl>
            )}
        </Box>
    );
};

export default InputPrizingTable;
