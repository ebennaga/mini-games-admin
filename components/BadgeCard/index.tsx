import { Box } from '@mui/material';
import React from 'react';

interface BadgeProps {
    bgcolor: string;
    text: string;
}

const BadgeCard: React.FC<BadgeProps> = ({ bgcolor, text }) => {
    return (
        <Box
            sx={{
                bgcolor,
                borderRadius: '60px',
                padding: '2px 8px',
                fontSize: '12px',
                width: 'fit-content',
                margin: 'auto',
                color: '#fff'
            }}
        >
            {text}
        </Box>
    );
};

export default BadgeCard;
