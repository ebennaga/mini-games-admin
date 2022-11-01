import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
    ButtonBase,
    Dialog,
    RadioGroup,
    Radio,
    DialogTitle,
    FormControlLabel,
    DialogContent,
    TextField,
    MenuItem
} from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const currencies = [
    {
        value: 'USD',
        label: '$'
    },
    {
        value: 'EUR',
        label: '€'
    },
    {
        value: 'BTC',
        label: '฿'
    },
    {
        value: 'JPY',
        label: '¥'
    }
];

const rows: GridRowsProp = [
    {
        id: '1',
        no: '1',
        code: 'PC0001',
        name: 'Mousepad Logitech',
        category: 'Accessories',
        uom: 'Pcs',
        qty: '5',
        img1: 'https://drivegoogle/image acc_001-2022.Jpeg',
        img2: 'https://drivegoogle/image acc_002-2022.Jpeg',
        img3: 'https://drivegoogle/image acc_003-2022.Jpeg',
        isActive: 'yes',
        action: 'lala'
    }
    // { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    // { id: 3, col1: 'MUI', col2: 'is Amazing' }
];

const columns: GridColDef[] = [
    { field: 'no', headerName: 'No.', width: 50 },
    { field: 'code', headerName: 'Product Code', width: 150 },
    { field: 'name', headerName: 'Product Name', width: 150 },
    { field: 'category', headerName: 'Product Category', width: 150 },
    { field: 'uom', headerName: 'UOM', width: 150 },
    { field: 'qty', headerName: 'Qty', width: 150 },
    { field: 'img1', headerName: 'Image 1', width: 150 },
    { field: 'img2', headerName: 'Image 2', width: 150 },
    { field: 'img3', headerName: 'Image 3', width: 150 },
    { field: 'isActive', headerName: 'Is Active', width: 150 },
    { field: 'action', headerName: 'Action', width: 150 }
];
const ProductPrizes = () => {
    const [open, setOpen] = React.useState(false);
    const [currency, setCurrency] = React.useState('Select Category');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };
    return (
        <Box component='section'>
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
                        <TextField id='outlined-select-currency' select label='Product Category' value={currency} onChange={handleChange}>
                            {currencies.map((option: any) => (
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
                    <Typography sx={{ fontWeight: 400, fontSize: '24px' }}>Product Prizes</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: '14px' }}> Additional description if required</Typography>
                </Box>

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
                        sx={{
                            background: '#A54CE5',
                            color: 'white',
                            p: 1.5,
                            borderRadius: '4px',
                            boxShadow:
                                '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);'
                        }}
                    >
                        {' '}
                        CREATE NEW{' '}
                    </ButtonBase>
                </Box>
            </Box>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', height: '100%' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <DataGrid
                            autoHeight
                            checkboxSelection
                            sx={{
                                ml: 3,
                                mr: 3,
                                border: '2px solid #E0E0E0',
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#F0F0F0',
                                    // color: 'rgba(255,0,0,0.7)',
                                    fontSize: '14px',
                                    fontWeight: 500
                                },
                                '& .MuiDataGrid-virtualScrollerRenderZone': {
                                    '& .MuiDataGrid-row': {
                                        backgroundColor: '#ffff'
                                    }
                                }
                            }}
                            rows={rows}
                            columns={columns}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductPrizes;
