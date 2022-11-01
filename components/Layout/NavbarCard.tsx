import { ListItemButton, Typography } from '@mui/material';
import React from 'react';

interface NavbarCardProps {
    icon: string;
    title: string;
    onClick: any;
    isActive: boolean;
}

const NavbarCard: React.FC<NavbarCardProps> = ({ icon, title, onClick, isActive }) => {
    const arrIcon = icon.split('.');
    const iconActive = `${arrIcon[0]}-active.${arrIcon[1]}`;

    return (
        <ListItemButton
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '100%',
                mb: '12px',
                padding: '15px 19px',
                bgcolor: isActive ? '#A54CE5' : '#fff',
                color: isActive ? '#fff' : 'rgba(0, 0, 0, 1)',
                borderRadius: '4px'
            }}
            onClick={onClick}
        >
            <img src={isActive ? iconActive : icon} alt='dashboard' width='18px' height='auto' />
            <Typography component='span' fontSize='16px' fontWeight={400} ml='35px'>
                {title}
            </Typography>
        </ListItemButton>
    );
};

export default NavbarCard;
