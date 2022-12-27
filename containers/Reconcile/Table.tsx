import React from 'react';
import { Box, FormControl, Grid, MenuItem, Select, SelectChangeEvent, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingTable from './LoadingTable';

interface ITable {
    dataTable: any;
    form: any;
    nameRow: string;
    namePage: string;
    isLoading: boolean;
}

const Table: React.FC<ITable> = ({ dataTable, form, nameRow, namePage, isLoading }) => {
    const [showTable, setShowTable] = React.useState<any>({ startIndex: null, endIndex: null });

    const handleRow = (e: SelectChangeEvent) => {
        form.setValue(nameRow, e.target.value);
        form.setValue(namePage, 1);
    };

    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(dataTable.length / input.row);
        if (input.page < totalPage) {
            form.setValue(namePage, input.page + 1);
        }
    };

    const handlePrev = () => {
        const input = form.watch();
        if (input.page > 1) {
            form.setValue(namePage, input.page - 1);
        }
    };

    React.useEffect(() => {
        const page = form.watch(namePage);
        const row = form.watch(nameRow);
        const first = page * row - row;
        const last = first + row - 1;
        setShowTable({ startIndex: first, endIndex: last });
    }, [form.watch(nameRow), form.watch(namePage)]);

    return (
        <Grid container mt='38px'>
            <Grid item container xs={12} sx={{ fontSize: '14px', fontWeight: 600, background: '#F0F0F0' }}>
                <Grid item container xs={4}>
                    <Grid item container xs={12}>
                        <Grid item xs={2} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)' display='flex' justifyContent='center'>
                            No.
                        </Grid>
                        <Grid item container xs={10}>
                            <Grid item xs={4} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                                User ID
                            </Grid>
                            <Grid item xs={4} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                                Email
                            </Grid>
                            <Grid item xs={4} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                                Order ID
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={4}>
                    <Grid item xs={3} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                        Order Time
                    </Grid>
                    <Grid item xs={3} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                        Order Amount
                    </Grid>
                    <Grid item xs={3} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                        Transaction ID
                    </Grid>
                    <Grid item xs={3} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                        Bank
                    </Grid>
                </Grid>
                <Grid item container xs={4}>
                    <Grid item xs={3} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                        Transaction Time
                    </Grid>
                    <Grid item xs={3} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                        Gross Amount
                    </Grid>
                    <Grid item xs={3} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                        Transaction Status
                    </Grid>
                    <Grid item xs={3} padding='16px 12px' border='1px solid rgba(0,0,0,0.2)'>
                        Settlement Time
                    </Grid>
                </Grid>
            </Grid>
            {isLoading ? (
                <LoadingTable />
            ) : (
                dataTable.map((item: any, index: number) => {
                    return (
                        index >= showTable.startIndex &&
                        index <= showTable.endIndex && (
                            <Grid item container key={index} xs={12} sx={{ fontSize: '14px', fontWeight: 600 }}>
                                <Grid item container xs={4}>
                                    <Grid item container xs={12}>
                                        <Grid
                                            item
                                            xs={2}
                                            padding='12px'
                                            border='1px solid rgba(0,0,0,0.2)'
                                            sx={{
                                                wordBreak: 'break-word',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {index + 1}.
                                        </Grid>
                                        <Grid item container xs={10}>
                                            <Grid
                                                item
                                                xs={4}
                                                padding='12px'
                                                border='1px solid rgba(0,0,0,0.2)'
                                                sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
                                            >
                                                {item?.user?.id}
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                                padding='12px'
                                                border='1px solid rgba(0,0,0,0.2)'
                                                sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
                                            >
                                                {item?.user?.email}
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                                padding='12px'
                                                border='1px solid rgba(0,0,0,0.2)'
                                                sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
                                            >
                                                {item.orderId}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={4}>
                                    <Grid
                                        item
                                        xs={3}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {new Date(item.orderTime).toLocaleString('id')}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.orderAmount}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.transactionId}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.bank}
                                    </Grid>
                                </Grid>
                                <Grid item container xs={4}>
                                    <Grid
                                        item
                                        xs={3}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {new Date(item.transactionTime).toLocaleString('id')}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.grossAmount}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.transactionStatus}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {new Date(item.settlementTime).toLocaleString('id')}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    );
                })
            )}
            <Grid item xs={12} mt='16px'>
                <Box sx={{ float: 'right' }}>
                    <Typography component='span' fontSize='12px' fontWeight={400} sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                        Rows per page:
                    </Typography>
                    <FormControl
                        sx={{
                            mt: '2px',
                            ml: '3px',
                            '& .MuiInputBase-root::before': { border: 'none' },
                            '& .MuiInputBase-root::after': { border: 'none' }
                        }}
                    >
                        <Select
                            variant='standard'
                            labelId='selectPage'
                            value={form.watch(nameRow)}
                            onChange={handleRow}
                            sx={{ '& .MuiSelect-select': { padding: '0 19px 0 0 !important', fontSize: '12px' } }}
                        >
                            {[...Array(15)].map((_item: any, index: number) => {
                                const value = index + 1;
                                return (
                                    <MenuItem key={value} value={value} sx={{ padding: '0 29px 0 0' }}>
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <Typography component='span' fontSize='12px' fontWeight={400} px='33px'>
                        {form.watch(namePage)}-{Math.ceil(dataTable.length / form.watch(nameRow))} of {dataTable.length}
                    </Typography>
                    <IconButton onClick={handlePrev}>
                        <ArrowBackIosIcon sx={{ fontSize: '12px' }} />
                    </IconButton>
                    <IconButton onClick={handleNext}>
                        <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                    </IconButton>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Table;
