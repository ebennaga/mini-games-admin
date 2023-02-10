import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { getEndDdate, getPastDate, getStartDate } from 'utils/date';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import HeaderReconcile from './HeaderReconcile';
import Table from './Table';

const Reconcile = () => {
    const dataDate = [
        { name: 'orderDate', type: 'date', label: 'order Date' },
        { name: 'orderTime', type: 'time', label: 'order Time' },
        { name: 'transactionDate', type: 'date', label: 'Transaction Date' },
        { name: 'transactionTime', type: 'time', label: 'Transaction Time' }
    ];

    const fieldTable = [
        'No.',
        'User Id',
        'Email',
        'Order Id',
        'Order Time',
        'Order Amount',
        'Transaction Id',
        'Bank',
        'Transaction Time',
        'Gross Amount',
        'Transaction Status',
        'Settlement Time'
    ];

    const [dataTable, setDataTable] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const timeOption: any = { hour: '2-digit', minute: '2-digit', hour12: false };

    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            minDate: getStartDate(),
            maxDate: getEndDdate(),
            orderDate: '',
            transactionDate: '',
            orderTime: '',
            transactionTime: '',
            row: 5,
            page: 1,
            dataTable
        }
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({ method: 'GET', endpoint: 'reconciles' });
            if (response.status === 200) {
                setDataTable(response.data.data);
                form.setValue('dataTable', response.data.data);
            } else {
                throw new Error(response.data.message);
            }
            // setIsLoading(false);
        } catch (err: any) {
            notify(err.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        const input = form.watch();
        if (input.orderDate !== getPastDate(5, true)) {
            form.setValue('minDate', input.orderDate);
        }
        if (input.transactionDate !== new Date().toISOString().slice(0, 10)) {
            form.setValue('maxDate', input.transactionDate);
        }
    }, [form.watch('orderDate'), form.watch('transactionDate')]);

    const handleDownloadExcel = async (fields: any, array: any) => {
        let csvStr = `${fields.join(',')}\n`;

        array.forEach((element: any) => {
            const {
                id,
                user: { id: userId, email },
                orderId,
                orderTime,
                orderAmount,
                transactionId,
                bank,
                transactionTime,
                grossAmount,
                transactionStatus,
                settlementTime
            } = element;

            csvStr += `${id},${userId},${email},${orderId},${orderTime},${orderAmount},${transactionId},${bank},${transactionTime},${grossAmount},${transactionStatus},${settlementTime}\n`;
        });

        const hiddenElement = document.createElement('a');
        hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csvStr)}`;
        hiddenElement.target = '_blank';
        hiddenElement.download = 'output.csv';
        hiddenElement.click();
    };

    const handleGetData = () => {
        const { minDate, maxDate } = form.watch();
        const table: any = dataTable;
        let resFilter: Array<any> = [];

        if (minDate) {
            const arr = resFilter.length > 0 ? resFilter : table;
            const keyDate: any = new Date(minDate).toLocaleString('id').slice(0, 10);
            resFilter = [
                ...arr.filter((item: any) => {
                    const valueItem: any = new Date(item.orderTime).toLocaleString('id').slice(0, 10);
                    return valueItem >= keyDate;
                })
            ];
        }
        if (maxDate) {
            const arr = resFilter.length > 0 ? resFilter : table;
            const keyDate: any = new Date(maxDate).toLocaleString('id').slice(0, 10);
            resFilter = [
                ...arr.filter((item: any) => {
                    const valueItem: any = new Date(item.orderTime).toLocaleString('id').slice(0, 10);
                    return valueItem <= keyDate;
                })
            ];
        }
        if (!minDate && !maxDate) {
            resFilter = table;
        }

        form.setValue('dataTable', resFilter);
        form.setValue('row', 5);
        form.setValue('page', 1);
    };

    const handleFilter = (data: any, tabsValue: 'all' | 'latest' | 'oldest') => {
        let result: Array<any> = [];
        const table = dataTable;
        const { orderDate, orderTime, transactionDate, transactionTime } = data;

        if (orderDate) {
            const arr = result.length > 0 ? result : table;
            result = [
                ...arr.filter((item: any) => {
                    const value: any = new Date(item.orderTime).toLocaleString('id').slice(0, 10);
                    const filter: any = new Date(orderDate).toLocaleString('id').slice(0, 10);
                    return value === filter;
                })
            ];
        }
        if (transactionDate) {
            const arr = result.length > 0 ? result : table;
            result = [
                ...arr.filter((item: any) => {
                    const value: any = new Date(item.transactionTime).toLocaleString('id').slice(0, 10);
                    const filter: any = new Date(transactionDate).toLocaleString('id').slice(0, 10);
                    return value === filter;
                })
            ];
        }
        if (orderTime) {
            const arr = result.length > 0 ? result : table;
            result = [
                ...arr.filter((item: any) => {
                    const valueTime = new Date(item.orderTime).toLocaleString('ca', timeOption);
                    return valueTime === orderTime;
                })
            ];
        }
        if (transactionTime) {
            const arr = result.length > 0 ? result : table;
            result = [
                ...arr.filter((item: any) => {
                    const valueTime = new Date(item.transactionTime).toLocaleString('ca', timeOption);
                    return valueTime === transactionTime;
                })
            ];
        }
        if (!orderDate && !orderTime && !transactionDate && !transactionTime) {
            result = [...table];
        }

        result = [
            ...result.sort((a: any, b: any) => {
                const first: any = new Date(a.orderTime);
                const second: any = new Date(b.orderTime);
                if (tabsValue === 'latest') return first - second;
                if (tabsValue === 'oldest') return second - first;
                return first;
            })
        ];

        form.setValue('dataTable', result);
        form.setValue('page', 1);
        form.setValue('row', 5);
    };

    const handleResetFilter = () => {
        form.setValue('dataTable', dataTable);
        form.setValue('minDate', getStartDate());
        form.setValue('maxDate', getEndDdate());
        form.setValue('page', 1);
        form.setValue('row', 5);
        form.setValue('orderDate', '');
        form.setValue('orderTime', '');
        form.setValue('transactionDate', '');
        form.setValue('transactionTime', '');
    };

    return (
        <Box>
            <HeaderReconcile
                dataDate={dataDate}
                form={form}
                handleGetData={handleGetData}
                handleDownload={() => handleDownloadExcel(fieldTable, form.watch('dataTable'))}
                handleFilter={handleFilter}
                handleReset={handleResetFilter}
                isLoading={isLoading}
            />
            {isLoading ? (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {/* <CircularProgress size={100} color='secondary' /> */}
                    {[...Array(6)].map((item: any, index: number) => (
                        <Skeleton variant='rounded' width='100%' height='60px' key={index} sx={{ mt: '15px' }} />
                    ))}
                </Box>
            ) : (
                <Table dataTable={form.watch('dataTable')} namePage='page' nameRow='row' form={form} isLoading={isLoading} />
            )}
        </Box>
    );
};

export default Reconcile;
