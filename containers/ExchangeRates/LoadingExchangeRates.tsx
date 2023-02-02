import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingExchangeRates = () => {
    return (
        <Box>
            <Skeleton sx={{ height: '250px' }} />
            <Skeleton sx={{ height: '90px' }} />
            <Skeleton sx={{ height: '90px' }} />
            <Skeleton sx={{ height: '90px' }} />
            <Skeleton sx={{ height: '90px' }} />
            <Skeleton sx={{ height: '90px' }} />
        </Box>
    );
};

export default LoadingExchangeRates;
