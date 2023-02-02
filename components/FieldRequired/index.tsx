import { Typography } from '@mui/material';
import React from 'react';

const FieldRequired = () => {
    return (
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)' }} component='span' fontSize='12px' fontWeight={400}>
            *Field Required
        </Typography>
    );
};

export default FieldRequired;
