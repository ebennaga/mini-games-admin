import { TextField, InputAdornment } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Search } from '@mui/icons-material';

interface InputSearchProps {
    form?: any;
    name: any;
    label: string;
    placeholder?: string;
    onChangeFunc?: any;
}
const InputSearch: React.FC<InputSearchProps> = ({ name, label = 'Search', form, placeholder, onChangeFunc }) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field: { onChange } }) => (
                <TextField
                    sx={{
                        width: '300px',
                        borderStyle: 'solid'
                    }}
                    id='outlined-basic'
                    label={label}
                    variant='outlined'
                    color='secondary'
                    placeholder={placeholder}
                    focused
                    onChange={onChangeFunc != null ? onChangeFunc : onChange}
                    // {...field}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />
            )}
        />
    );
};

export default InputSearch;
