import { Box, ButtonBase, IconButton } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import InputSearch from 'components/Input/InputSearch';
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import PaginationCard from 'components/PaginationCard';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import DialogFailed from 'components/Dialog/DialogFailed';
import TableRoles from './TableRoles';
import FilterRoles from './FilterRoles';
import DialogMenuAccess from './DialogMenuAccess';

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

    const dataAccesss = [
        { isChecked: true, name: 'Dashboard', id: 1 },
        { isChecked: true, name: 'Blogs', id: 2 },
        { isChecked: false, name: 'Account', id: 3 },
        { isChecked: false, name: 'Ecxchanges Rates', id: 4 },
        { isChecked: false, name: 'Tournament', id: 5 },
        { isChecked: false, name: 'Location', id: 6 },
        { isChecked: false, name: 'Participant Tournaments', id: 7 },
        { isChecked: false, name: 'Product Prizes', id: 8 },
        { isChecked: false, name: 'Banner', id: 9 },
        { isChecked: false, name: 'Roles', id: 10 },
        { isChecked: false, name: 'Reconcile', id: 11 },
        { isChecked: false, name: 'Games', id: 12 },
        { isChecked: false, name: 'Client Tournaments', id: 13 },
        { isChecked: false, name: 'Client Account', id: 14 }
    ];

    const [isDialogFilter, setIsDialogFilter] = React.useState<boolean>(false);
    const [totalChecked, setTotalChecked] = React.useState<number>(0);
    const [openDialogConfirm, setOpenDialogConfirm] = React.useState<boolean>(false);
    const [openMenuAccess, setOpenMenuAccess] = React.useState<boolean>(false);
    const [openDialogFailed, setOpenDialogFailed] = React.useState<boolean>(false);

    const router = useRouter();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            dataTable,
            filterSelect: '',
            filterActive: true,
            row: 5,
            page: 1,
            idxAppears: { startIndex: 0, endIndex: 5 },
            menuAccess: {},
            accessUpdated: ''
        }
    });

    const roleMenuAccess: any = form.watch('menuAccess');

    // Event Next page
    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(dataTable.length / input.row);
        if (input.page < totalPage) {
            form.setValue('page', input.page + 1);
        }
    };

    // Event Prev Page
    const handlePrev = () => {
        const input = form.watch();
        if (input.page > 1) {
            form.setValue('page', input.page - 1);
        }
    };

    // Event Remove Item
    const handleRemove = () => {
        setOpenDialogConfirm(false);
        setTotalChecked(0);
    };

    // Event edit item
    const handleEdit = () => {
        console.log('edit item');
    };

    // Event update access
    const handleUpdateAccess = () => {
        const currentAccess = form.watch('accessUpdated');
        console.log(currentAccess);
        setOpenMenuAccess(false);
        setOpenDialogFailed(true);
    };

    // Update useForm idxAppears value, while doing pagination events
    React.useEffect(() => {
        const page = form.watch('page');
        const row = form.watch('row');

        const startIndex = page * row - row;
        const endIndex = startIndex + row - 1;

        const result = { startIndex, endIndex };
        form.setValue('idxAppears', result);
    }, [form.watch('row'), form.watch('page')]);

    // Read total of checked items
    React.useEffect(() => {
        const data = form.watch('dataTable');
        const countItems = data.filter((item: any) => item.isAction).length;
        setTotalChecked(countItems);
    }, [form.watch('dataTable')]);

    return (
        <Box>
            <HeaderChildren title='Master Roles' subTitle='Additional description if required'>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box mt='27px' display='flex' alignItems='center' position='relative'>
                        <InputSearch name='search' label='Search' placeholder='Search by name, code, etc.' form={form} />
                        <IconButton sx={{ ml: '35px' }} onClick={() => setIsDialogFilter(!isDialogFilter)}>
                            <FilterListIcon />
                        </IconButton>
                        <Box position='absolute' left='315px' top='57px'>
                            <FilterRoles
                                form={form}
                                nameSelect='filterSelect'
                                nameActive='filterActive'
                                dataSelect={dataSelect}
                                open={isDialogFilter}
                                setOpen={setIsDialogFilter}
                            />
                        </Box>
                    </Box>
                    <ButtonBase
                        onClick={() => router.push('/settings/roles/add-role')}
                        sx={{ padding: '10px 16px', color: '#fff', bgcolor: '#A54CE5', borderRadius: '4px', fontSize: '14px' }}
                    >
                        CREATE NEW
                    </ButtonBase>
                </Box>
            </HeaderChildren>
            {totalChecked ? (
                <Box mt={5}>
                    <BadgeSelected total={totalChecked} onEdit={handleEdit} handleOpenDeleteDialog={() => setOpenDialogConfirm(true)} />
                </Box>
            ) : null}
            <Box mt='30px'>
                <TableRoles
                    form={form}
                    name='dataTable'
                    nameIdxAppears='idxAppears'
                    nameMenuAccess='menuAccess'
                    setOpenMenuAccess={setOpenMenuAccess}
                />
                <PaginationCard
                    totalItem={dataTable.length}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    form={form}
                    nameRow='row'
                    namePage='page'
                />
            </Box>
            <DialogConfirmation
                title='Are you sure romove this role?'
                subTitle={`${totalChecked} Selected`}
                handleConfirm={handleRemove}
                open={openDialogConfirm}
                setOpen={setOpenDialogConfirm}
                textConfirmButton='REMOVE'
                textCancelButton='CANCEL'
            />
            <DialogMenuAccess
                onUpdate={handleUpdateAccess}
                open={openMenuAccess}
                setOpen={setOpenMenuAccess}
                currentRoles={roleMenuAccess.roleName}
                listAccess={dataAccesss}
                form={form}
                name='accessUpdated'
            />
            <DialogFailed
                open={openDialogFailed}
                setOpen={setOpenDialogFailed}
                title='Access Denied'
                subTitle='Cannot delete role! Already used in Account.'
            />
        </Box>
    );
};

export default Roles;
