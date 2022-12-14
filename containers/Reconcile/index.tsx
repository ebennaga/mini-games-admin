import React from 'react';
import { Box } from '@mui/material';
import { getCurrentTime, getEndDdate, getPastDate, getStartDate } from 'utils/date';
import { useForm } from 'react-hook-form';
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
    const dummyTable = [
        {
            id: 1,
            userId: 18,
            email: 'test@mail.com',
            orderId: 'SAMPEL_20221024_001',
            orderTime: '2022-12-24T17:01:00.000Z',
            orderAmount: '10000',
            transactionId: '57d5293c-e65f-4a29-95e4-5959c3fa335b',
            bank: 'BCA',
            transactionTime: '2022-12-20T17:01:00.000Z',
            grossAmount: '10000.00',
            transactionStatus: 'Settlement',
            settlementTime: '2022-12-20T17:01:00.000Z'
        },
        {
            id: 2,
            userId: 19,
            email: 'allright@mail.com',
            orderId: 'SAMPEL_20221024_001',
            orderTime: '2022-12-13T17:00:00.000Z',
            orderAmount: '10000',
            transactionId: '57d5293c-e65f-4a29-95e4-5959c3fa335b',
            bank: 'BCA',
            transactionTime: '2022-12-09T17:00:00.000Z',
            grossAmount: '10000.00',
            transactionStatus: 'Settlement',
            settlementTime: '2022-12-20T17:01:00.000Z'
        },
        {
            id: 3,
            userId: 20,
            email: 'test@mail.com',
            orderId: 'SAMPEL_20221024_001',
            orderTime: '2022-12-29T17:00:00.000Z',
            orderAmount: '10000',
            transactionId: '57d5293c-e65f-4a29-95e4-5959c3fa335b',
            bank: 'BCA',
            transactionTime: '2022-12-25T17:00:00.000Z',
            grossAmount: '10000.00',
            transactionStatus: 'Settlement',
            settlementTime: '2022-12-20T17:01:00.000Z'
        }
    ];

    const form = useForm({
        mode: 'all',
        defaultValues: {
            minDate: getStartDate(),
            maxDate: getEndDdate(),
            orderDate: getPastDate(5, true),
            transactionDate: new Date().toISOString().slice(0, 10) || '',
            orderTime: getCurrentTime(),
            transactionTime: getCurrentTime(),
            row: 5,
            page: 1,
            dataTable: dummyTable
        }
    });

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
                userId,
                email,
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
        const table: any = dummyTable;

        const filter = table.map((item: any) => {
            if (
                new Date(item.orderTime).toISOString().slice(0, 10) >= new Date(minDate).toISOString().slice(0, 10) &&
                new Date(item.orderTime).toISOString().slice(0, 10) <= new Date(maxDate).toISOString().slice(0, 10)
            ) {
                return item;
            }
            return null;
        });
        const resFilter = filter.filter((item: any) => item);
        form.setValue('dataTable', resFilter);
    };

    const handleFilter = (data: any, tabsValue: 'all' | 'latest' | 'oldest') => {
        if (tabsValue === 'all') {
            const { orderDate, orderTime, transactionDate, transactionTime } = data;
            const order = new Date(`${orderDate} ${orderTime}`).toISOString();
            const transaction = new Date(`${transactionDate} ${transactionTime}`).toISOString();

            const filter = dummyTable.filter(
                (item: any) =>
                    new Date(item.orderTime).toISOString() === order && new Date(item.transactionTime).toISOString() === transaction
            );

            form.setValue('dataTable', filter);
        } else if (tabsValue === 'latest') {
            const sort = dummyTable.sort((a: any, b: any) => {
                const first: any = new Date(a.orderTime);
                const second: any = new Date(b.orderTime);
                return first - second;
            });
            form.setValue('dataTable', sort);
        } else if (tabsValue === 'oldest') {
            const sort = dummyTable.sort((a: any, b: any) => {
                const first: any = new Date(a.orderTime);
                const second: any = new Date(b.orderTime);
                return second - first;
            });
            form.setValue('dataTable', sort);
        }
    };

    return (
        <Box>
            <HeaderReconcile
                dataDate={dataDate}
                form={form}
                handleGetData={handleGetData}
                handleDownload={() => handleDownloadExcel(fieldTable, form.watch('dataTable'))}
                handleFilter={handleFilter}
                // handleDownload={handleDownloadExcel}
            />
            <Table dataTable={form.watch('dataTable')} namePage='page' nameRow='row' form={form} />
        </Box>
    );
};

export default Reconcile;
