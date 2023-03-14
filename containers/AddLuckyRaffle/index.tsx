import { Box, Grid, Typography, Checkbox, ButtonBase } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextFileldLuckyRaffle from './TextFileldLuckyRaffle';

const AddLuckyRaffle = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const form = useForm({
        mode: 'all',
        defaultValues: {
            name: '',
            totalPools: '',
            ticketPrice: '',
            isActive: false
        }
    });
    const { isActive } = form.watch();

    const router = useRouter();

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        console.log('data', data);
        setIsLoading(false);
    };

    return (
        <Box sx={{ form: { height: '75vh', position: 'relative' } }}>
            <HeaderChildren title='Add Lucky Raffle' subTitle='Additional description if required'>
                <Box />
            </HeaderChildren>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box sx={{ mt: '32px' }}>
                    <TextFileldLuckyRaffle
                        type='text'
                        form={form}
                        name='name'
                        placeholder='Max 100 Character'
                        rules={{ maxLength: 100, required: true }}
                        labelInput='Name'
                        label='Raffle Name'
                    />
                </Box>
                <Box sx={{ mt: '32px' }}>
                    <TextFileldLuckyRaffle
                        type='number'
                        form={form}
                        name='totalPools'
                        placeholder='Amount'
                        rules={{ required: true }}
                        labelInput='Total Pool'
                        label='Total Pools'
                        startAddorment={
                            <img src='/images/point.png' alt='point' width='30px' height='auto' style={{ marginRight: '8px' }} />
                        }
                    />
                </Box>
                <Box sx={{ mt: '32px' }}>
                    <TextFileldLuckyRaffle
                        type='number'
                        form={form}
                        name='ticketPrice'
                        placeholder='Amount'
                        rules={{ required: true }}
                        labelInput='Ticket Price'
                        label='Ticket Price'
                        startAddorment={
                            <img src='/images/point.png' alt='point' width='30px' height='auto' style={{ marginRight: '8px' }} />
                        }
                    />
                </Box>
                <Grid container sx={{ mt: '32px' }}>
                    <Grid item container xs={12} lg={5} spacing='24px'>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography component='h3' sx={{ fontSize: '16px', fontWeight: 600, color: 'rgba(0, 0, 0, 0.6)' }}>
                                    Is Active
                                </Typography>
                                <Typography component='p' sx={{ fontSize: '12px', color: '#666666' }}>
                                    *Field Required
                                </Typography>
                            </Box>
                            <Typography component='span'>:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{ '.Mui-checked': { color: '#A54CE5 !important' } }}>
                                <Checkbox checked={!!isActive} onChange={() => form.setValue('isActive', true)} />
                                <Typography component='span' sx={{ fontSize: '16px' }}>
                                    Open
                                </Typography>
                            </Box>
                            <Box sx={{ '.Mui-checked': { color: '#A54CE5 !important' } }}>
                                <Checkbox checked={!isActive} onChange={() => form.setValue('isActive', false)} />
                                <Typography component='span' sx={{ fontSize: '16px' }}>
                                    Close
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '40px',
                        pt: '39px',
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        position: 'absolute',
                        bottom: 0,
                        width: '100%'
                    }}
                >
                    <ButtonBase
                        type='submit'
                        sx={{
                            background: '#A54CE5',
                            color: '#fff',
                            borderRadius: '4px',
                            padding: '16.5px 68px',
                            fontSize: '15px',
                            fontWeight: 600
                        }}
                    >
                        SUBMIT
                    </ButtonBase>
                    {!isLoading && (
                        <ButtonBase
                            onClick={() => router.push('/lucky-raffle')}
                            sx={{
                                border: '1px solid #A54CE5',
                                color: '#a54ce5',
                                borderRadius: '4px',
                                padding: '16.5px 68px',
                                fontSize: '15px',
                                fontWeight: 600
                            }}
                        >
                            CANCEL
                        </ButtonBase>
                    )}
                </Box>
            </form>
        </Box>
    );
};

export default AddLuckyRaffle;
