import React from 'react';
import { Box, List, Typography, Avatar, Paper, ButtonBase, CircularProgress } from '@mui/material';
import Search from 'components/Search';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAuthReducer from 'hooks/useAuthReducer';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import EmailIcon from '@mui/icons-material/Email';
import NavbarCard from './NavbarCard';
import DropdownCard from './DropdownCard';

interface LayoutProps {
    children: any;
    isUserInfo?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isUserInfo = true }) => {
    const MENUBAR = [
        { active: '/icons/active/dashboard-active.png', icon: '/icons/navbar/dashboard.png', title: 'Dashboard', href: '/' },
        { active: '/icons/active/account-active.png', icon: '/icons/navbar/account.png', title: 'Account', href: '/account' },
        {
            active: '/icons/active/clientaccount-active.png',
            icon: '/icons/navbar/client-account.png',
            title: 'Client Account',
            href: '/client-account'
        },
        { active: '/icons/active/reconcile-active.png', icon: '/icons/navbar/reconcile.png', title: 'Reconcile', href: '/reconcile' },
        { active: '/icons/active/games-active.png', icon: '/icons/navbar/game.png', title: 'Games', href: '/games' },
        {
            active: '/icons/active/tournament.png',
            icon: '/icons/navbar/tournament.png',
            title: 'Tournament',
            href: '/tournament',
            dropdownList: [
                { title: 'Tournaments', href: '/tournament' },
                { title: 'Participant Tournament', href: '/tournament/participant-tournament' },
                { title: 'Client Tournament', href: '/tournament/client-tournament' }
            ]
        },
        { active: '/icons/active/redemption-active.png', icon: '/icons/navbar/redemption.png', title: 'Redemption', href: '/redemption' },
        {
            active: '/icons/active/content.png',
            icon: '/icons/navbar/content.png',
            title: 'Content',
            href: '/content',
            dropdownList: [
                { title: 'Banner', href: '/banner' },
                { title: 'Blogs', href: '/blogs' }
            ]
        },
        {
            active: '/icons/active/setting.png',
            icon: '/icons/navbar/setting.png',
            title: 'Settings',
            href: '/settings',
            dropdownList: [
                { title: 'Exchange Rates', href: '/exchange-rates' },
                { title: 'Location', href: '/settings/location' },

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
    const [isDrop, setIsDrop] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const { clearUser } = useAuthReducer();
    const handleSearch = (data: any) => {
        alert(data.search);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/auths/logout'
            });
            if (response?.status === 200) {
                clearUser();
                notify(response?.data.message, 'success');
                router.push('/sign-in');
            }
            setIsLoading(false);
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
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
                                        active={item.active}
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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            justifyContent: 'flex-end',
                            mb: '27px',
                            position: 'relative'
                        }}
                    >
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
                        <Avatar
                            onClick={() => setIsDrop(!isDrop)}
                            alt='user'
                            src=''
                            sx={{ width: '29px', height: '29px', background: 'rgba(0,0,0,0.54)', cursor: 'pointer' }}
                        />
                        {isDrop && (
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '200px',
                                    position: 'absolute',
                                    height: '100px',
                                    padding: '10px',
                                    top: '40px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography>owikun@mail.com</Typography>
                                <Box sx={{ width: '80%', height: '1px', backgroundColor: '#A54CE5', my: '5px' }} />
                                <ButtonBase onClick={handleLogout}>
                                    {isLoading ? <CircularProgress color='secondary' size={25} /> : <Typography>Logout</Typography>}
                                </ButtonBase>
                            </Paper>
                        )}
                    </Box>
                )}
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
