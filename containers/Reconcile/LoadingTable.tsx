import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const LoadingTable = () => {
    return (
        <>
            {[...Array(5)].map((_item: any, index: number) => {
                return (
                    <Grid key={index} item container xs={12} sx={{ fontSize: '14px', fontWeight: 600 }}>
                        <Grid item container xs={4}>
                            <Grid item container xs={12}>
                                <Grid
                                    item
                                    xs={2}
                                    padding='2px'
                                    sx={{
                                        wordBreak: 'break-word',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                                </Grid>
                                <Grid item container xs={10}>
                                    <Grid item xs={4} padding='2px' sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}>
                                        <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                                    </Grid>
                                    <Grid item xs={4} padding='2px' sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}>
                                        <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                                    </Grid>
                                    <Grid item xs={4} padding='2px' sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}>
                                        <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                            <Grid item xs={3} padding='2px' sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                            </Grid>
                            <Grid item xs={3} padding='2px' sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                            </Grid>
                            <Grid item xs={3} padding='2px' sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                            </Grid>
                            <Grid item xs={3} padding='2px' sx={{ wordBreak: 'break-word', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                            </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                            <Grid item xs={3} padding='2px' sx={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                            </Grid>
                            <Grid item xs={3} padding='2px' sx={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                            </Grid>
                            <Grid item xs={3} padding='2px' sx={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                            </Grid>
                            <Grid item xs={3} padding='2px' sx={{ wordWrap: 'break-word', display: 'flex', alignItems: 'center' }}>
                                <Skeleton sx={{ width: '100%', height: '80px', mb: '-25px' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}
        </>
    );
};

export default LoadingTable;
