import React from 'react';
import {
    Box,
    Typography,
    ButtonBase,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    FormControl,
    Switch,
    RadioGroup,
    Radio,
    FormControlLabel,
    MenuItem,
    TextField
} from '@mui/material';
import TitleCard from 'components/Layout/TitleCard';
import CustomButton from 'components/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';

const rows: GridRowsProp = [
    {
        id: '1',
        no: '1',
        title: 'Info Pre Launch Bonus',
        img: 'banner_info.jpg',
        desc: 'Info Mengenai Top up Bonus Prize Play Sebelum Launch',
        showTo: 'Home',
        isActive: 'yes',
        action: 'v'
    }
];

const columns: GridColDef[] = [
    { field: 'no', headerName: 'No.', width: 50 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'img', headerName: 'Images', width: 150 },
    { field: 'desc', headerName: 'Description', width: 300 },
    { field: 'showTo', headerName: 'Show to', width: 150 },
    { field: 'isActive', headerName: 'Is Active', width: 150 },
    { field: 'action', headerName: 'Action', width: 150 }
];
const menuList = [
    {
        value: '1',
        label: 'Menu 1'
    },
    {
        value: '2',
        label: 'Menu 2'
    },
    {
        value: '3',
        label: 'Menu 3'
    },
    {
        value: '4',
        label: 'Menu 4'
    }
];

const PurpleSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#9C27B0',
        '&:hover': {
            backgroundColor: alpha('#9C27B0', theme.palette.action.hoverOpacity)
        }
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#9C27B0'
    }
}));
const Banner = () => {
    const [hidden, setHidden] = React.useState(false);
    const [numberSelected, setNumberSelected] = React.useState(0);
    const [openRemove, setOpenRemove] = React.useState(false);
    const [openFilter, setOpenFilter] = React.useState(false);
    const [menu, setMenu] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenu(event.target.value);
    };
    const handleDialog = (value: boolean) => {
        setOpenFilter(value);
    };
    return (
        <Box component='section'>
            <Dialog
                open={openRemove}
                onClose={() => setOpenRemove(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle sx={{ m: 1, display: 'flex', justifyContent: 'center' }} id='alert-dialog-title'>
                    Are you sure remove this banner ?
                </DialogTitle>
                <DialogContent sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DialogContentText id='alert-dialog-description'>{numberSelected} items selected</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ m: 1 }}>
                    <CustomButton title='REMOVE' height='47px' />
                    <CustomButton
                        title='CANCEL'
                        backgroundColor='white'
                        color='#A54CE5'
                        border='1px solid #A54CE5'
                        height='47px'
                        onClick={() => setOpenRemove(false)}
                    />
                </DialogActions>
            </Dialog>
            <TitleCard
                onConfirm={(value: boolean) => handleDialog(value)}
                title='Banner'
                subtitle='Addtional description if required'
                isSearchExist
                placeholderSeacrhText='Search by tittle, images, etc.'
                href='/banner/add-banner'
            />
            {hidden && (
                <Box sx={{ mx: 1, my: 3, padding: 2, background: '#F4F1FF' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'black', fontWeight: 500, fontSize: '14px' }}>{numberSelected} items selected</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <ButtonBase sx={{ color: '#A54CE5', m: 1 }}>
                                <ModeEditIcon />
                                <Typography sx={{ fontWeight: 500, fontSize: '13px', pl: 0.5 }}>EDIT</Typography>
                            </ButtonBase>
                            <ButtonBase sx={{ color: '#A54CE5', m: 1 }} onClick={() => setOpenRemove(true)}>
                                <DeleteIcon />
                                <Typography sx={{ fontWeight: 500, fontSize: '13px', pl: 0.5 }}>REMOVE</Typography>
                            </ButtonBase>
                        </Box>
                    </Box>
                </Box>
            )}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', height: '100%' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <DataGrid
                            autoHeight
                            checkboxSelection
                            onSelectionModelChange={(e) => {
                                setNumberSelected(e.length);
                                if (e.length > 0) {
                                    setHidden(true);
                                } else {
                                    setHidden(false);
                                }
                            }}
                            sx={{
                                ml: 1,
                                mr: 1,
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
            <Dialog
                open={openFilter}
                onClose={() => setOpenFilter(false)}
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
                    <IconButton edge='start' color='inherit' onClick={() => setOpenFilter(false)} aria-label='close'>
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
                        <TextField id='outlined-select-currency' select label='Show to' value={menu} onChange={handleChange}>
                            {menuList.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.6);', fontWeight: 500, fontSize: '16px' }}>Is Active</Typography>
                        <PurpleSwitch defaultChecked />
                    </Box>
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
        </Box>
    );
};

export default Banner;
