/* eslint-disable camelcase */
import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import InputExchangeRates from 'components/Input/InputExchangeRates';
import { useForm } from 'react-hook-form';
import useNotify from 'hooks/useNotify';
import useAPICaller from 'hooks/useAPICaller';
import { useRouter } from 'next/router';

const ExchangeRatesAdd = () => {
    const notify = useNotify();
    const router = useRouter();
    const { fetchAPI } = useAPICaller();

    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [dataDetail, setDataDetail] = React.useState<any>({});

    // set name and default value hook form
    const form = useForm({
        mode: 'all',
        defaultValues: {
            effective: '',
            coins: 0,
            idr: 0,
            name: '',
            activeRole: true,
            description: ''
        }
    });

    // Func to get detail exchange rate
    const fetchDataDetail = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: `exchange-rates/${router.query.id}`
            });

            if (response.status === 200) {
                const { coin, description, effective_at, name, price } = response.data.data;
                setDataDetail(response.data.data);

                form.setValue('effective', new Date(effective_at).toJSON().slice(0, 10));
                form.setValue('coins', coin);
                form.setValue('idr', price);
                form.setValue('name', name);
                form.setValue('description', description);
            } else {
                notify(response.message, 'error');
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsLoading(false);
    };

    // Func submit to update exchange rates
    const handleSubmit = async (data: any) => {
        setLoadingSubmit(true);
        try {
            const { coin, description, effective_at, name, price } = dataDetail;
            const { coins, description: descriptionInput, effective, name: nameInput, idr } = data;

            let resData = {};

            // if data changes then resData is filled
            resData = coin !== coins ? { ...resData, coin: coins } : resData;
            resData = description !== descriptionInput ? { ...resData, description, descriptionInput } : resData;
            resData = new Date(effective_at).toJSON().slice(0, 10) !== effective ? { ...resData, effective_at: effective } : resData;
            resData = name !== nameInput ? { ...resData, name: nameInput } : resData;
            resData = price !== idr ? { ...resData, price: idr } : resData;

            // Conditional if resData is filled
            if (Object.keys(resData).length > 0) {
                const response = await fetchAPI({
                    method: 'PUT',
                    endpoint: `exchange-rates/${router.query.id}`,
                    data: resData
                });

                if (response.status === 200) {
                    notify(response.data.message, 'success');

                    fetchDataDetail();
                } else {
                    notify(response.data.message, 'error');
                }
            }
        } catch (err: any) {
            notify(err.message);
        }
        setLoadingSubmit(false);
    };

    const handleAddSetActive = (event: any) => {
        // setIsValue(true);
        form.setValue('activeRole', event.target.checked);
    };

    const handleAddSetNotActive = () => {
        // setIsValue(true);
        form.setValue('activeRole', !form.watch('activeRole'));
    };

    // Component Did Mount and fetch data detail
    React.useEffect(() => {
        fetchDataDetail();
    }, []);

    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ ml: -25, height: 80 }} component={Paper}>
                <Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ fontSize: '24px' }}>Exchange Rates Detail</Typography>
                        <Typography sx={{ fontSize: '14px' }}>Additional description if required</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ml: -25, mt: 4 }}>
                <InputExchangeRates
                    handleAddSetActive={handleAddSetActive}
                    handleAddSetNotActive={handleAddSetNotActive}
                    loadingSubmit={loadingSubmit}
                    loading={isLoading}
                    // effectiveName='effective'
                    coinsName='coins'
                    idrName='idr'
                    form={form}
                    handleSubmit={handleSubmit}
                    // nameName='name'
                    // descriptionName='description'
                />
            </Box>
        </Container>
    );
};

export default ExchangeRatesAdd;
