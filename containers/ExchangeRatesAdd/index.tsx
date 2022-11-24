import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import InputExchangeRates from 'components/Input/InputExchangeRates';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import { useRouter } from 'next/router';

const ExchangeRatesAdd = () => {
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const router = useRouter();

    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);

    const form = useForm({
        mode: 'all',
        defaultValues: {
            effective: new Date().toJSON().slice(0, 10) || '',
            coins: '',
            idr: ''
        }
    });

    const handleSubmit = async (data: any) => {
        setLoadingSubmit(true);
        try {
            const { effective, coins, idr } = data;
            const response = await fetchAPI({
                method: 'POST',
                endpoint: 'exchange-rates',
                data: {
                    name: String(coins),
                    coin: coins,
                    price: idr,
                    description: `coins effective at: ${effective}`
                }
            });

            if (response.status === 200) {
                notify('Add Exchange Rates Successfull!');
                router.push('/exchange-rates');
            }
        } catch (err: any) {
            notify(err.message);
        }
        setLoadingSubmit(false);
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ ml: -25, height: 80 }} component={Paper}>
                <Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ fontSize: '24px' }}>Add Exchange Rates</Typography>
                        <Typography sx={{ fontSize: '14px' }}>Additional description if required</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ml: -25, mt: 4 }}>
                <InputExchangeRates
                    loadingSubmit={loadingSubmit}
                    effectiveName='effective'
                    coinsName='coins'
                    idrName='idr'
                    form={form}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    );
};

export default ExchangeRatesAdd;
