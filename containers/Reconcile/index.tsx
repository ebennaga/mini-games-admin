import React from 'react';
import { Box } from '@mui/material';
import { getCurrentDate, getCurrentTime, getPastDate } from 'utils/date';
import { useForm } from 'react-hook-form';
import HeaderReconcile from './HeaderReconcile';
import Table from './Table';

const Reconcile = () => {
    const dataDate = [
        { name: 'olderDate', type: 'date', label: 'Older Date' },
        { name: 'olderTime', type: 'time', label: 'Older Time' },
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
    const dataTable = [
        {
            id: 1,
            userId: 18,
            email: 'test@mail.com',
            orderId: 'SAMPEL_20221024_001',
            orderTime: '2022-10-24 15:30:44',
            orderAmount: '10000',
            transactionId: '57d5293c-e65f-4a29-95e4-5959c3fa335b',
            bank: 'BCA',
            transactionTime: '2022-10-20 15:30:44',
            grossAmount: '10000.00',
            transactionStatus: 'Settlement',
            settlementTime: '2022-10-24 15:30:44'
        }
    ];

    const form = useForm({
        mode: 'all',
        defaultValues: {
            minDate: getPastDate(5),
            maxDate: getCurrentDate(),
            olderDate: getPastDate(5, true),
            transactionDate: new Date().toISOString().slice(0, 10) || '',
            olderTime: getCurrentTime(),
            transactionTime: getCurrentTime()
        }
    });

    React.useEffect(() => {
        const input = form.watch();
        if (input.olderDate) {
            form.setValue('minDate', input.olderDate);
        }
        if (input.transactionDate) {
            form.setValue('maxDate', input.transactionDate);
        }
    }, [form.watch('olderDate'), form.watch('transactionDate')]);

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

    return (
        <Box>
            <HeaderReconcile
                dataDate={dataDate}
                form={form}
                handleGetData={undefined}
                handleDownload={() => handleDownloadExcel(fieldTable, dataTable)}
                // handleDownload={handleDownloadExcel}
            />
            <Table dataTable={dataTable} />
        </Box>
    );
};

export default Reconcile;
