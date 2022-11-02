import React from 'react';
import { Grid } from '@mui/material';

interface ITable {
    dataTable: any;
}

const Table: React.FC<ITable> = ({ dataTable }) => {
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
            {dataTable.map((item: any, index: number) => {
                return (
                    <Grid item container key={index} xs={12} sx={{ fontSize: '14px', fontWeight: 600 }}>
                        <Grid item container xs={4}>
                            <Grid item container xs={12}>
                                <Grid
                                    item
                                    xs={2}
                                    padding='12px'
                                    border='1px solid rgba(0,0,0,0.2)'
                                    sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                                        {item.userId}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={4}
                                        padding='12px'
                                        border='1px solid rgba(0,0,0,0.2)'
                                        sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.email}
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
                                {item.orderTime}
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
                                {item.transactionTime}
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
                                {item.settlementTime}
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Table;
