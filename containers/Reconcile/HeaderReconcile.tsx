import React from 'react';
import { Box, Typography, IconButton, ButtonBase } from '@mui/material';
import CustomButton from 'components/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import DateResult from './DateResult';

interface HeaderReconcileProps {
    form: any;
    handleGetData: any;
}

const HeaderReconcile: React.FC<HeaderReconcileProps> = ({ form, handleGetData }) => {
    return (
        <Box
            sx={{
                boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                padding: '16px',
                borderRadius: '4px'
            }}
        >
            <Typography component='h1' fontSize='24px' fontWeight={400}>
                Reconcile
            </Typography>
            <Typography component='p' fontSize='14px' fontWeight={400} sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                Additional description if required
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '30px' }}>
                <Box display='flex' alignItems='center' gap='25px'>
                    <DateResult minDate={form.watch('minDate')} maxDate={form.watch('maxDate')} />
                    <CustomButton title='GET DATA' onClick={handleGetData} />
                    <IconButton>
                        <FilterListIcon sx={{ fontSize: '34px' }} />
                    </IconButton>
                </Box>
                <ButtonBase
                    sx={{
                        borderRadius: '4px',
                        background: '#A54CE5',
                        color: '#fff',
                        padding: '9px 16px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <DownloadIcon sx={{ mr: 1 }} />
                    <span>DOWNLOAD EXCEL</span>
                </ButtonBase>
            </Box>
        </Box>
    );
};

export default HeaderReconcile;
