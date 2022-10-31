import React from 'react';
import { Box } from '@mui/material';
import Search from 'components/Search';
import { useForm } from 'react-hook-form';
import MENUBAR from 'utils/config';
import { useRouter } from 'next/router';
import NavbarCard from './NavbarCard';
import DropdownCard from './DropdownCard';

interface LayoutProps {
    children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
                    height: '100vh',
                    pt: '22.2px',
                    px: '8px'
                }}
            >
                <img src='/images/logo.png' alt='Prize Play' width='99.89px' height='46.56px' style={{ marginBottom: '32.22px' }} />
                <Box mb='17px'>
                    <Search name='search' form={form} placeholder='Search...' onSubmit={handleSearch} />
                </Box>
                {MENUBAR.map((item: any) => {
                    const isActive = router.asPath === item.href;
                    return <NavbarCard key={item.title} icon={item.icon} title={item.title} isActive={isActive} onClick={undefined} />;
                })}
                <DropdownCard />
            </Box>
            <Box width='100%'>{children}</Box>
        </Box>
    );
};

export default Layout;
