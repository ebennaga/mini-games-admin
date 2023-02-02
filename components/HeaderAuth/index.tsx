import React from 'react';
import { Box, Typography } from '@mui/material';

interface HeaderAuthProps {
    title: string;
    subTitle: string;
}

const HeaderAuth: React.FC<HeaderAuthProps> = ({ title, subTitle }) => {
    return (
        <Box
            sx={{
                boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                padding: '16px'
            }}
        >
            <Typography component='h1' fontSize='24px' fontWeight={400}>
                {title}
            </Typography>
            <Typography component='p' fontSize='14px' sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                {subTitle}
            </Typography>
        </Box>
    );
};

export default HeaderAuth;
