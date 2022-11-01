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
    type?: 'submit' | 'button';
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
    type = 'button'
}) => {
    return (
        <ButtonBase type={type} onClick={onClick} sx={{ border, backgroundColor, color, width, height, borderRadius }}>
            <Typography sx={{ textTransform: 'uppercase' }}>{title}</Typography>
        </ButtonBase>
    );
};

export default CustomButton;
