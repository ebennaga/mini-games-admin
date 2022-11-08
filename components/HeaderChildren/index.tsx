import React from 'react';
import { Box, Typography } from '@mui/material';

interface HeaderChildrenProps {
    title: string;
    subTitle: string;
    children: any;
}

const HeaderChildren: React.FC<HeaderChildrenProps> = ({ title, subTitle, children }) => {
    return (
        <Box
            sx={{
                boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                padding: '16px',
                borderRadius: '4px'
            }}
        >
            <Typography component='h1' fontSize='24px' fontWeight={600}>
                {title}
            </Typography>
            <Typography component='p' fontSize='14px' fontWeight={400} sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                {subTitle}
            </Typography>
            {children}
        </Box>
    );
};

export default HeaderChildren;
