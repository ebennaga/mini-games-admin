import React from 'react';
import { Container, Box, Typography, ButtonBase, Paper } from '@mui/material';
import Search from 'components/Search';
import { useForm } from 'react-hook-form';
// import TableExchange from 'components/Table/TableExchange';
import { useRouter } from 'next/router';
import PaginationCard from 'components/PaginationCard';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import TableExchange from './TableExchange';
import LoadingExchangeRates from './LoadingExchangeRates';

const ExchangeRates = () => {
    const [isLoading, setIsloading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<Array<any>>([]);

    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const handleSearch = async () => {
        console.log('done');
    };

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

    // Event Next page
    const handleNext = () => {
        const input: any = form.watch();
        const totalPage = Math.ceil(data.length / input.row);
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

    // Get Data
    const getData = async () => {
        setIsloading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: 'exchange-rates'
            });

            if (response.status === 200) {
                const resData = response.data.data.sort((a: any, b: any) => a.id - b.id);
                setData(resData);
                form.setValue('dataTable', resData);
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsloading(false);
    };

    React.useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return <LoadingExchangeRates />;
    }
    return (
        <Container sx={{ mt: 12 }}>
            <Box sx={{ ml: -25, height: 120 }} component={Paper}>
                <Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ fontSize: '24px' }}>Exchange Rates</Typography>
                        <Typography sx={{ fontSize: '14px' }}>Additional description if required</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center', ml: 2, direction: 'row' }}>
                        <Search name='search' form={form} placeholder='search by coins' onSubmit={handleSearch} />
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
            <Box sx={{ ml: -25, mt: 3 }}>
                {/* <TableExchange /> */}
                <TableExchange form={form} name='dataTable' nameIdxAppears='idxAppears' />
            </Box>
            <PaginationCard
                totalItem={data.length}
                handleNext={handleNext}
                handlePrev={handlePrev}
                form={form}
                nameRow='row'
                namePage='page'
            />
        </Container>
    );
};

export default ExchangeRates;
