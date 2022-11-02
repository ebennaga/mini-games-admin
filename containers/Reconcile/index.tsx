/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { getCurrentDate, getPastDate } from 'utils/date';
import { useForm } from 'react-hook-form';
import DateResult from './DateResult';
import HeaderReconcile from './HeaderReconcile';

const Reconcile = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            minDate: getPastDate(5),
            maxDate: getCurrentDate()
        }
    });

    return (
        <Box>
            <HeaderReconcile form={form} handleGetData={undefined} />
        </Box>
    );
};

export default Reconcile;
