import React from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';

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
    isDisable?: boolean;
    padding?: any;
    fontSize?: any;
    isLoading?: boolean;
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
    type = 'button',
    isDisable = false,
    padding = '10px',
    fontSize = '14px',
    isLoading
}) => {
    return (
        <Button
            disabled={isLoading || isDisable}
            type={type}
            onClick={onClick}
            sx={{
                border,
                backgroundColor,
                color,
                width,
                height,
                borderRadius,
                padding,
                fontSize,
                '&:disabled': {
                    backgroundColor: '#949494',
                    color: 'white',
                    border: 'none'
                }
            }}
        >
            <Typography sx={{ textTransform: 'uppercase' }}>{isLoading ? <CircularProgress color='inherit' /> : title}</Typography>
        </Button>
    );
};

export default CustomButton;
