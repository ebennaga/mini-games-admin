import React from 'react';
import { Box, List } from '@mui/material';
import Search from 'components/Search';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import NavbarCard from './NavbarCard';
import DropdownCard from './DropdownCard';

interface LayoutProps {
    children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const MENUBAR = [
        { icon: 'icons/navbar/dashboard.png', title: 'Dashboard', href: '/' },
        { icon: 'icons/navbar/account.png', title: 'Account', href: '/account' },
        { icon: 'icons/navbar/client-account.png', title: 'Client Account', href: '/client-account' },
        { icon: 'icons/navbar/reconcile.png', title: 'Reconcile', href: '/reconcile' },
        { icon: 'icons/navbar/game.png', title: 'Games', href: '/game' },
        {
            icon: 'icons/navbar/tournament.png',
            title: 'Tournament',
            href: '/tournament',
            dropdownList: [
                { title: 'Tournaments', href: '/tournament' },
                { title: 'Participant Tournament', href: '/tournament' },
                { title: 'Client Tournament', href: '/tournament' }
            ]
        },
        {
            icon: 'icons/navbar/content.png',
            title: 'Content',
            href: '/content',
            dropdownList: [
                { title: 'Banner', href: '/banner' },
                { title: 'Blogs', href: '/banner' }
            ]
        },
        {
            icon: 'icons/navbar/setting.png',
            title: 'Settings',
            href: '/setting',
            dropdownList: [
                { title: 'Exchange Rates', href: '/setting' },
                { title: 'Location', href: '/setting' },
                { title: 'Product Prizes', href: '/setting' },
                { title: 'Roles', href: '/setting' }
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
                {path === '/sign-in' || path === '/sign-up' || path === '/reset-password' ? null : (
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
                                        onClick={undefined}
                                    />
                                );
                            })}
                        </List>
                    </>
                )}
            </Box>
            <Box width='100%'>{children}</Box>
        </Box>
    );
};

export default Layout;
