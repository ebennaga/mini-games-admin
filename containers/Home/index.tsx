import { Box, Grid, Tab, Tabs } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import React from 'react';
import ChartDoughnut from './ChartDoughnut';
import ChartSpline from './ChartSpline';

const Home = () => {
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

    const [tabChartSpline, setTabChartSpline] = React.useState<string>('0');
    const [tabChartDoughnut, setTabChartDoughnut] = React.useState<string>('0');

    const handleChangeTabSpline = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartSpline(newValue);
    };

    const handleChangeTabDoughnut = (e: React.SyntheticEvent, newValue: string) => {
        setTabChartDoughnut(newValue);
    };

    return (
        <Box>
            <HeaderChildren title='Dashboard' subTitle='Additional description if required'>
                {' '}
            </HeaderChildren>
            <Grid container>
                <Grid item xs={7} mt='30px' pr={5}>
                    <Box
                        padding='30px 59px'
                        boxShadow='0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'
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
            </Grid>
        </Box>
    );
};

export default Home;
