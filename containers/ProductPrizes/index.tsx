import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import TitleCard from 'components/Layout/TitleCard';

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
    return (
        <Box component='section'>
            <TitleCard title='Product Prizes' subtitle='Addtional description if required' isSearchExist />
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
