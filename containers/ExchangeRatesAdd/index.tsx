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
    // const [isValue, setIsValue] = React.useState(false);

    const form = useForm({
        mode: 'all',
        defaultValues: {
            effective: new Date().toJSON().slice(0, 10) || '',
            coins: '',
            idr: '',
<<<<<<< HEAD
            bonus: '',
            activeRole: false
            // description: '',
=======
            name: '',
            description: '',
            bonus: ''
>>>>>>> fd0d9b120fdc046841ea770a6310c0bac2567880
        }
    });

    const handleSubmit = async (data: any) => {
        setLoadingSubmit(true);
        try {
            const { bonus, coins, idr, activeRole, name } = data;
            const response = await fetchAPI({
                method: 'POST',
                endpoint: 'exchange-rates',
                data: {
                    name,
                    coin: coins,
                    price: idr,
                    bonus,
                    is_active: activeRole
                    // description,
                    // effective_at: effective
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

    const handleAddSetActive = (event: any) => {
        // setIsValue(true);
        form.setValue('activeRole', event.target.checked);
    };

    const handleAddSetNotActive = () => {
        // setIsValue(true);
        form.setValue('activeRole', !form.watch('activeRole'));
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
                    handleAddSetActive={handleAddSetActive}
                    handleAddSetNotActive={handleAddSetNotActive}
                    loadingSubmit={loadingSubmit}
                    coinsName='coins'
                    idrName='idr'
                    form={form}
                    handleSubmit={handleSubmit}
<<<<<<< HEAD
                    // descriptionName='description'
                    // effectiveName='effective'
                    // nameName='name'
=======
                    nameName='name'
                    descriptionName='description'
                    bonusName=''
>>>>>>> fd0d9b120fdc046841ea770a6310c0bac2567880
                />
            </Box>
        </Container>
    );
};

export default ExchangeRatesAdd;
