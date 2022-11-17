import { Box, Grid, Typography, ButtonBase } from '@mui/material';
import HeaderAuth from 'components/HeaderAuth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Input from 'components/Input/Input';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
// import useAuthReducer from 'hooks/useAuthReducer';

const SignIn = () => {
    const router = useRouter();
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [isSend, setIsSend] = useState<boolean>(false);
    const { fetchAPI } = useAPICaller();
    // const { setUser } = useAuthReducer();
    const notify = useNotify();
    const form = useForm({
        mode: 'all',
        defaultValues: {
            email: ''
        }
    });

    const ruleEmail = (key: any) => {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (pattern.test(key)) {
            setIsDisable(false);
            return true;
        }
        return 'Email is not valid!';
    };

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/auths/reset-password',
                data: {
                    email: data.email
                }
            });
            if (response?.status === 200) {
                // setUser(response?.data.data.api_token);
                notify('Check your email for get OTP Code', 'success');
                setIsSend(true);
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    return (
        <Box component='main'>
            {isSend ? (
                <Box padding='115px 43px'>
                    <Typography component='h1' fontSize='24px' fontWeight={400}>
                        Check your email
                    </Typography>
                    <Typography component='p' fontSize='12px' fontWeight={400} my='14px'>
                        We have sent an email with instructions to reset your password to <b>john@gmail.com</b>
                    </Typography>
                    <ButtonBase onClick={() => router.push('/sign-in')} sx={{ color: '#A54CE5' }}>
                        Sign in
                    </ButtonBase>
                </Box>
            ) : (
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Box padding='95px 40px'>
                        <HeaderAuth title='Password Reset' subTitle='Additional description if required' />
                        <Typography component='p' fontSize='12px' fontWeight={400} mt='25px' sx={{ color: '#666666' }}>
                            Forgot your password? Enter your email address below, and we`ll send instructions for setting a new one.
                        </Typography>
                        <Grid container mt='27px'>
                            <Grid item container xs={12} mb='37px'>
                                <Grid item xs={12} xl={7}>
                                    <Input
                                        name='email'
                                        form={form}
                                        label='Email Address'
                                        placeholder='Enter your email address'
                                        rules={{ validate: ruleEmail }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} mb='37px'>
                                <Grid item xs={12} xl={7}>
                                    <ButtonBase
                                        disabled={isDisable}
                                        type='submit'
                                        sx={{
                                            bgcolor: '#A54CE5',
                                            width: '100%',
                                            padding: '16.5px',
                                            borderRadius: '4px',
                                            color: '#fff',
                                            fontWeight: 500,
                                            fontSize: '15px'
                                        }}
                                    >
                                        CONTINUE
                                    </ButtonBase>
                                    <ButtonBase sx={{ float: 'right', mt: 2 }} onClick={() => router.push('/sign-in')}>
                                        Back to{' '}
                                        <Typography component='span' sx={{ color: '#A54CE5', ml: 0.6 }}>
                                            Sign in
                                        </Typography>
                                    </ButtonBase>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            )}
        </Box>
    );
};

export default SignIn;
