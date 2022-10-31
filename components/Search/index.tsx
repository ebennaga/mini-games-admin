import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface SearchProps {
    name: string;
    form: any;
    placeholder: string;
    validator?: any;
    onSubmit: any;
}

const Search: React.FC<SearchProps> = ({ name, form, placeholder, validator, onSubmit }) => {
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            style={{
                background: 'rgba(0, 0, 0, 0.06)',
                width: '220px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                padding: '9px 15px'
            }}
        >
            <SearchIcon />
            <Controller
                name={name}
                control={form.control}
                rules={validator}
                render={({ field }) => {
                    return (
                        <TextField
                            placeholder={placeholder}
                            variant='standard'
                            InputProps={{
                                disableUnderline: true
                            }}
                            sx={{
                                ml: '11px'
                            }}
                            {...field}
                        />
                    );
                }}
            />
        </form>
    );
};

export default Search;
