import { Typography } from '@mui/material';
import React from 'react';

const FieldRequired = () => {
    return (
        <Typography component='span' fontSize='12px' fontWeight={400}>
            *Field Required
        </Typography>
    );
};

export default FieldRequired;
