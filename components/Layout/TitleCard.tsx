import React from 'react';
import { Box, Typography, InputLabel, FormControl, OutlinedInput, InputAdornment, IconButton, ButtonBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRouter } from 'next/router';

interface TitleCardProps {
    title: string;
    subtitle: string;
    isSearchExist: boolean;
    placeholderSeacrhText?: string;
    href?: string;
    // eslint-disable-next-line no-unused-vars
    onConfirm?: (value: boolean) => void;
    // eslint-disable-next-line no-unused-vars
    handleSearch?: (keyword: string) => void;
}

const TitleCard: React.FC<TitleCardProps> = ({
    title,
    subtitle,
    isSearchExist,
    placeholderSeacrhText = '',
    href = '',
    onConfirm,
    handleSearch
}) => {
    const router = useRouter();
    return (
        <Box>
            <Box
                sx={{
                    mx: 1,
                    my: 3,
                    padding: 1,
                    borderRadius: '4px',
                    boxShadow: ' 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);'
                }}
            >
                <Box sx={{ marginLeft: 1, marginBottom: 2 }}>
                    <Typography sx={{ fontWeight: 400, fontSize: '24px' }}>{title}</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: '14px' }}> {subtitle}</Typography>
                </Box>

                {isSearchExist && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormControl
                                fullWidth
                                sx={{
                                    '@media screen and (min-width: 768px)': {
                                        minWidth: '300px'
                                    },
                                    m: 1
                                }}
                            >
                                <InputLabel
                                    sx={{
                                        color: '#A54CE5 !important'
                                    }}
                                    htmlFor='outlined-adornment-search'
                                >
                                    Search
                                </InputLabel>
                                <OutlinedInput
                                    onChange={(e: any) => (handleSearch === undefined ? {} : handleSearch(e.target.value))}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#A54CE5 !important',
                                            borderWidth: '2.5px'
                                        }
                                    }}
                                    id='outlined-adornment-search'
                                    startAdornment={
                                        <InputAdornment position='start'>
                                            <IconButton edge='start'>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label='Search'
                                    placeholder={placeholderSeacrhText}
                                />
                            </FormControl>
                            <IconButton onClick={() => (onConfirm === undefined ? {} : onConfirm(true))}>
                                <FilterListIcon />
                            </IconButton>
                        </Box>
                        <ButtonBase
                            onClick={() => router.push(href)}
                            sx={{
                                background: '#A54CE5',
                                color: 'white',
                                p: 1.5,
                                borderRadius: '4px',
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);'
                            }}
                        >
                            CREATE NEW
                        </ButtonBase>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TitleCard;
