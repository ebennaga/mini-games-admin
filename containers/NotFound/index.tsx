import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from 'components/Button';
import { useRouter } from 'next/router';

const NotFoundContainer = () => {
    const router = useRouter();
    return (
        <Box sx={{ textAlign: 'center', height: '100vh' }}>
            <Typography variant='h1' sx={{ m: '400px 0px 100px' }}>
                404 Pages
            </Typography>
            <CustomButton
                onClick={() => {
                    router.push('/');
                }}
                width='30%'
                height='100px'
                title='Back to Dashboard'
            />
        </Box>
    );
};

export default NotFoundContainer;
