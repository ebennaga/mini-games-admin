import React from 'react';
import { Box, Typography, ButtonBase, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import TitleCard from 'components/Layout/TitleCard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from 'components/Button';

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
        action: 'v'
    },
    {
        id: '2',
        no: '2',
        code: 'PC0002',
        name: 'Mousepad Logitech',
        category: 'Accessories',
        uom: 'Pcs',
        qty: '5',
        img1: 'https://drivegoogle/image acc_001-2022.Jpeg',
        img2: 'https://drivegoogle/image acc_002-2022.Jpeg',
        img3: 'https://drivegoogle/image acc_003-2022.Jpeg',
        isActive: 'yes',
        action: 'v'
    }
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
    const [hidden, setHidden] = React.useState(false);
    const [numberSelected, setNumberSelected] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    return (
        <Box component='section'>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle sx={{ m: 1, display: 'flex', justifyContent: 'center' }} id='alert-dialog-title'>
                    Are you sure remove this prizes ?
                </DialogTitle>
                <DialogContent sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DialogContentText id='alert-dialog-description'>2 items selected</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ m: 1 }}>
                    <CustomButton title='REMOVE' height='47px' />
                    <CustomButton
                        title='CANCEL'
                        backgroundColor='white'
                        color='#A54CE5'
                        border='1px solid #A54CE5'
                        height='47px'
                        onClick={() => setOpen(false)}
                    />
                </DialogActions>
            </Dialog>
            <TitleCard title='Product Prizes' subtitle='Addtional description if required' isSearchExist />
            {hidden && (
                <Box sx={{ m: 3, padding: 2, background: '#F4F1FF' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'black', fontWeight: 500, fontSize: '14px' }}>{numberSelected} items selected</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <ButtonBase sx={{ color: '#A54CE5', m: 1 }}>
                                <ModeEditIcon />
                                <Typography sx={{ fontWeight: 500, fontSize: '13px', pl: 0.5 }}>EDIT</Typography>
                            </ButtonBase>
                            <ButtonBase sx={{ color: '#A54CE5', m: 1 }} onClick={() => setOpen(true)}>
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
