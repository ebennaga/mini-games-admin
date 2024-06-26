import { Collapse, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

interface DropdownCardProps {
    title: string;
    listDropdown: any;
    icon: string;
    isActive: boolean;
    menuAccess: Array<any>;
}

const DropdownCard: React.FC<DropdownCardProps> = ({ title, listDropdown, icon, isActive, menuAccess }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [resultList, setResultList] = useState<Array<any>>([]);
    const arrIcon = icon.split('.');
    const iconActive = `${arrIcon[0]}-active.${arrIcon[1]}`;
    const router = useRouter();

    React.useEffect(() => {
        let result: Array<any> = [];
        // eslint-disable-next-line array-callback-return
        menuAccess.map((item: any) => {
            if (item?.have_permission) {
                result = [...result, listDropdown.filter((value: any) => value.title === item.name)[0]];
            }
        });

        setResultList(result);
    }, [listDropdown, menuAccess]);

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
                    {resultList.map((item: any, index: number) => {
                        return (
                            item && (
                                <ListItemButton
                                    key={index}
                                    sx={{ p: '10px 0 10px 53px', color: 'black' }}
                                    onClick={() => router.push(item?.href)}
                                >
                                    <ListItemText primary={item?.title} sx={{ '& span': { fontSize: '14px' } }} />
                                </ListItemButton>
                            )
                        );
                    })}
                </List>
            </Collapse>
        </ListItem>
    );
};

export default DropdownCard;
