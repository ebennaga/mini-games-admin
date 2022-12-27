import { Box, Typography, Paper, SelectChangeEvent, Skeleton } from '@mui/material';
import React, { useState, SyntheticEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import InputFile from 'components/Input/InputImage';
import InputExcel from 'components/Input/InputExcel';
import InputSearch from 'components/Input/InputSearch';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import Tabs from './Tabs';
import TabProvince from './TabProvince';
import TabCity from './TabCity';
import TabDistrict from './TabDistrict';
import TabSubDistrict from './TabSubDistrict';
import dummy from './dummy';

const LocationContainer = () => {
    const endpointTabs = ['provinces', 'cities', 'districts', 'sub-districts'];

    const form = useForm({
        mode: 'all',
        defaultValues: {
            excel: '',
            search: ''
        }
    });

    const [value, setValue] = useState(0);
    const [row, setRow] = useState('7');
    const [remove, setRemove] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [query, setQuery] = React.useState('');
    const [filteredData, setFilteredData] = React.useState<any>([]);
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const handleChangeTabs = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        return filteredData.slice(startIndex, endIndex);
    };

    const handleQuerySearch = () => {
        // eslint-disable-next-line consistent-return, array-callback-return
        const temp = remove.filter((post: any) => {
            if (query === '') {
                return post;
            }
            if (
                post.id.toString().toLowerCase().includes(query.toLowerCase()) ||
                post.name.toString().toLowerCase().includes(query.toLowerCase())
            ) {
                return post;
            }
        });
        setFilteredData(temp);
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

    // Fetch Data Table
    const fetchData = async (endpoint: string) => {
        setIsLoading(true);
        setRemove([]);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint
            });

            if (response.status === 200) {
                setRemove(response.data.data);
                setFilteredData(response.data.data);
            } else {
                notify(response?.message, 'error');
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsLoading(false);
    };

    // Did Update value
    useEffect(() => {
        if (value <= 1) {
            setRemove([]);
            setFilteredData([]);
            fetchData(endpointTabs[value]);
        } else {
            setIsLoading(true);
            setRemove([]);
            setFilteredData([]);
            setIsLoading(true);
            setRemove(dummy);
            setFilteredData(dummy);
            setIsLoading(false);
        }
    }, [value]);

    useEffect(() => {
        setPages(Math.ceil(remove.length / Number(row)));
    }, [pages, row]);
    const handleSearch = (keyword: any) => {
        setQuery(keyword);
    };
    React.useEffect(() => {
        handleQuerySearch();
    }, [query]);

    // React.useEffect(() => {
    //     console.log(filteredData);
    // });
    // console.log(form.watch('excel'));
    // console.log(value);
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ padding: '0px 25px' }}>
                <Paper
                    sx={{
                        width: '100%',
                        borderRadius: '4px',
                        padding: '16px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Location</Typography>
                        <Typography sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400 }}>
                            Additional description if required
                        </Typography>
                        <Box sx={{ mt: '15px' }}>
                            <Tabs value={value} handleChange={handleChangeTabs} />
                        </Box>
                        <Box sx={{ width: '25%', mt: '30px' }}>
                            <InputSearch
                                onChangeFunc={(e: any) => {
                                    handleSearch(e.target.value);
                                }}
                                placeholder='Search by name, code, etc.'
                                name='search'
                                label='Search'
                                form={form}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <InputExcel
                            setRemove={setRemove}
                            rules={{ required: true }}
                            name='excel'
                            form={form}
                            label='Click to upload'
                            secondaryLabel='or drag and drop'
                            placeholder='Excel (max. 3MB)'
                            isLocation
                        />
                    </Box>
                </Paper>

                {isLoading ? (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {/* <CircularProgress size={100} color='secondary' /> */}
                        {[...Array(6)].map((item: any, index: number) => (
                            <Skeleton variant='rounded' width='100%' height='60px' key={index} sx={{ mt: '15px' }} />
                        ))}
                    </Box>
                ) : (
                    <Box>
                        <TabProvince
                            goToPreviousPage={goToPreviousPage}
                            row={row}
                            handleChange={handleChange}
                            remove={remove}
                            goToNextPage={goToNextPage}
                            value={value}
                            index={0}
                            data={getPaginatedData()}
                        />
                        <TabCity
                            goToPreviousPage={goToPreviousPage}
                            row={row}
                            handleChange={handleChange}
                            remove={remove}
                            goToNextPage={goToNextPage}
                            value={value}
                            index={1}
                            data={getPaginatedData()}
                        />
                        <TabDistrict
                            goToPreviousPage={goToPreviousPage}
                            row={row}
                            handleChange={handleChange}
                            remove={remove}
                            goToNextPage={goToNextPage}
                            value={value}
                            index={2}
                            data={getPaginatedData()}
                        />
                        <TabSubDistrict
                            goToPreviousPage={goToPreviousPage}
                            row={row}
                            handleChange={handleChange}
                            remove={remove}
                            goToNextPage={goToNextPage}
                            value={value}
                            index={3}
                            data={getPaginatedData()}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default LocationContainer;
