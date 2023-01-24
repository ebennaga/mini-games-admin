/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { useForm } from 'react-hook-form';
import PaginationCard from 'components/PaginationCard';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import DialogSuccess from 'components/Dialog/DialogSuccess';
import { useRouter } from 'next/router';
import TitleCard from 'components/Layout/TitleCard';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import dataTable from 'containers/AddTournament/dataSelect';
import TableGames from './TableGames';
import DialogFilter from './DialogFilter';

const Games = () => {
    const dataSelect = [
        { id: 1, title: 'Arcade' },
        { id: 2, title: 'Adventure' },
        { id: 3, title: 'RPG' },
        { id: 4, title: 'Racing' }
    ];

    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [openDeleteDialog, setOpendDeleteDialog] = React.useState<boolean>(false);
    const [openDialogSuccess, setOpenDialogSuccess] = React.useState<boolean>(false);
    const [listTable, setListTable] = React.useState<any>([]);
    const [query, setQuery] = React.useState('');
    const [data, setData] = React.useState<Array<any>>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [deleted, setDeleted] = React.useState<number[]>([]);
    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            dataTable: listTable,
            search: '',
            row: 5,
            page: 1,
            select: ''
        }
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: 'games'
            });

            if (response.status === 200) {
                setData(response.data.data);
                setListTable(response.data.data);
                setIsLoading(false);
            } else {
                notify(response.message, 'error');
                setIsLoading(false);
            }
        } catch (err: any) {
            notify(err.message);
        }
        setIsLoading(false);
    };
    // console.log('datatable', form.watch('dataTable'));
    const handleRemove = async (id: number) => {
        try {
            const table = form.watch('dataTable');

            table.map(async (item: any) => {
                if (item.isAction) {
                    const response = await fetchAPI({
                        endpoint: `games/${item.id}`,
                        method: 'DELETE'
                    });
                    if (response.status === 200) {
                        notify(response.data.message, 'success');
                        await fetchData();
                        setOpendDeleteDialog(false);
                        setOpenDialogSuccess(true);
                    }
                }
            });
        } catch (err: any) {
            notify(err.message, 'error');
        }
    };
    const handleEdit = (id: number) => {
        router.push(`/games/${id}`);
    };

    const handleOpenDeleteDialog = () => {
        setOpendDeleteDialog(true);
    };

    const handleRemoveGame = () => {
        deleted.forEach((item: any) => {
            handleRemove(item);
        });

        const filter = data.filter((item: any) => {
            return !deleted.includes(item.id);
        });

        setData(filter);
        setOpendDeleteDialog(false);
        setOpenDialogSuccess(true);
    };

    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(form.watch('dataTable').length / input.row);
        if (input.page < totalPage) {
            form.setValue('page', input.page + 1);
        }
    };

    const handlePrev = () => {
        const input = form.watch();
        if (input.page > 1) {
            form.setValue('page', input.page - 1);
        }
    };
    const handleDialog = (value: boolean) => {
        setOpenDialog(value);
    };
    const handleDataSearch = (keyword: any) => {
        setQuery(keyword);
    };

    const handleReset = () => {
        form.setValue('dataTable', data);
        form.setValue('page', 1);
    };

    const sorting = (arr: any[], type: 'asc' | 'desc') => {
        const res = arr.sort((a: any, b: any) => {
            const first: any = new Date(a.created_at);
            const second: any = new Date(b.created_at);
            if (type === 'asc') {
                return first - second;
            }
            return second - first;
        });
        return res;
    };

    const handleFilter = (value: 'all' | 'latest' | 'oldest') => {
        const selectId = form.watch('select');

        if (selectId === '') {
            if (value === 'latest') {
                const res = sorting(listTable, 'asc');
                form.setValue('dataTable', res);
            } else if (value === 'oldest') {
                const res = sorting(listTable, 'desc');
                form.setValue('dataTable', res);
            } else {
                form.setValue('dataTable', data);
            }
            form.setValue('page', 1);
        } else {
            const valueSelect: string = dataSelect.filter((item: any) => item.id === selectId)[0].title;
            const filterData = listTable.filter((item: any) => item?.genre?.toLowerCase()?.includes(valueSelect.toLocaleLowerCase()));

            if (value === 'latest') {
                const res = sorting(filterData, 'asc');
                form.setValue('dataTable', res);
            } else if (value === 'oldest') {
                const res = sorting(filterData, 'desc');
                form.setValue('dataTable', res);
            } else {
                form.setValue('dataTable', filterData);
            }
            form.setValue('page', 1);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        // eslint-disable-next-line consistent-return, array-callback-return
        const temp = data.filter((post: any) => {
            if (query === '') {
                return post;
            }
            if (
                post?.genre?.toString()?.toLowerCase()?.includes(query?.toLowerCase()) ||
                post?.name?.toLowerCase()?.includes(query?.toLowerCase())
            ) {
                return post;
            }
        });
        setListTable(temp);
        form.setValue('dataTable', temp);
        form.setValue('page', 1);
    }, [query, data]);

    return (
        <Box>
            <TitleCard
                handleSearch={(keyword: any) => handleDataSearch(keyword)}
                onConfirm={(value: boolean) => handleDialog(value)}
                title='Games'
                subtitle='Addtional description if required'
                isSearchExist
                placeholderSeacrhText='Search by tittle, genre, etc.'
                href='/games/add-game'
            />
            <Box position='absolute' top='236px' left='601px'>
                <DialogFilter
                    handleFilter={(value) => handleFilter(value)}
                    handleReset={handleReset}
                    dataSelect={dataSelect}
                    nameSelect='select'
                    open={openDialog}
                    setOpen={setOpenDialog}
                    form={form}
                />
            </Box>
            <Box>
                {isLoading ? (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {/* <CircularProgress size={100} color='secondary' /> */}
                        {[...Array(6)].map((item: any, index: number) => (
                            <Skeleton variant='rounded' width='100%' height='60px' key={index} sx={{ mt: '15px' }} />
                        ))}
                    </Box>
                ) : (
                    <TableGames
                        // isLoading={isLoading}
                        namePage='page'
                        nameRow='row'
                        name='dataTable'
                        form={form}
                        onEdit={(id: number) => handleEdit(id)}
                        handleOpenDeleteDialog={handleOpenDeleteDialog}
                    />
                )}

                <PaginationCard
                    totalItem={form.watch('dataTable').length}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    form={form}
                    nameRow='row'
                    namePage='page'
                />
            </Box>
            <DialogConfirmation
                title='Are you sure remove this games?'
                subTitle={`${form.watch('dataTable').filter((item: any) => item.isAction).length} Selected`}
                handleConfirm={handleRemove}
                open={openDeleteDialog}
                setOpen={setOpendDeleteDialog}
                textConfirmButton='REMOVE'
                textCancelButton='CANCEL'
            />
            <DialogSuccess title='Sucess Remove Account' open={openDialogSuccess} setOpen={setOpenDialogSuccess} />
        </Box>
    );
};

export default Games;
