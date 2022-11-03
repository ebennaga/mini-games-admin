import React from 'react';
import { Box, Typography, IconButton, ButtonBase } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import DateResult from './DateResult';
import DialogFilter from './DialogFilter';

interface HeaderReconcileProps {
    form: any;
    handleGetData: any;
    dataDate: any;
    handleDownload: any;
}

const HeaderReconcile: React.FC<HeaderReconcileProps> = ({ form, handleGetData, dataDate, handleDownload }) => {
    const [isOpenFilter, setIsOpenFilter] = React.useState<boolean>(false);

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
                <Box display='flex' alignItems='center' gap='25px' position='relative'>
                    <DateResult minDate={form.watch('minDate')} maxDate={form.watch('maxDate')} />
                    <ButtonBase
                        onClick={handleGetData}
                        sx={{ background: '#A54CE5', color: '#fff', padding: '12px 22px', borderRadius: '4px' }}
                    >
                        GET DATA
                    </ButtonBase>
                    <IconButton onClick={() => setIsOpenFilter(!isOpenFilter)}>
                        <FilterListIcon sx={{ fontSize: '34px' }} />
                    </IconButton>
                    <Box sx={{ position: 'absolute', zIndex: 3, top: '75px', right: '-160px' }}>
                        <DialogFilter form={form} dataDate={dataDate} open={isOpenFilter} setOpen={setIsOpenFilter} />
                    </Box>
                </Box>
                <ButtonBase
                    onClick={handleDownload}
                    sx={{
                        borderRadius: '4px',
                        background: '#A54CE5',
                        color: '#fff',
                        padding: '6px 16px',
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
