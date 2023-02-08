import React from 'react';
import { Container, Box, Typography, ButtonBase, Paper, Skeleton } from '@mui/material';
import Search from 'components/Search';
import { useForm } from 'react-hook-form';
// import TableExchange from 'components/Table/TableExchange';
import { useRouter } from 'next/router';
import PaginationCard from 'components/PaginationCard';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
// import dataTable from 'containers/AddTournament/dataSelect';
import TableExchange from './TableExchange';
// import LoadingExchangeRates from './LoadingExchangeRates';

const ExchangeRates = () => {
    const [isLoading, setIsloading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<Array<any>>([]);
    const [dataSearch, setDataSearch] = React.useState<any>(null);
    const [totalChecked, setTotalChecked] = React.useState<number>(0);
    const [openDialogConfirm, setOpenDialogConfirm] = React.useState<boolean>(false);

    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            idxAppears: { startIndex: 0, endIndex: 5 },
            dataTable: data,
            page: 1,
            row: 5
        }
    });

    // Event search
    const handleSearch = async (input: any) => {
        const { search } = input;
        if (search) {
            const filter = data.filter((item: any) => item.coin === Number(search));
            setDataSearch(filter);
            form.setValue('dataTable', filter);
        } else {
            setDataSearch(null);
            form.setValue('dataTable', data);
        }
    };

    // Event Next page
    const handleNext = () => {
        const input: any = form.watch();
        const resData = dataSearch || data;
        const totalPage = Math.ceil(resData.length / input.row);
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

    // Event Remove Rate
    const handleRemove = () => {
        notify('Remove Rate Successfull!');
        setOpenDialogConfirm(false);
    };

    // Event edit item
    const handleEdit = () => {
        const table: any = form.watch('dataTable');
        const filter = table.filter((item: any) => item.isAction);
        router.push(`/exchange-rates/${filter[0].id}/`);
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

    // Get Data
    const getData = async () => {
        setIsloading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: 'exchange-rates'
            });

            if (response.status === 200) {
                const resData = response.data.data.sort((a: any, b: any) => a.coin - b.coin);
                setData(resData);
                form.setValue('dataTable', resData);
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsloading(false);
    };

    // component did mount get data
    React.useEffect(() => {
        getData();
    }, []);

    // Read total of checked items
    React.useEffect(() => {
        const dataInput = form.watch('dataTable');
        const countItems = dataInput.filter((item: any) => item.isAction).length;
        setTotalChecked(countItems);
    }, [form.watch('dataTable')]);

    // if (isLoading) {
    //     return <LoadingExchangeRates />;
    // }

    return (
        <Container sx={{ mt: 12 }}>
            <Box sx={{ ml: -15, height: 120 }} component={Paper}>
                <Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ fontSize: '24px' }}>Exchange Rates</Typography>
                        <Typography sx={{ fontSize: '14px' }}>Additional description if required</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center', ml: 2, direction: 'row' }}>
                        <Search
                            type='number'
                            name='search'
                            form={form}
                            placeholder='search by coins'
                            onSubmit={(i: any) => handleSearch(i)}
                        />
                        <ButtonBase
                            onClick={() => router.push('/exchange-rates-add')}
                            sx={{
                                width: '121px',
                                height: '36px',
                                backgroundColor: '#A54CE5',
                                borderRadius: '4px',
                                mr: 1,
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)'
                            }}
                        >
                            <Typography sx={{ fontSize: '14px', color: '#ffffff' }}>Create New</Typography>
                        </ButtonBase>
                    </Box>
                </Box>
            </Box>
            {totalChecked > 0 && (
                <Box sx={{ ml: -25, mt: 3 }}>
                    <BadgeSelected
                        total={totalChecked}
                        handleOpenDeleteDialog={() => setOpenDialogConfirm(true)}
                        onEdit={totalChecked === 1 ? handleEdit : false}
                    />
                </Box>
            )}
            <Box sx={{ ml: -15, mt: 3 }}>
                {/* <TableExchange /> */}
                {isLoading ? (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {/* <CircularProgress size={100} color='secondary' /> */}
                        {[...Array(6)].map((item: any, index: number) => (
                            <Skeleton variant='rounded' width='100%' height='60px' key={index} sx={{ mt: '15px' }} />
                        ))}
                    </Box>
                ) : (
                    <TableExchange form={form} name='dataTable' nameIdxAppears='idxAppears' />
                )}
            </Box>
            <PaginationCard
                totalItem={dataSearch ? dataSearch.length : data.length}
                handleNext={handleNext}
                handlePrev={handlePrev}
                form={form}
                nameRow='row'
                namePage='page'
            />
            <DialogConfirmation
                title='Are you sure remove this Rate?'
                subTitle={`${totalChecked} Selected`}
                handleConfirm={handleRemove}
                open={openDialogConfirm}
                setOpen={setOpenDialogConfirm}
                textConfirmButton='REMOVE'
                textCancelButton='CANCEL'
            />
        </Container>
    );
};

export default ExchangeRates;
