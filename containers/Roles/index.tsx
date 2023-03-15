/* eslint-disable no-unused-vars */
import { Box, Skeleton } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import PaginationCard from 'components/PaginationCard';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import DialogFailed from 'components/Dialog/DialogFailed';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import LoadingExchangeRates from 'containers/ExchangeRates/LoadingExchangeRates';
import TitleCard from 'components/Layout/TitleCard';
import TableRoles from './TableRoles';
import FilterRoles from './FilterRoles';
import DialogMenuAccess from './DialogMenuAccess';

const Roles = () => {
    // const dataSelect = [
    //     { id: 'user', title: 'User' },
    //     { id: 'content writer', title: 'Content Writer' },
    //     { id: 'digital marketing', title: 'Digital Marketing' },
    //     { id: 'admin', title: 'Admin' },
    //     { id: 'super admin', title: 'Super Admin' }
    // ];

    // const dataAccesss = [
    //     { isChecked: false, name: 'Dashboard', id: 1 },
    //     { isChecked: false, name: 'Blogs', id: 2 },
    //     { isChecked: false, name: 'Account', id: 3 },
    //     { isChecked: false, name: 'Exchanges Rates', id: 4 },
    //     { isChecked: false, name: 'Tournament', id: 5 },
    //     { isChecked: false, name: 'Location', id: 6 },
    //     { isChecked: false, name: 'Participant Tournaments', id: 7 },
    //     { isChecked: false, name: 'Product Prizes', id: 8 },
    //     { isChecked: false, name: 'Banner', id: 9 },
    //     { isChecked: false, name: 'Roles', id: 10 },
    //     { isChecked: false, name: 'Reconcile', id: 11 },
    //     { isChecked: false, name: 'Games', id: 12 },
    //     { isChecked: false, name: 'Client Tournaments', id: 13 },
    //     { isChecked: false, name: 'Client Account', id: 14 }
    // ];

    const [isDialogFilter, setIsDialogFilter] = React.useState<boolean>(false);
    const [totalChecked, setTotalChecked] = React.useState<number>(0);
    const [openDialogConfirm, setOpenDialogConfirm] = React.useState<boolean>(false);
    const [openMenuAccess, setOpenMenuAccess] = React.useState<boolean>(false);
    const [openDialogFailed, setOpenDialogFailed] = React.useState<boolean>(false);
    const [dataRoles, setDataRoles] = React.useState<Array<any>>([]);
    const [dataSelect, setDataSelect] = React.useState<Array<any>>([]);
    const [dataAccesss, setDataAccesss] = React.useState<Array<any>>([]);
    const [isLoading, setIsloading] = React.useState<boolean>(true);
    const [dataChanges, setDataChanges] = React.useState<Array<any>>([]);
    const [idRole, setIdRole] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const { fetchAPI } = useAPICaller();
    const [query, setQuery] = React.useState('');
    const router = useRouter();
    const notify = useNotify();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            dataTable: dataRoles,
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

    const getRoles = async () => {
        setIsloading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: 'roles?search='
            });

            if (response.status === 200) {
                const resData = response.data.data;

                setDataRoles(resData);
                form.setValue('dataTable', resData);

                const resultDataSelect = resData.map((i: any) => {
                    const dataItem = { id: i.name, title: i.name };
                    return dataItem;
                });
                setDataSelect(resultDataSelect);
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsloading(false);
    };

    // Event Next page
    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(dataRoles.length / input.row);
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

    // Get access Data
    const getMenuAccess = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetchAPI({
                endpoint: `roles/${id}/menu-accesses`,
                method: 'GET'
            });

            if (response.status === 200) {
                const resData = response.data.data;
                const jsonObject: any = resData.map(JSON.stringify);

                const uniqueSet: any = new Set(jsonObject);
                const parsing: any = JSON.parse;
                const uniqueArray: any = Array.from(uniqueSet).map(parsing);

                setDataAccesss(uniqueArray);
                setLoading(false);
            } else {
                notify(response.data.message, 'error');
                setLoading(false);
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    const handleMenuAccess = (id: number, isOpen: boolean) => {
        setOpenMenuAccess(isOpen);
        getMenuAccess(id);
    };
    // Event Remove Item
    const handleRemove = async () => {
        try {
            const table = form.watch('dataTable');
            table.map(async (item: any) => {
                if (item.isAction) {
                    const response = await fetchAPI({
                        endpoint: `roles/${item.id}`,
                        method: 'DELETE'
                    });
                    if (response.status === 200) {
                        notify(response.data.message, 'success');
                        await getRoles();
                        setOpenDialogConfirm(false);
                        setTotalChecked(0);
                    } else {
                        notify(response.data.message, 'error');
                    }
                }
            });
            // console.log('responseDelte', response);
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    // Event edit item
    const handleEdit = (id: any) => {
        const table: any = form.watch('dataTable');
        const filter = table.filter((item: any) => item.isAction);
        router.push(`/settings/roles/${filter[0].id}/`);
    };

    // Event update access
    const handleUpdateAccess = async (data: any) => {
        try {
            // const currentAccess = form.watch('accessUpdated');

            const id = dataChanges.map((item) => {
                return item.id;
            });

            idRole.menus = id.join(',');
            const body = idRole;

            const response = await fetchAPI({
                method: 'PUT',
                endpoint: `roles/${idRole.id}`,
                data: body
            });
            if (response.data.status === 200) {
                const resData = response.data.data;

                notify(response.data.message, 'success');
                setOpenMenuAccess(false);
                setDataChanges([]);
            }
        } catch (err: any) {
            notify(err.message, 'error');
            setOpenDialogFailed(true);
        }
    };

    // Event Filter data
    const handleFilter = () => {
        const dataTable = dataRoles;

        const { filterActive, filterSelect } = form.watch();
        let result: Array<any> = [];

        if (filterSelect) {
            result = [...dataTable.filter((item: any) => item.name.toLowerCase() === filterSelect.toLowerCase())];
        }

        const arr: Array<any> = result.length > 0 ? result : dataTable;

        result = [...arr.filter((item: any) => item.is_active === filterActive)];

        form.setValue('dataTable', result);
        form.setValue('idxAppears', { startIndex: 0, endIndex: 5 });
        form.setValue('page', 1);
        form.setValue('row', 5);
        setIsDialogFilter(false);
    };

    // Event Reset Filter
    const handleReset = () => {
        form.setValue('dataTable', dataRoles);
        form.setValue('idxAppears', { startIndex: 0, endIndex: 5 });
        form.setValue('page', 1);
        form.setValue('row', 5);
        setIsDialogFilter(false);
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

    const handleDataSearch = (keyword: any) => {
        setQuery(keyword);
    };
    const handleDialog = (value: boolean) => {
        setIsDialogFilter(value);
    };

    React.useEffect(() => {
        getRoles();
    }, []);

    React.useEffect(() => {
        // eslint-disable-next-line consistent-return, array-callback-return
        const temp = dataRoles.filter((post: any) => {
            if (query === '') {
                return post;
            }
            if (
                post?.code?.toString()?.toLowerCase()?.includes(query?.toLowerCase()) ||
                post?.name?.toLowerCase()?.includes(query?.toLowerCase())
            ) {
                return post;
            }
        });
        form.setValue('dataTable', temp);
        form.setValue('page', 1);
    }, [query]);

    // if (isLoading) {
    //     return <LoadingExchangeRates />;
    // }

    return (
        <Box>
            <TitleCard
                handleSearch={(keyword: any) => handleDataSearch(keyword)}
                onConfirm={(value: boolean) => handleDialog(value)}
                title='Master Roles'
                subtitle='Addtional description if required'
                isSearchExist
                isButtonCreateExist
                placeholderSeacrhText='Search by name, code, etc.'
                href='/settings/roles/add-role'
            />
            <Box position='absolute' left='415px' top='57px'>
                <FilterRoles
                    onFilter={handleFilter}
                    onReset={handleReset}
                    form={form}
                    nameSelect='filterSelect'
                    nameActive='filterActive'
                    dataSelect={dataSelect}
                    open={isDialogFilter}
                    setOpen={setIsDialogFilter}
                />
            </Box>
            {totalChecked ? (
                <Box mt={5}>
                    <BadgeSelected
                        total={totalChecked}
                        onEdit={totalChecked === 1 ? handleEdit : false}
                        handleOpenDeleteDialog={() => setOpenDialogConfirm(true)}
                    />
                </Box>
            ) : null}
            <Box mt='30px'>
                {isLoading ? (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {/* <CircularProgress size={100} color='secondary' /> */}
                        {[...Array(6)].map((item: any, index: number) => (
                            <Skeleton variant='rounded' width='100%' height='60px' key={index} sx={{ mt: '15px' }} />
                        ))}
                    </Box>
                ) : (
                    <TableRoles
                        setIdRole={setIdRole}
                        form={form}
                        name='dataTable'
                        nameIdxAppears='idxAppears'
                        nameMenuAccess='menuAccess'
                        setOpenMenuAccess={handleMenuAccess}
                    />
                )}

                <PaginationCard
                    totalItem={dataRoles.length}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    form={form}
                    nameRow='row'
                    namePage='page'
                />
            </Box>
            <DialogConfirmation
                title='Are you sure remove this role?'
                subTitle={`${totalChecked} Selected`}
                handleConfirm={handleRemove}
                open={openDialogConfirm}
                setOpen={setOpenDialogConfirm}
                textConfirmButton='REMOVE'
                textCancelButton='CANCEL'
            />
            <DialogMenuAccess
                setDataChanges={setDataChanges}
                dataChanges={dataChanges}
                onUpdate={handleUpdateAccess}
                open={openMenuAccess}
                setOpen={setOpenMenuAccess}
                currentRoles={roleMenuAccess.roleName}
                listAccess={dataAccesss}
                form={form}
                name='accessUpdated'
                isLoading={loading}
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
