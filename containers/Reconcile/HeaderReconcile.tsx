/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, IconButton, ButtonBase, Skeleton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import HeaderChildren from 'components/HeaderChildren';
import InputStartEndDate from 'components/Input/InputStartEndDate';
import DateResult from './DateResult';
import DialogFilter from './DialogFilter';

interface HeaderReconcileProps {
    form: any;
    handleGetData: any;
    dataDate: any;
    handleDownload: any;
    handleFilter: any;
    handleReset: () => void;
    isLoading: boolean;
}

const HeaderReconcile: React.FC<HeaderReconcileProps> = ({
    form,
    handleGetData,
    dataDate,
    handleDownload,
    handleFilter,
    handleReset,
    isLoading
}) => {
    const [isOpenFilter, setIsOpenFilter] = React.useState<boolean>(false);

    return (
        <HeaderChildren title='Reconcile' subTitle='Additional description if required'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '30px' }}>
                <Box display='flex' alignItems='center' gap='25px' position='relative'>
                    {/* <DateResult minDate={form.watch('minDate')} maxDate={form.watch('maxDate')} /> */}
                    <form onSubmit={form.handleSubmit(handleGetData)} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <InputStartEndDate nameStartDate='minDate' nameEndDate='maxDate' form={form} label='Date' />
                        {isLoading ? (
                            <Skeleton sx={{ width: '70px', height: '60px' }} />
                        ) : (
                            <ButtonBase
                                type='submit'
                                onClick={handleGetData}
                                sx={{ background: '#A54CE5', color: '#fff', padding: '12px 22px', borderRadius: '4px' }}
                            >
                                GET DATA
                            </ButtonBase>
                        )}
                    </form>
                    <IconButton onClick={() => setIsOpenFilter(!isOpenFilter)}>
                        <FilterListIcon sx={{ fontSize: '34px' }} />
                    </IconButton>
                    {isLoading ? (
                        <Skeleton sx={{ width: '40px', height: '60px' }} />
                    ) : (
                        <Box sx={{ position: 'absolute', zIndex: 3, top: '75px', right: '-160px' }}>
                            <DialogFilter
                                form={form}
                                dataDate={dataDate}
                                open={isOpenFilter}
                                setOpen={setIsOpenFilter}
                                handleFilter={handleFilter}
                                handleReset={handleReset}
                            />
                        </Box>
                    )}
                </Box>
                {isLoading ? (
                    <Skeleton sx={{ width: '190px', height: '60px' }} />
                ) : (
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
                )}
            </Box>
        </HeaderChildren>
    );
};

export default HeaderReconcile;
