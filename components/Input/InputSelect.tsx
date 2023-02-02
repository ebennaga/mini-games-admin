import React from 'react';
import { FormControl, Select, MenuItem, Typography, OutlinedInput, FormHelperText, Skeleton, Box } from '@mui/material';
import { Controller } from 'react-hook-form';

interface DataSelect {
    id: any;
    title: string;
}
interface InputSelectProps {
    form: any;
    name: string;
    dataSelect: Array<DataSelect>;
    title: string;
    placeholder: string;
    rules?: any;
    isLoading?: boolean;
}

const InputSelect: React.FC<InputSelectProps> = ({ form, name, dataSelect, title, placeholder, rules, isLoading }) => {
    const {
        formState: { errors }
    } = form;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const error = errors[name] || null;
    const errType = !form.watch(name) && error?.type;
    const errText = errType === 'required' ? 'Must be filled' : '';

    const handleChange = (e: any) => {
        form.setValue(name, e.target.value);
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
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
                            px: 1
                            // color: 'rgba(0, 0, 0, 1)'
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
                                    MenuProps={MenuProps}
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
                                        color: form.watch(name) === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black',
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#A54CE5'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#A54CE5'
                                        },
                                        '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                                            color: form.watch(name) ? '' : 'rgba(0, 0, 0, 0.38)'
                                        }
                                    }}
                                >
                                    <MenuItem
                                        // sx={{ fontSize: '16px', color: form.watch(name) ? 'rgba(0, 0, 0,1)' : 'rgba(0, 0, 0, 0.38)' }}
                                        disabled
                                        value='0'
                                    >
                                        {placeholder}
                                    </MenuItem>
                                    {dataSelect.map((item: any) => {
                                        return (
                                            <MenuItem value={item.id} key={item.id}>
                                                {item.title}
                                            </MenuItem>
                                        );
                                    })}
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

export default InputSelect;
