/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface DateResultProps {
    minDate: string;
    maxDate: string;
}

const DateResult: React.FC<DateResultProps> = ({ minDate, maxDate }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(0,0,0,0.2)',
                width: 'fit-content',
                padding: '15px 10px',
                borderRadius: '4px',
                position: 'relative'
            }}
        >
            <Typography
                component='p'
                fontSize='12px'
                fontWeight={400}
                sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    background: '#fff',
                    padding: '2px',
                    position: 'absolute',
                    zIndex: 2,
                    top: '-12px'
                }}
            >
                Date
            </Typography>
            <Typography component='p' mr='20px'>
                {minDate || ''}
            </Typography>
            <span style={{ paddingBottom: '5px' }}>-</span>
            <Typography component='p' ml='20px'>
                {maxDate || ''}
            </Typography>
            <DateRangeIcon sx={{ color: 'rgba(0,0,0,0.6)', ml: 1 }} />
        </Box>
    );
};

export default DateResult;
