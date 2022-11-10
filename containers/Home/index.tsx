import { Box } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import React from 'react';
import ChartSpline from './ChartSpline';

const Home = () => {
    const dataChart = [
        { id: 1, color: '#F16063', label: 'Console', value: [15, 39, 30, 41, 23, 18, 20, 25, 26, 35] },
        { id: 2, color: '#F9D14B', label: 'Laptop', value: [0, 5, 10, 30, 10, 35, 30, 31, 28, 22] },
        { id: 3, color: '#664EAB', label: 'Voucher', value: [10, 11, 15, 9, 12, 20, 25, 15, 11, 30] },
        { id: 4, color: '#1BA95D', label: 'Hp', value: [30, 35, 40, 50, 51, 52, 53, 55, 50, 50] }
    ];
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];

    return (
        <Box>
            <HeaderChildren title='Dashboard' subTitle='Additional description if required'>
                {' '}
            </HeaderChildren>
            <ChartSpline dataChart={dataChart} labels={labels} />
        </Box>
    );
};

export default Home;
