import { Box, Skeleton } from '@mui/material';
import React from 'react';

const LoadingMenus = () => {
    return (
        <Box width='100%'>
            {[...Array(8)].map((_item: any, index: number) => (
                <Skeleton key={index} sx={{ height: '80px' }} />
            ))}
        </Box>
    );
};

export default LoadingMenus;
