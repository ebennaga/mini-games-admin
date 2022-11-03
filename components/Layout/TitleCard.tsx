import React from 'react';
import {
    Box,
    Typography,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    ButtonBase,
    Dialog,
    DialogTitle,
    FormControlLabel,
    RadioGroup,
    Radio,
    DialogContent,
    MenuItem,
    TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';

interface TitleCardProps {
    title: string;
    subtitle: string;
    isSearchExist: boolean;
}

const categoryList = [
    {
        value: '1',
        label: 'Category 1'
    },
    {
        value: '2',
        label: 'Category 2'
    },
    {
        value: '3',
        label: 'Category 3'
    },
    {
        value: '4',
        label: 'Category 4'
    }
];
const TitleCard: React.FC<TitleCardProps> = ({ title, subtitle, isSearchExist }) => {
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState('Select Category');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    };
    const router = useRouter();
    return (
        <Box>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{ sx: { width: '100%', maxWidth: '375px', borderRadius: '4px', margin: 0 } }}
            >
                <DialogTitle
                    sx={{
                        position: 'relative',
                        background: 'transparent',
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 20px'
                    }}
                >
                    <Typography sx={{ flex: 1, fontWeight: 500, color: 'rgba(0, 0, 0, 0.6);', fontSize: '16px' }} component='div'>
                        Filters
                    </Typography>
                    <IconButton edge='start' color='inherit' onClick={() => setOpen(false)} aria-label='close'>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
                            <FormControlLabel
                                sx={{ mr: 1 }}
                                value='all'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'grey',
                                            '&.Mui-checked': {
                                                color: '#A54CE5'
                                            }
                                        }}
                                    />
                                }
                                label='All'
                            />
                            <FormControlLabel
                                sx={{ ml: 1, mr: 1 }}
                                value='latest'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'grey',
                                            '&.Mui-checked': {
                                                color: '#A54CE5'
                                            }
                                        }}
                                    />
                                }
                                label='Latest'
                            />
                            <FormControlLabel
                                sx={{ ml: 1, mr: 1 }}
                                value='oldest'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'grey',
                                            '&.Mui-checked': {
                                                color: '#A54CE5'
                                            }
                                        }}
                                    />
                                }
                                label='Oldest'
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            marginTop: '14px',
                            marginBottom: '24px'
                        }}
                    >
                        <InputLabel htmlFor='outlined-adornment-search'>Range Qty</InputLabel>
                        <OutlinedInput
                            id='outlined-adornment-search'
                            startAdornment={<InputAdornment position='start' />}
                            label='Range Qty'
                            placeholder='Fill Amount'
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField id='outlined-select-currency' select label='Product Category' value={category} onChange={handleChange}>
                            {categoryList.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, mb: 3, mt: 2 }}>
                        <ButtonBase
                            sx={{
                                background: '#A54CE5',
                                borderRadius: '4px',
                                width: '100%',
                                pt: 1,
                                pb: 1,
                                color: 'white',
                                fontWeight: 500
                            }}
                        >
                            FILTER
                        </ButtonBase>
                        <ButtonBase
                            sx={{
                                border: '1px solid #A54CE5',
                                borderRadius: '4px',
                                width: '100%',
                                fontWeight: 500,
                                background: 'white',
                                color: '#A54CE5'
                            }}
                        >
                            RESET
                        </ButtonBase>
                    </Box>
                </DialogContent>
            </Dialog>
            <Box
                sx={{
                    m: 3,
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
                                    placeholder='Search by name, category, etc'
                                />
                            </FormControl>
                            <IconButton onClick={() => setOpen(true)}>
                                <FilterListIcon />
                            </IconButton>
                        </Box>
                        <ButtonBase
                            onClick={() => router.push('/settings/product-prizes/add-prize')}
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
