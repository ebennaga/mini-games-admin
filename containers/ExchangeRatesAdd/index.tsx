/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
// eslint-disable-next-line import/no-named-as-default-member
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
    const [isDisable, setIsDisable] = React.useState<boolean>(true);
    // const [isValue, setIsValue] = React.useState(false);

    const form = useForm({
        mode: 'all',
        defaultValues: {
            effective: new Date().toJSON().slice(0, 10) || '',
            coins: '',
            idr: '',
            bonus: '',
            name: '',
            activeRole: false
            // description: '',
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
                notify(response.data.message, 'success');
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
    const validateNumber = (key: any) => {
        const toArr = String(key).split('');
        const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        const filter = toArr.filter((item) => !number.includes(item));

        if (filter.length === 0) {
            setIsDisable(false);
            return true;
        }

        return 'this is not number';
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ ml: -15, height: 80 }} component={Paper}>
                <Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ fontSize: '24px' }}>Add Exchange Rates</Typography>
                        <Typography sx={{ fontSize: '14px' }}>Additional description if required</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ml: -15, mt: 4 }}>
                <InputExchangeRates
                    handleAddSetActive={handleAddSetActive}
                    handleAddSetNotActive={handleAddSetNotActive}
                    loadingSubmit={loadingSubmit}
                    coinsName='coins'
                    idrName='idr'
                    nameName='name'
                    form={form}
                    handleSubmit={handleSubmit}
                    rules={{ validate: validateNumber }}
                    bonusName='bonus' // descriptionName='description'
                    // effectiveName='effective'
                    // nameName='name'
                />
            </Box>
        </Container>
    );
};

export default ExchangeRatesAdd;
