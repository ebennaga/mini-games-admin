import { Collapse, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface DropdownCardProps {
    title: string;
    listDropdown: any;
    icon: string;
    isActive: boolean;
}

const DropdownCard: React.FC<DropdownCardProps> = ({ title, listDropdown, icon, isActive }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const arrIcon = icon.split('.');
    const iconActive = `${arrIcon[0]}-active.${arrIcon[1]}`;

    return (
        <ListItem
            sx={{
                padding: '15px 10px 15px 19px',
                display: 'flex',
                flexDirection: 'column',
                width: '240px'
            }}
        >
            <ListItemButton
                onClick={() => setIsOpen(!isOpen)}
                sx={{ padding: 0, width: '100%', pb: '10px', display: 'flex', justifyContent: 'space-between' }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemIcon sx={{ margin: 'auto', minWidth: '0' }}>
                        <img src={isActive ? iconActive : icon} alt='dashboard' width='18px' height='18px' />
                    </ListItemIcon>
                    <ListItemText primary={title} sx={{ color: 'black', ml: '35px' }} />
                </Box>
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout='auto' unmountOnExit sx={{ width: '100%' }}>
                <List component='div' disablePadding>
                    {listDropdown.map((item: any, index: number) => {
                        return (
                            <ListItemButton key={index} sx={{ p: '10px 0 10px 53px', color: 'black' }}>
                                <ListItemText primary={item.title} sx={{ '& span': { fontSize: '14px' } }} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Collapse>
        </ListItem>
    );
};

export default DropdownCard;
