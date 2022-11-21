import { Box, Grid, ButtonBase } from '@mui/material';
import CustomButton from 'components/Button';
import HeaderAuth from 'components/HeaderAuth';
import InputWithLabel from 'components/Input/InputWithLabel';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import useAuthReducer from 'hooks/useAuthReducer';

const SignIn = () => {
    const router = useRouter();
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { fetchAPI } = useAPICaller();
    const { setUser } = useAuthReducer();
    const notify = useNotify();
    const form = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            password: ''
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
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/auths/login',
                data: {
                    email: data.email,
                    password: data.password
                }
            });
            if (response?.status === 200) {
                setUser(response?.data.data);
                notify(response?.data.message, 'success');
                router.push('/');
            }
            setIsLoading(false);
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (form.watch('password').length > 4) {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [form.watch('password')]);

    return (
        <Box component='main' sx={{ width: '100%', height: '95vh', position: 'relative' }}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box padding='95px 40px'>
                    <HeaderAuth title='Sign In into Admin Prizeplay' subTitle='Additional description if required' />
                    <Grid container mt='27px'>
                        <Grid item container xs={12} mb='37px'>
                            <Grid item xs={12} xl={7}>
                                <InputWithLabel
                                    isMultiline={false}
                                    name='email'
                                    form={form}
                                    label='Email Address'
                                    type='email'
                                    rules={{ validate: ruleEmail }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} mb='37px'>
                            <Grid item xs={12} xl={7}>
                                <InputWithLabel
                                    isMultiline={false}
                                    name='password'
                                    form={form}
                                    label='Password'
                                    type='password'
                                    rules={{ required: true }}
                                />
                                <ButtonBase
                                    onClick={() => router.push('/reset-password')}
                                    sx={{ color: '#A54CE5', fontSize: '14px', fontWeight: 400, float: 'right', mt: 5 }}
                                >
                                    Forgot Password?
                                </ButtonBase>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        padding: '40px 39px',
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        position: 'absolute',

                        bottom: 0,
                        width: '100%'
                    }}
                >
                    <Box>
                        <CustomButton isLoading={isLoading} title='SIGN IN' type='submit' isDisable={isDisable} />
                    </Box>
                    {/* <Box ml='40px'>
                        <CustomButton
                            title='SIGN UP'
                            border='1px solid #A54CE5'
                            backgroundColor='#fff'
                            color='#A54CE5'
                            onClick={() => router.push('/sign-up')}
                        />
                    </Box> */}
                </Box>
            </form>
        </Box>
    );
};

export default SignIn;
