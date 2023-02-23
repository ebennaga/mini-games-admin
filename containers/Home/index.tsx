/* eslint-disable no-unused-vars */
import { Box, ButtonBase, Grid, Skeleton, Tab, Tabs } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import React, { useEffect } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import InputStartEndDate from 'components/Input/InputStartEndDate';
import { useForm } from 'react-hook-form';
import { getEndDdate, getStartDate } from 'utils/date';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import getRandomColor from 'helpers/getRandomColor';
import ChartBar from './ChartBar';
import ChartDoughnut from './ChartDoughnut';
import ChartSpline from './ChartSpline';

interface chartLineI {
    labels: string[];
    dataChart: any[];
}

const Home = () => {
    const router = useRouter();
    const dataChart = [
        { id: 1, color: '#F16063', label: 'Console', value: [15, 39, 30, 41, 23, 18, 20, 25, 26, 35] },
        { id: 2, color: '#F9D14B', label: 'Laptop', value: [0, 5, 10, 30, 10, 35, 30, 31, 28, 22] },
        { id: 3, color: '#664EAB', label: 'Voucher', value: [10, 11, 15, 9, 12, 20, 25, 15, 11, 30] },
        { id: 4, color: '#1BA95D', label: 'Hp', value: [30, 35, 40, 50, 51, 52, 53, 55, 50, 50] },
        { id: 5, color: '#5C79E3', label: 'Accessories', value: [12, 20, 19, 25, 25, 30, 21, 10, 14, 30] }
    ];
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];

    const dataChartDoughnut = [
        { id: 3, label: 'Voucher', color: '#664EAB', value: 25 },
        { id: 1, label: 'Console', color: '#8F67FF', value: 37.5 },
        { id: 2, label: 'Laptop', color: '#A586FF', value: 10 },
        { id: 4, label: 'Hp', color: '#BBAAF0', value: 15 },
        { id: 5, label: 'Accessories', color: '#F1EDFF', value: 12.5 }
    ];

    /* Format data chart bar
    const dataChartBar = [
        { id: 1, label: 'Tournament Hop Up 1', value: 450, color: '#A54CE5' },
        { id: 2, label: 'Tournament Rose Dart 1', value: 185, color: '#A54CE5' }
    ]; */

    /* Format data chart doughnut
    const dataChartDoughnut2 = [
        { id: 3, label: 'Hop Up', color: '#664EAB', value: 58 },
        { id: 1, label: 'Tower Stacks', color: '#8F67FF', value: 22 }
    ]; */

    const userState = useSelector((state: any) => state.webpage?.user?.user);

    const [tabChartSpline, setTabChartSpline] = React.useState<string>('0');
    const [tabChartDoughnut, setTabChartDoughnut] = React.useState<string>('0');
    const [tabChartBar, setTabChartBar] = React.useState<string>('0');
    const [tabChartDoughnut2, setTabChartDoughnut2] = React.useState<string>('0');

    // state loading fetch data
    const [loadingChartBar, setLoadingChartBar] = React.useState(true);
    const [loadingChartLine, setLoadingChartLine] = React.useState<boolean>(false);
    const [loadingChartDoughnutTop, setLoadingChartDoughnutTop] = React.useState<boolean>(false);
    const [loadingChartDoughnutBottom, setLoadingChartDoughnutBottom] = React.useState<boolean>(true);

    // state for data chart
    const [chartLine, setChartLine] = React.useState<chartLineI>({ labels, dataChart });
    const [chartBar, setChartBar] = React.useState<Array<any>>([]);
    const [chartDoughnutBottom, setChartDoughtnurBottom] = React.useState<Array<any>>([]);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            startDate: '',
            endDate: ''
        }
    });

    // Fetch data chart lines
    const fetchChartLines = async (endpoint: 'most-redeemed-prizes' | 'expected-game-types' | 'tournament-played') => {
        setLoadingChartLine(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: `dashboard/lines/${endpoint}`
            });

            if (response.status === 200) {
                notify(`${response.data.message}oke`, 'success');
                let resultLabels: string[] = [];
                const resultData = response.data.data.map((item: any, index: number) => {
                    const { key, values, datas } = item;
                    const color = getRandomColor();
                    const data = { id: index, color, label: key, value: [values] };
                    const month = months[new Date(datas?.dates).getMonth()];
                    resultLabels = [...resultLabels, month];
                    return data;
                });
                console.log('response chart line', resultData, resultLabels);
            }
        } catch (err: any) {
            notify(`${err.message} error nih`, 'error');
        }
        setLoadingChartLine(false);
    };

    // Fetch data Chart Bar tournament played
    const fetchChartBar = async () => {
        setLoadingChartBar(true);
        try {
            const response = await fetchAPI({
                endpoint: 'dashboard/columns/tournament-played'
            });
            if (response.status === 200) {
                const result = response.data.data.map((item: any, index: number) => {
                    const {
                        datas: { values },
                        key
                    } = item;
                    return { id: index, label: key, value: values, color: '#A54CE5' };
                });
                setChartBar(result);
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setLoadingChartBar(false);
    };

    // Fetch data chart doughnut bottom (casual & tournament players)
    const fetchChartDoughtnutBottom = async (endpoint: 'tournament-players' | 'casual-players') => {
        setLoadingChartDoughnutBottom(true);
        try {
            const response = await fetchAPI({
                endpoint: `dashboard/doughnuts/${endpoint}`
            });
            if (response.status === 200) {
                const result = response.data.data.map((item: any, index: number) => {
                    const {
                        datas: { values },
                        key
                    } = item;
                    const color = `rgba(165, 76, 229, ${10 - index})`;
                    return { id: index, label: key, color, value: values };
                });
                setChartDoughtnurBottom(result);
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setLoadingChartDoughnutBottom(false);
    };

    // Event change tab chart line
    const handleChangeTabSpline = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartSpline(newValue);
        if (newValue === '0') {
            fetchChartLines('most-redeemed-prizes');
        } else if (newValue === '1') {
            fetchChartLines('expected-game-types');
        } else {
            fetchChartLines('tournament-played');
        }
    };

    const handleChangeTabDoughnut = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartDoughnut(newValue);
    };

    const handleChangeTabBar = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartBar(newValue);
    };

    // Event change tab chart doughnut bottom
    const handleChangeTabDoughnut2 = (e: React.SyntheticEvent, newValue: string) => {
        if (newValue === '0') {
            fetchChartDoughtnutBottom('casual-players');
        } else {
            fetchChartDoughtnutBottom('tournament-players');
        }
        setTabChartDoughnut2(newValue);
    };

    React.useEffect(() => {
        const getAllData = async () => {
            await fetchChartLines('tournament-played');
            await fetchChartBar();
            await fetchChartDoughtnutBottom('casual-players');
        };
        getAllData();
    }, []);

    useEffect(() => {
        if (!userState) {
            router.push('/sign-in');
        }
    }, []);

    return (
        <Box>
            <HeaderChildren title='Dashboard' subTitle='Additional description if required'>
                <Box display='flex' alignItems='center' justifyContent='space-between' mt={3}>
                    <Box display='flex' alignItems='center' gap='20px'>
                        <InputStartEndDate label='Date' nameStartDate='startDate' nameEndDate='endDate' form={form} />
                        <ButtonBase
                            // onClick={handleGetData}
                            sx={{ background: '#A54CE5', color: '#fff', padding: '12px 22px', borderRadius: '4px', mt: '7px' }}
                        >
                            GET DATA
                        </ButtonBase>
                    </Box>
                    <ButtonBase
                        // onClick={handleDownload}
                        sx={{
                            borderRadius: '4px',
                            background: '#A54CE5',
                            color: '#fff',
                            padding: '6px 16px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <DownloadIcon sx={{ mr: 1 }} />
                        <span>DOWNLOAD EXCEL</span>
                    </ButtonBase>
                </Box>
            </HeaderChildren>
            <Grid container>
                <Grid item xs={7} mt='30px' pr={5}>
                    <Box
                        padding='30px 59px'
                        boxShadow='0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'
                        borderRadius='4px'
                    >
                        <Tabs
                            value={tabChartSpline}
                            onChange={handleChangeTabSpline}
                            sx={{
                                mb: '30px',
                                '& .MuiTabs-flexContainer': {
                                    px: 5,
                                    justifyContent: 'space-between'
                                },
                                '& .Mui-selected': { color: '#A54CE5 !important' },
                                '& .css-1aquho2-MuiTabs-indicator': { bgcolor: '#A54CE5' }
                            }}
                        >
                            <Tab label='Most Reedemed Prizes' value='0' sx={{ fontSize: '14px', fontWeight: 600 }} />
                            <Tab label='expected games type' value='1' sx={{ fontSize: '14px', fontWeight: 600 }} />
                            <Tab label='tournament played' value='2' sx={{ fontSize: '14px', fontWeight: 600 }} />
                        </Tabs>
                        <ChartSpline dataChart={dataChart} labels={labels} />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={5}
                    mt='30px'
                    height='auto'
                    padding='30px 59px'
                    boxShadow='0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'
                    borderRadius='4px'
                >
                    <Box>
                        <Tabs
                            value={tabChartDoughnut}
                            onChange={handleChangeTabDoughnut}
                            sx={{
                                mb: '30px',
                                '& .MuiTabs-flexContainer': {
                                    px: 5,
                                    justifyContent: 'space-between'
                                },
                                '& .Mui-selected': { color: '#A54CE5 !important' },
                                '& .css-1aquho2-MuiTabs-indicator': { bgcolor: '#A54CE5' }
                            }}
                        >
                            <Tab label='Player Gender' value='0' sx={{ fontSize: '14px', fontWeight: 600 }} />
                            <Tab label='Top 5 expected prizes' value='1' sx={{ fontSize: '14px', fontWeight: 600 }} />
                            <Tab label='AVERAGE AGE PLAYER' value='2' sx={{ fontSize: '14px', fontWeight: 600 }} />
                        </Tabs>
                        <Box width='70%' margin='auto'>
                            <ChartDoughnut dataChart={dataChartDoughnut} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={7} pr={5} mt={8}>
                    <Box
                        padding='30px 59px'
                        boxShadow='0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'
                        borderRadius='4px'
                    >
                        <Tabs
                            value={tabChartBar}
                            onChange={handleChangeTabBar}
                            sx={{
                                mb: '30px',
                                '& .MuiTabs-flexContainer': {
                                    px: 5,
                                    justifyContent: 'center'
                                },
                                '& .Mui-selected': { color: '#A54CE5 !important' },
                                '& .css-1aquho2-MuiTabs-indicator': { bgcolor: '#A54CE5' }
                            }}
                        >
                            <Tab label='Tournaments Played' value='0' sx={{ fontSize: '14px', fontWeight: 600 }} />
                        </Tabs>
                        {loadingChartBar ? (
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <Skeleton variant='rounded' sx={{ height: '150px', width: '40px' }} />
                                <Skeleton variant='rounded' sx={{ height: '200px', width: '40px' }} />
                                <Skeleton variant='rounded' sx={{ height: '100px', width: '40px' }} />
                            </Box>
                        ) : (
                            <ChartBar dataChart={chartBar} />
                        )}
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={5}
                    mt={8}
                    height='auto'
                    padding='30px 59px'
                    boxShadow='0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'
                    borderRadius='4px'
                >
                    <Box>
                        <Tabs
                            value={tabChartDoughnut2}
                            onChange={handleChangeTabDoughnut2}
                            sx={{
                                mb: '30px',
                                '& .MuiTabs-flexContainer': {
                                    px: 5,
                                    justifyContent: 'center'
                                },
                                '& .Mui-selected': { color: '#A54CE5 !important' },
                                '& .css-1aquho2-MuiTabs-indicator': { bgcolor: '#A54CE5' }
                            }}
                        >
                            <Tab label='Casual Players' value='0' sx={{ fontSize: '14px', fontWeight: 600 }} />
                            <Tab label='Tournament Players' value='1' sx={{ fontSize: '14px', fontWeight: 600 }} />
                        </Tabs>
                        <Box width='70%' margin='auto'>
                            {loadingChartDoughnutBottom ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Skeleton
                                        variant='rounded'
                                        sx={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: '300px',
                                            border: '10px solid rgba(0, 0, 0, 0.11)',
                                            background: 'rgba(0, 0, 0, 0)'
                                        }}
                                    />
                                </Box>
                            ) : (
                                <ChartDoughnut dataChart={chartDoughnutBottom} />
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
