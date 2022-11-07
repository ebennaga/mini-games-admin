import React from 'react';
import { Box, List, Typography, Avatar } from '@mui/material';
import Search from 'components/Search';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import EmailIcon from '@mui/icons-material/Email';
import NavbarCard from './NavbarCard';
import DropdownCard from './DropdownCard';

interface LayoutProps {
    children: any;
    isUserInfo?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isUserInfo = true }) => {
    const MENUBAR = [
        { icon: '/icons/navbar/dashboard.png', title: 'Dashboard', href: '/' },
        { icon: '/icons/navbar/account.png', title: 'Account', href: '/account' },
        { icon: '/icons/navbar/client-account.png', title: 'Client Account', href: '/client-account' },
        { icon: '/icons/navbar/reconcile.png', title: 'Reconcile', href: '/reconcile' },
        { icon: '/icons/navbar/game.png', title: 'Games', href: '/games' },
        {
            icon: '/icons/navbar/tournament.png',
            title: 'Tournament',
            href: '/tournament',
            dropdownList: [
                { title: 'Tournaments', href: '/tournament' },
                { title: 'Participant Tournament', href: '/tournament/participant-tournament' },
                { title: 'Client Tournament', href: '/tournament' }
            ]
        },
        {
            icon: '/icons/navbar/content.png',
            title: 'Content',
            href: '/content',
            dropdownList: [
                { title: 'Banner', href: '/banner' },
                { title: 'Blogs', href: '/banner' }
            ]
        },
        {
            icon: '/icons/navbar/setting.png',
            title: 'Settings',
            href: '/settings',
            dropdownList: [
                { title: 'Exchange Rates', href: '/exchange-rates' },
                { title: 'Location', href: '/setting' },

                { title: 'Product Prizes', href: '/settings/product-prizes' },
                { title: 'Roles', href: '/settings/roles' }
            ]
        }
    ];

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: ''
        }
    });

    const router = useRouter();

    const handleSearch = (data: any) => {
        alert(data.search);
    };

    const path = router.asPath;

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh', display: 'flex' }}>
            <Box
                sx={{
                    bgcolor: '#fff',
                    color: 'rgba(0, 0, 0, 0.54)',
                    width: '256px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRight: '1.5px solid rgba(0, 0, 0, 0.06)',
                    height: 'auto',
                    pt: '22.2px',
                    px: '8px'
                }}
            >
                <img src='/images/logo.png' alt='Prize Play' width='99.89px' height='46.56px' style={{ marginBottom: '32.22px' }} />
                {path === '/sign-in' ||
                path === '/sign-up' ||
                path === '/reset-password' ||
                path === '/reset-password/confirmation' ? null : (
                    <>
                        <Box mb='17px'>
                            <Search name='search' form={form} placeholder='Search...' onSubmit={handleSearch} />
                        </Box>
                        <List sx={{ maxWidth: '240px' }}>
                            {MENUBAR.map((item: any) => {
                                const isActive = router.asPath === item.href;
                                return item.dropdownList ? (
                                    <DropdownCard
                                        key={item.title}
                                        title={item.title}
                                        listDropdown={item.dropdownList}
                                        icon={item.icon}
                                        isActive={isActive}
                                    />
                                ) : (
                                    <NavbarCard
                                        key={item.title}
                                        icon={item.icon}
                                        title={item.title}
                                        isActive={isActive}
                                        onClick={() => router.push(item.href)}
                                    />
                                );
                            })}
                        </List>
                    </>
                )}
            </Box>
            <Box width='100%' padding='33.5px 33px'>
                {isUserInfo && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', mb: '27px' }}>
                        <Box sx={{ position: 'relative', width: 'fit-content' }}>
                            <EmailIcon sx={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px' }} />
                            <Box
                                sx={{
                                    background: '#1976D2',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '100px',
                                    color: '#fff',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    position: 'absolute',
                                    top: '-9px',
                                    right: '-6px'
                                }}
                            >
                                <Typography component='span' fontSize='12px' mt='-3px'>
                                    1
                                </Typography>
                            </Box>
                        </Box>
                        <Typography component='span' fontSize='16px' sx={{ color: 'rgba(0, 0, 0, 0.87)', px: 3 }}>
                            BangLorem
                        </Typography>
                        <Avatar alt='user' src='' sx={{ width: '29px', height: '29px', background: 'rgba(0,0,0,0.54)' }} />
                    </Box>
                )}
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
