/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, List, Typography, Avatar, Paper, ButtonBase, CircularProgress } from '@mui/material';
import Search from 'components/Search';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAuthReducer from 'hooks/useAuthReducer';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector } from 'react-redux';
import MENUBAR from 'utils/config';
import NavbarCard from './NavbarCard';
import DropdownCard from './DropdownCard';
import LoadingMenus from './LoadingMenus';

interface LayoutProps {
    children: any;
    isUserInfo?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isUserInfo = true }) => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: ''
        }
    });

    const userState: any = useSelector((state: any) => state.webpage?.user?.user);

    const [isDrop, setIsDrop] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingMenus, setIsLoadingMenus] = React.useState<boolean>(false);
    const [menus, setMenus] = React.useState<Array<any>>(userState?.menus);
    const [menuAccess, setMenuAccess] = React.useState<Array<any>>([]);

    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const { clearUser, setUser } = useAuthReducer();

    const path = router.asPath;

    const handleSearch = (data: any) => {
        // alert(data.search);
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

    const setShowMenu = async (showMenu: any, menuBar: any) => {
        if (showMenu.length > 0) {
            let result: any = [];
            let titleList = '';
            await showMenu.forEach((item: any) => {
                if (item.have_permission) {
                    const filterMenu = menuBar.filter((itm: any, index: number, self: any) => {
                        const list = itm?.dropdownList?.find((i: any) => i.title === item.name);
                        if (list) {
                            titleList = itm.title;
                        }
                        return itm.title === item.name || list;
                    });
                    result = [...result, ...filterMenu];
                }
            });

            // Delete duplicate data array
            result = [
                ...result.filter((item: any, index: number, self: any) => {
                    return index === self.findIndex((val: any) => val.title === item.title);
                })
            ];
            return result;
        }
        return null;
    };

    const handleMenus = async () => {
        setIsLoadingMenus(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: 'menus'
            });
            if (response.status === 200) {
                const showMenu = response.data?.data;
                const resMenus = await setShowMenu(showMenu, MENUBAR);
                setMenus(resMenus);
                setUser({ ...userState, menus: resMenus });
                setMenuAccess(showMenu);
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsLoadingMenus(false);
    };

    React.useEffect(() => {
        handleMenus();
    }, []);

    console.log(menus);

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
                        {isLoadingMenus ? (
                            <LoadingMenus />
                        ) : (
                            <List sx={{ maxWidth: '240px' }}>
                                {menus?.map((item: any) => {
                                    const isActive = router.asPath === item.href;
                                    return item.dropdownList ? (
                                        <DropdownCard
                                            menuAccess={menuAccess}
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
                        )}
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
                                    flexDirection: 'column',
                                    zIndex: 99
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
