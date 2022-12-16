import { Box, ButtonBase, IconButton } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import InputSearch from 'components/Input/InputSearch';
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useForm } from 'react-hook-form';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import DialogSuccess from 'components/Dialog/DialogSuccess';
import PaginationCard from 'components/PaginationCard';
import FilterPlayerAccount from './FilterPlayerAccount';
import TablePlayerAccount from './TablePlayerAccount';

const PlayerAccount = () => {
    const dummyData = [
        {
            id: 5,
            username: 'master',
            name: 'Rinto',
            email: 'masterrinto@mail.com',
            google_id: 'googleidnih1234',
            coin: 1000,
            point: 500,
            is_active: true
        },
        {
            id: 9,
            username: 'jawir',
            name: 'Otnir',
            email: 'jawirotnir@mail.com',
            google_id: 'googleidjawir1234',
            coin: 800,
            point: 400,
            is_active: false
        },
        {
            id: 11,
            username: 'okeoke',
            name: 'Rintoke',
            email: 'okerinto@mail.com',
            google_id: 'googleid1234oke',
            coin: 2000,
            point: 100,
            is_active: true
        }
    ];

    const [openFilter, setOpenFilter] = React.useState<boolean>(false);
    const [dialogSuccessDel, setDialogSuccessDel] = React.useState<boolean>(false);
    const [dialogBanAccount, setDialogBanAccount] = React.useState<boolean>(false);
    const [totalChecked, setTotalChecked] = React.useState<number>(0);

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            row: 5,
            page: 1,
            filterActive: false,
            dataTable: dummyData,
            idxAppears: { startIndex: 0, endIndex: 5 }
        }
    });

    const formDataTable = form.watch('dataTable');

    // Event Remove Item
    const handleBanAccount = async () => {
        setDialogBanAccount(false);
        setDialogSuccessDel(true);
    };

    // Event Next page
    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(formDataTable.length / input.row);
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

    // Update form dataTable for event search
    React.useEffect(() => {
        const { search, dataTable } = form.watch();

        if (search) {
            const searchResult = dataTable.filter(
                (item: any) =>
                    item?.username?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()) ||
                    item?.name?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()) ||
                    item?.email?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()) ||
                    item?.google_id?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()) ||
                    item?.coin?.toString()?.includes(search.toString()) ||
                    item?.point?.toString()?.includes(search.toString())
            );

            form.setValue('dataTable', searchResult);
        } else {
            form.setValue('dataTable', dummyData);
        }
    }, [form.watch('search')]);

    // Event filter by is_active
    const handleFilter = () => {
        form.setValue('dataTable', dummyData);
        const { filterActive, dataTable } = form.watch();
        const filterResult = dataTable.filter((item: any) => {
            if (filterActive) {
                return item?.is_active;
            }
            return !item?.is_active;
        });
        form.setValue('dataTable', filterResult);
        setOpenFilter(false);
    };

    // Event Reset filter
    const handleResetFilter = () => {
        form.setValue('dataTable', dummyData);
        setOpenFilter(false);
    };

    return (
        <Box>
            <HeaderChildren title='Player Account' subTitle='Additional description if required'>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box mt='27px' display='flex' alignItems='center' position='relative'>
                        <InputSearch name='search' label='Search' placeholder='Search by name, code, etc.' form={form} />
                        <IconButton sx={{ ml: '35px' }} onClick={() => setOpenFilter(!openFilter)}>
                            <FilterListIcon />
                        </IconButton>
                        <Box position='absolute' left='315px' top='57px'>
                            <FilterPlayerAccount
                                open={openFilter}
                                setOpen={setOpenFilter}
                                form={form}
                                nameActive='filterActive'
                                onFilter={handleFilter}
                                onReset={handleResetFilter}
                            />
                        </Box>
                    </Box>
                    <ButtonBase sx={{ padding: '10px 16px', color: '#fff', bgcolor: '#A54CE5', borderRadius: '4px', fontSize: '14px' }}>
                        DOWNLOAD EXCEL
                    </ButtonBase>
                </Box>
            </HeaderChildren>
            {totalChecked ? (
                <Box mt={5}>
                    <BadgeSelected total={totalChecked} handleOpenBan={() => setDialogBanAccount(true)} />
                </Box>
            ) : null}
            <Box mt='30px'>
                <TablePlayerAccount form={form} name='dataTable' nameIdxAppears='idxAppears' />
                <PaginationCard
                    totalItem={formDataTable.length}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    form={form}
                    nameRow='row'
                    namePage='page'
                />
            </Box>
            <DialogConfirmation
                title='Are you sure ban this account?'
                subTitle={`${totalChecked} Selected`}
                handleConfirm={handleBanAccount}
                open={dialogBanAccount}
                setOpen={setDialogBanAccount}
                textConfirmButton='REMOVE'
                textCancelButton='CANCEL'
            />
            <DialogSuccess title='Success Remove Account' open={dialogSuccessDel} setOpen={setDialogSuccessDel} />
        </Box>
    );
};

export default PlayerAccount;
