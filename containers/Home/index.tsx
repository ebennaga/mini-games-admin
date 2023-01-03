/* eslint-disable no-unused-vars */
import { Box, ButtonBase, Grid, Tab, Tabs } from '@mui/material';
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
import ChartBar from './ChartBar';
import ChartDoughnut from './ChartDoughnut';
import ChartSpline from './ChartSpline';

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

    const dataChartBar = [
        { id: 1, label: 'Tournament Hop Up 1', value: 450, color: '#A54CE5' },
        { id: 2, label: 'Tournament Rose Dart 1', value: 185, color: '#A54CE5' },
        { id: 3, label: 'Tournament Tower Stack 1', value: 600, color: '#A54CE5' }
    ];

    const dataChartDoughnut2 = [
        { id: 3, label: 'Hop Up', color: '#664EAB', value: 58 },
        { id: 1, label: 'Tower Stacks', color: '#8F67FF', value: 22 },
        { id: 2, label: 'Rose Dart', color: '#BBAAF0', value: 20 }
    ];
    const userState = useSelector((state: any) => state.webpage?.user?.user);

    const [tabChartSpline, setTabChartSpline] = React.useState<string>('0');
    const [tabChartDoughnut, setTabChartDoughnut] = React.useState<string>('0');
    const [tabChartBar, setTabChartBar] = React.useState<string>('0');
    const [tabChartDoughnut2, setTabChartDoughnut2] = React.useState<string>('0');
    const [isLoading, setIsLoading] = React.useState(false);
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            startDate: getStartDate() || '',
            endDate: getEndDdate() || ''
        }
    });

    const handleFetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: `dashboard/lines/most-redeemed-prizes`
            });
            console.log('response1', response);
            if (response.status === 200) {
                notify(response.data.message, 'success');
            }
        } catch (err: any) {
            notify(err.message, 'error');
            setIsLoading(false);
        }
    };
    const handleChangeTabSpline = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartSpline(newValue);
    };

    const handleChangeTabDoughnut = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartDoughnut(newValue);
    };

    const handleChangeTabBar = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartBar(newValue);
    };

    const handleChangeTabDoughnut2 = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartDoughnut2(newValue);
    };

    React.useEffect(() => {
        handleFetchData();
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
                        <ChartBar dataChart={dataChartBar} />
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
                            <ChartDoughnut dataChart={dataChartDoughnut2} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
