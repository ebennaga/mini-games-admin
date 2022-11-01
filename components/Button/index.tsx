import React from 'react';
import { ButtonBase, Typography } from '@mui/material';

interface CustomButtonProps {
    height?: string;
    width?: string;
    backgroundColor?: string;
    border?: string;
    color?: string;
    title?: string;
    borderRadius?: string;
    onClick?: any;
    padding?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    border = 'none',
    backgroundColor = '#A54CE5',
    color = 'white',
    height = '60px',
    width = '195px',
    title = 'submit',
    borderRadius = '4px',
    onClick,
    padding = '10px'
}) => {
    return (
        <ButtonBase onClick={onClick} sx={{ padding, border, backgroundColor, color, width, height, borderRadius }}>
            <Typography sx={{ textTransform: 'uppercase' }}>{title}</Typography>
        </ButtonBase>
    );
};

export default CustomButton;
