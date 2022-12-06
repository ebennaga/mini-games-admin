import { Box, Typography, Paper, SelectChangeEvent, Skeleton } from '@mui/material';
import React, { useState, SyntheticEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputImage from 'components/Input/InputImage';
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
            image: '',
            search: ''
        }
    });

    const [value, setValue] = useState(0);
    const [row, setRow] = useState('7');
    const [remove, setRemove] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        return remove.slice(startIndex, endIndex);
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
            fetchData(endpointTabs[value]);
        } else {
            setRemove([]);
            setIsLoading(true);
            setRemove(dummy);
            setIsLoading(false);
        }
    }, [value]);

    useEffect(() => {
        setPages(Math.ceil(remove.length / Number(row)));
    }, [pages, row]);

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
                            <InputSearch placeholder='Search by name, code, etc.' name='search' label='Search' form={form} />
                        </Box>
                    </Box>
                    <Box>
                        <InputImage
                            name='image'
                            form={form}
                            label='Click to upload'
                            secondaryLabel='or drag and drop'
                            placeholder='Excel (max. 3MB)'
                            isLocation
                        />
                    </Box>
                </Paper>

                {isLoading ? (
                    <Box mt={4}>
                        {[...Array(5)].map((_item: any, index: number) => {
                            return <Skeleton key={index} sx={{ height: '90px' }} />;
                        })}
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
