/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, ButtonBase, Divider, Tabs, Tab, SelectChangeEvent, Skeleton } from '@mui/material';
import InputStartEndDate from 'components/Input/InputStartEndDate';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import HeaderChildren from 'components/HeaderChildren';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import { useRouter } from 'next/router';
import TabPanelAll from './TabPanelAll';
import TabPanelPending from './TabPanelPending';
import TabPanelComplete from './TabPanelComplete';
import TabPanelDelivered from './TabPaneDelivered';
import TabPanelProcess from './TabPanelProcess';

const dummyData = [
    {
        id: '5',
        order_code: 'ORD-OJ9WQ4RAVG',
        user: {
            id: '229',
            avatar: 1,
            username: 'dandiyra'
        },
        redemption_product: {
            id: '1',
            name: 'Logam Mulia 2 Gram'
        },
        delivery: {
            id: '',
            resi_no: '',
            courier: {
                id: '1',
                name: 'jnt'
            }
        },
        status: 'pending',
        processed_at: null,
        completed_at: null,
        created_at: '2022-11-09T13:37:02.000Z'
    },
    {
        id: '6',
        order_code: 'ORD--PY48F_09U',
        user: {
            id: '1',
            avatar: 1,
            username: 'anoc'
        },
        redemption_product: {
            id: '6',
            name: 'Logam Mulia 2 Gram'
        },
        delivery: {
            id: '3',
            resi_no: '',
            courier: {
                id: '',
                name: ''
            }
        },
        status: 'processed',
        processed_at: null,
        completed_at: null,
        created_at: '2022-11-09T13:38:43.000Z'
    },
    {
        id: '7',
        order_code: 'ORD-BOYTUM--9A',
        user: {
            id: '1',
            avatar: 1,
            username: 'anoc'
        },
        redemption_product: {
            id: '7',
            name: 'Logam Mulia 1 Gram'
        },
        delivery: {
            id: '7',
            resi_no: '12341231231231',
            courier: {
                id: '1',
                name: 'sicepat1'
            }
        },
        status: 'delivered',
        processed_at: null,
        completed_at: null,
        created_at: '2022-11-09T13:39:38.000Z'
    },
    {
        id: '4',
        order_code: 'ORD-FPQFRSWNOB',
        user: {
            id: '1',
            avatar: 1,
            username: 'anoc1'
        },
        redemption_product: {
            id: '',
            name: ''
        },
        delivery: {
            id: '',
            resi_no: '',
            courier: {
                id: '',
                name: ''
            }
        },
        status: 'completed',
        processed_at: null,
        completed_at: null,
        created_at: '2022-11-09T13:34:57.000Z'
    }
];
const Redemption = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            startDate: '',
            endDate: '',
            courierId: '',
            resiNo: ''
        }
    });
    const [redempData, setRedempData] = React.useState<any>([]);
    const [courier, setCourier] = React.useState<any>([]);
    const [redeemIdData, setRedeemIdData] = React.useState<any>(null);
    const [filterData, setFilterData] = React.useState<any>([]);
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState<any>(dummyData);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [row, setRow] = React.useState('10');
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    // const [styles, setStyles] = React.useState({});
    const [pages, setPages] = React.useState(1);
    const router = useRouter();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { fetchAPI, isLoading: loading } = useAPICaller();
    const notify = useNotify();

    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const getRedemptionsData = async () => {
        setIsLoading(true);
        try {
            const status: any =
                value === 1 ? 'pending' : value === 2 ? 'processed' : value === 3 ? 'delivered' : value === 4 ? 'completed' : '';
            const response = await fetchAPI({
                method: 'GET',
                endpoint: `/redemptions`
            });
            if (response.status === 200) {
                const resData = response.data.data;
                setRedempData(response.data.data);

                // const filterID = resData.filter((o: any) => o.id);
                // console.log('filterid', filterID);
                setData(response.data.data);
                // setRedempData(dummyData);
                // setData(dummyData);
                notify(response.data.message, 'success');
                setIsLoading(false);
            }
        } catch (error: any) {
            // console.log(error.message);
            notify(error.message, 'error');
            setIsLoading(false);
        }
    };

    // get courier
    const getCourier = async () => {
        try {
            const response = await fetchAPI({
                endpoint: 'couriers',
                method: 'GET'
            });
            if (response.status === 200) {
                setCourier(response.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    const getPaginatedData = () => {
        // const mixData = [...courier, redempData];
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        if (value !== 0) {
            return filterData.slice(startIndex, endIndex);
        }
        return redempData.slice(startIndex, endIndex);
    };

    const goToNextPage = () => {
        if (currentPage !== pages) {
            setCurrentPage((page) => page + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((page) => page - 1);
        }
    };

    const handleViewRow = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    // Event Get Data filter date
    const handleGetData = () => {
        const { startDate, endDate } = form.watch();

        let result: Array<any> = [];
        // console.log({ startDate });
        // console.log({ endDate });
        if (startDate && !endDate) {
            const arr = result.length > 0 ? result : value !== 0 ? filterData : redempData;
            result = [
                ...arr.filter((item: any) => {
                    const valueData: any = new Date(item.created_at);
                    const key: any = new Date(startDate);
                    return valueData >= key;
                })
            ];
        }
        if (endDate && !startDate) {
            const arr = result.length > 0 ? result : value !== 0 ? filterData : redempData;
            result = [
                ...arr.filter((item: any) => {
                    const valueData: any = new Date(item.created_at);
                    const key: any = new Date(endDate);
                    return valueData <= key;
                })
            ];
        }
        if (endDate && startDate) {
            const arr = result.length > 0 ? result : value !== 0 ? filterData : redempData;
            result = [
                ...arr.filter((item: any) => {
                    const valueData: any = new Date(item.created_at);
                    const keyStartDate: any = new Date(startDate);
                    const keyEndDate: any = new Date(endDate);
                    return valueData >= keyStartDate && valueData <= keyEndDate;
                })
            ];
        }
        setRedempData(result);
        setData(result);
        setRow(result.length.toString());
        setCurrentPage(1);
        setPages(1);
    };

    // OPTIONS FILTER DATA IF NEED IT
    React.useEffect(() => {
        const status: any =
            value === 1 ? 'pending' : value === 2 ? 'processed' : value === 3 ? 'delivered' : value === 4 ? 'completed' : '';
        if (status === 'pending') {
            const tempData: any = [...redempData];
            const filter = tempData.filter((item: any) => {
                return item.status === 'pending';
            });
            setFilterData(filter);
        }
        if (status === 'processed') {
            const tempData = [...redempData];
            const filter = tempData.filter((item: any) => {
                return item.status === 'processed';
            });
            setFilterData(filter);
        }
        if (status === 'delivered') {
            const tempData = [...redempData];
            const filter = tempData.filter((item: any) => {
                return item.status === 'delivered';
            });
            setFilterData(filter);
        }
        if (status === 'completed') {
            const tempData = [...redempData];
            const filter = tempData.filter((item: any) => {
                return item.status === 'completed';
            });
            setFilterData(filter);
        }
    }, [value, redempData]);

    // React.useEffect(() => {
    //     getRedemptionsData();
    //     getCourier();
    // }, []);

    // React.useEffect(() => {
    //     getRedemptionsData();
    // }, [value]);

    React.useEffect(() => {
        setPages(Math.round(redempData.length / Number(row)));
    }, [pages, row]);

    const handleApprove = async (item: any) => {
        try {
            const response = await fetchAPI({
                method: 'PUT',
                endpoint: `redemptions/${item.id}`,
                data: {
                    status: 'processed'
                    // resi_no: item.delivery.resi_no,
                    // courier_id: item.delivery.courier.id
                }
            });
            if (response.status === 200) {
                const resStatus = response.data.data;
                await getRedemptionsData();
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    const handleDelivered = async (item: any) => {
        console.log('item', item);
        // const { resiNo, courierId } = d;

        try {
            const response = await fetchAPI({
                method: 'PUT',
                endpoint: `redemptions/${item.delivery.order_id}`,
                data: {
                    status: 'delivered',
                    resi_no: form.watch('resiNo'),
                    courier_id: form.watch('courierId')
                }
            });
            console.log('response', response);
            if (response.status === 200) {
                await getRedemptionsData();
            }
        } catch (err: any) {
            console.log(err);
        }
    };
    const handleCompleted = async (item: any) => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'PUT',
                endpoint: `redemptions/${item.delivery.order_id}`,
                data: {
                    status: 'completed',
                    resi_no: item.delivery.resi_no,
                    courier_id: item.delivery.courier.id
                }
            });

            if (response.status === 200) {
                await getRedemptionsData();
                setIsLoading(false);
            }
        } catch (err: any) {
            console.log(err);
            setIsLoading(false);
        }
    };
    console.log('rdempdata', redempData);
    // React.useEffect(() => {
    //     let key: string = 'All';
    //     switch (value) {
    //         case 0:
    //             key = 'All';
    //             break;
    //         case 1:
    //             key = 'Pending';
    //             break;
    //         case 2:
    //             key = 'Process';
    //             break;
    //         case 3:
    //             key = 'Delivered';
    //             break;
    //         case 4:
    //             key = 'Completed';
    //             break;
    //         default:
    //             break;
    //     }
    //     if (key !== 'All') {
    //         setData(redempData.filter((item: any) => item.status === key));
    //     } else if (key === 'All') {
    //         setData(redempData);
    //     }
    // }, [value]);

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    React.useEffect(() => {
        getRedemptionsData();
        getCourier();
    }, [value]);

    return (
        <Box>
            <HeaderChildren title='Redemption Prize' subTitle='Additional description if required'>
                <Box display='flex' alignItems='center' justifyContent='space-between' mt={3}>
                    <Box display='flex' alignItems='center' gap='20px'>
                        <InputStartEndDate label='Date' nameStartDate='startDate' nameEndDate='endDate' form={form} />
                        <ButtonBase
                            disabled={!form.watch('startDate') && !form.watch('endDate')}
                            onClick={handleGetData}
                            sx={{
                                '&:disabled': {
                                    backgroundColor: '#949494',
                                    color: 'white',
                                    border: 'none'
                                },
                                background: '#A54CE5',
                                color: '#fff',
                                padding: '12px 22px',
                                borderRadius: '4px',
                                mt: '7px'
                            }}
                        >
                            GET DATA
                        </ButtonBase>
                    </Box>
                    <ButtonBase
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

            <Box sx={{ marginTop: '14px' }}>
                {isLoading ? (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {/* <CircularProgress size={100} color='secondary' /> */}
                        {[...Array(6)].map((item: any, index: number) => (
                            <Skeleton variant='rounded' width='100%' height='60px' key={index} sx={{ mt: '15px' }} />
                        ))}
                    </Box>
                ) : (
                    <>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor='secondary'
                            textColor='inherit'
                            aria-label='basic tabs example'
                            TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
                            sx={{
                                '& .MuiTabs-indicator': {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: 'transparent'
                                },
                                '& .MuiTabs-indicatorSpan': {
                                    maxWidth: 150,
                                    width: '100%',
                                    backgroundColor: '#A54CE5'
                                },
                                '& .MuiButtonBase-root': {
                                    minHeight: 0
                                }
                            }}
                        >
                            <Tab
                                label='All'
                                {...a11yProps(0)}
                                sx={{
                                    textTransform: 'none',
                                    '&.Mui-selected': {
                                        fontWeight: 'bold',
                                        color: '#A54CE5'
                                    }
                                }}
                            />
                            <Tab
                                label='Pending'
                                {...a11yProps(1)}
                                sx={{
                                    textTransform: 'none',
                                    '&.Mui-selected': {
                                        fontWeight: 'bold',
                                        color: '#A54CE5'
                                    }
                                }}
                            />
                            <Tab
                                label='Process'
                                {...a11yProps(2)}
                                sx={{
                                    textTransform: 'none',
                                    '&.Mui-selected': {
                                        fontWeight: 'bold',
                                        color: '#A54CE5'
                                    }
                                }}
                            />
                            <Tab
                                label='Delivered'
                                {...a11yProps(3)}
                                sx={{
                                    textTransform: 'none',
                                    '&.Mui-selected': {
                                        fontWeight: 'bold',
                                        color: '#A54CE5'
                                    }
                                }}
                            />
                            <Tab
                                label='Completed'
                                {...a11yProps(4)}
                                sx={{
                                    textTransform: 'none',
                                    '&.Mui-selected': {
                                        fontWeight: 'bold',
                                        color: '#A54CE5'
                                    }
                                }}
                            />
                        </Tabs>
                        <Divider />
                        <TabPanelAll
                            value={value}
                            index={0}
                            goToNextPage={goToNextPage}
                            goToPrevPage={goToPreviousPage}
                            getPaginatedData={getPaginatedData}
                            data={redempData}
                            row={row}
                            handleViewRow={handleViewRow}
                        />
                        <TabPanelPending
                            value={value}
                            index={1}
                            goToNextPage={goToNextPage}
                            goToPrevPage={goToPreviousPage}
                            getPaginatedData={getPaginatedData}
                            data={redempData}
                            row={row}
                            handleViewRow={handleViewRow}
                            onClick={handleApprove}
                        />
                        <TabPanelProcess
                            value={value}
                            index={2}
                            goToNextPage={goToNextPage}
                            goToPrevPage={goToPreviousPage}
                            getPaginatedData={getPaginatedData}
                            data={redempData}
                            row={row}
                            handleViewRow={handleViewRow}
                            onClick={handleDelivered}
                            dataCourier={courier}
                            nameCourier='courierId'
                            form={form}
                            resiNo='resiNo'
                        />
                        <TabPanelDelivered
                            value={value}
                            index={3}
                            goToNextPage={goToNextPage}
                            goToPrevPage={goToPreviousPage}
                            getPaginatedData={getPaginatedData}
                            data={redempData}
                            row={row}
                            handleViewRow={handleViewRow}
                            onClick={handleCompleted}
                        />
                        <TabPanelComplete
                            value={value}
                            index={4}
                            goToNextPage={goToNextPage}
                            goToPrevPage={goToPreviousPage}
                            getPaginatedData={getPaginatedData}
                            data={redempData}
                            row={row}
                            handleViewRow={handleViewRow}
                        />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Redemption;
