import { Box, ButtonBase, IconButton } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import InputSearch from 'components/Input/InputSearch';
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import TableRoles from './TableRoles';
import FilterRoles from './FilterRoles';

const Roles = () => {
    const dataTable = [
        { id: 1, roleCode: 'Admin', roleName: 'Admin Operational', description: 'Lorem lorem halo lorem!', isActive: false },
        { id: 2, roleCode: 'Mkt', roleName: 'Marketing', description: 'Lorem lorem halo lorem!', isActive: true },
        { id: 3, roleCode: 'Cw', roleName: 'Content Writer', description: 'Lorem lorem halo lorem!', isActive: false },
        { id: 4, roleCode: 'SA', roleName: 'Super Admin', description: 'Lorem lorem halo lorem!', isActive: false },
        { id: 5, roleCode: 'Admin', roleName: 'Admin Operational', description: 'Lorem lorem halo lorem!', isActive: true },
        { id: 6, roleCode: 'Mkt', roleName: 'Marketing', description: 'Lorem lorem halo lorem!', isActive: true },
        { id: 7, roleCode: 'Admin', roleName: 'Admin Operational', description: 'Lorem lorem halo lorem!', isActive: true }
    ];

    const dataSelect = [
        { id: 1, title: 'Content Writer' },
        { id: 2, title: 'Digital Marketing' },
        { id: 3, title: 'Admin Operational' },
        { id: 4, title: 'Super Admin' }
    ];

    const [isDialogFilter, setIsDialogFilter] = React.useState<boolean>(false);

    const router = useRouter();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            dataTable,
            filterSelect: '',
            filterActive: true
        }
    });

    console.log('response', form.watch());

    return (
        <Box>
            <HeaderChildren title='Master Roles' subTitle='Additional description if required'>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box mt='27px' display='flex' alignItems='center' position='relative'>
                        <InputSearch name='search' label='Search' placeholder='Search by name, code, etc.' form={form} />
                        <IconButton sx={{ ml: '35px' }} onClick={() => setIsDialogFilter(!isDialogFilter)}>
                            <FilterListIcon />
                        </IconButton>
                        <FilterRoles form={form} nameSelect='filterSelect' nameActive='filterActive' dataSelect={dataSelect} />
                    </Box>
                    <ButtonBase
                        onClick={() => router.push('/settings/roles/add-roles')}
                        sx={{ padding: '10px 16px', color: '#fff', bgcolor: '#A54CE5', borderRadius: '4px', fontSize: '14px' }}
                    >
                        CREATE NEW
                    </ButtonBase>
                </Box>
            </HeaderChildren>
            <Box mt='30px'>
                <TableRoles form={form} name='dataTable' />
            </Box>
        </Box>
    );
};

export default Roles;
