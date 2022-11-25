import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import InputExchangeRates from 'components/Input/InputExchangeRates';
import { useForm } from 'react-hook-form';
import useNotify from 'hooks/useNotify';

const ExchangeRatesAdd = () => {
    const notify = useNotify();

    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);

    const form = useForm({
        mode: 'all',
        defaultValues: {
            effective: new Date().toJSON().slice(0, 10) || '',
            coins: 200,
            idr: 20000,
            name: '200 coins',
            description: '200 coins with price 20000 IDR'
        }
    });

    const handleSubmit = async (data: any) => {
        setLoadingSubmit(true);
        try {
            console.log(data);
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
                        <Typography sx={{ fontSize: '24px' }}>Exchange Rates Detail</Typography>
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
                    nameName='name'
                    descriptionName='description'
                />
            </Box>
        </Container>
    );
};

export default ExchangeRatesAdd;
