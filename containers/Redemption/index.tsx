import React from 'react';
import { Box, ButtonBase, Divider, Tabs, Tab, SelectChangeEvent } from '@mui/material';
import InputStartEndDate from 'components/Input/InputStartEndDate';
import { useForm } from 'react-hook-form';
import DownloadIcon from '@mui/icons-material/Download';
import HeaderChildren from 'components/HeaderChildren';
import TabPanelAll from './TabPanelAll';
import TabPanelPending from './TabPanelPending';
import TabPanelComplete from './TabPanelComplete';
import TabPanelDelivered from './TabPaneDelivered';
import TabPanelProcess from './TabPanelProcess';

const dummyData = [
    {
        nickname: 'Nopal',
        product: 'Mousepad Logitech',
        noOrder: '123113',
        redeemTime: '2022-12-20T17:01:00.000Z',
        processTime: '-',
        completedTime: '-',
        status: 'Pending',
        kurir: '-',
        resi: '-'
    },
    {
        nickname: 'Nopal',
        product: 'Mousepad Logitech',
        noOrder: '123113',
        redeemTime: '2023-01-10T14:03:00.000Z',
        processTime: '-',
        completedTime: '-',
        status: 'Completed',
        kurir: '-',
        resi: '-'
    },
    {
        nickname: 'Nopal',
        product: 'Mousepad Logitech',
        noOrder: '123113',
        redeemTime: '2022-12-25T17:01:00.000Z',
        processTime: '-',
        completedTime: '-',
        status: 'Delivered',
        kurir: 'SICEPAT',
        resi: '-'
    },
    {
        nickname: 'Nopal',
        product: 'Mousepad Logitech',
        noOrder: '123113',
        redeemTime: '2023-02-20T01:31:00.000Z',
        processTime: '-',
        completedTime: '-',
        status: 'Process',
        kurir: 'SICEPAT',
        resi: '-'
    }
];
const Redemption = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            startDate: '',
            endDate: ''
        }
    });
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState<any>(dummyData);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [row, setRow] = React.useState(dummyData.length.toString());
    // const [styles, setStyles] = React.useState({});
    const [pages, setPages] = React.useState(1);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        return data.slice(startIndex, endIndex);
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

        if (startDate && !endDate) {
            const arr = result.length > 0 ? result : dummyData;
            result = [
                ...arr.filter((item: any) => {
                    const valueData: any = new Date(item.redeemTime);
                    const key: any = new Date(startDate);
                    return valueData >= key;
                })
            ];
        }
        if (endDate && !startDate) {
            const arr = result.length > 0 ? result : dummyData;
            result = [
                ...arr.filter((item: any) => {
                    const valueData: any = new Date(item.redeemTime);
                    const key: any = new Date(endDate);
                    return valueData <= key;
                })
            ];
        }
        if (endDate && startDate) {
            const arr = result.length > 0 ? result : dummyData;
            result = [
                ...arr.filter((item: any) => {
                    const valueData: any = new Date(item.redeemTime);
                    const keyStartDate: any = new Date(startDate);
                    const keyEndDate: any = new Date(endDate);
                    return valueData >= keyStartDate && valueData <= keyEndDate;
                })
            ];
        }
        setData(result);
        setRow(result.length.toString());
        setCurrentPage(1);
        setPages(1);
    };

    React.useEffect(() => {
        setData(dummyData);
    }, []);

    React.useEffect(() => {
        setPages(Math.round(data.length / Number(row)));
    }, [pages, row]);

    React.useEffect(() => {
        let key: string = 'All';
        switch (value) {
            case 0:
                key = 'All';
                break;
            case 1:
                key = 'Pending';
                break;
            case 2:
                key = 'Process';
                break;
            case 3:
                key = 'Delivered';
                break;
            case 4:
                key = 'Completed';
                break;
            default:
                break;
        }
        if (key !== 'All') {
            setData(dummyData.filter((item: any) => item.status === key));
        } else if (key === 'All') {
            setData(dummyData);
        }
    }, [value]);

    return (
        <Box>
            <HeaderChildren title='Redemption Prize' subTitle='Additional description if required'>
                <Box display='flex' alignItems='center' justifyContent='space-between' mt={3}>
                    <Box display='flex' alignItems='center' gap='20px'>
                        <InputStartEndDate label='Date' nameStartDate='startDate' nameEndDate='endDate' form={form} />
                        <ButtonBase
                            onClick={handleGetData}
                            sx={{ background: '#A54CE5', color: '#fff', padding: '12px 22px', borderRadius: '4px', mt: '7px' }}
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
                    data={data}
                    row={row}
                    handleViewRow={handleViewRow}
                />
                <TabPanelPending
                    value={value}
                    index={1}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPreviousPage}
                    getPaginatedData={getPaginatedData}
                    data={data}
                    row={row}
                    handleViewRow={handleViewRow}
                />
                <TabPanelProcess
                    value={value}
                    index={2}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPreviousPage}
                    getPaginatedData={getPaginatedData}
                    data={data}
                    row={row}
                    handleViewRow={handleViewRow}
                />
                <TabPanelDelivered
                    value={value}
                    index={3}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPreviousPage}
                    getPaginatedData={getPaginatedData}
                    data={data}
                    row={row}
                    handleViewRow={handleViewRow}
                />
                <TabPanelComplete
                    value={value}
                    index={4}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPreviousPage}
                    getPaginatedData={getPaginatedData}
                    data={data}
                    row={row}
                    handleViewRow={handleViewRow}
                />
            </Box>
        </Box>
    );
};

export default Redemption;
