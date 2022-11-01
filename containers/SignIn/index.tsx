import { Box, Grid, ButtonBase } from '@mui/material';
import CustomButton from 'components/Button';
import HeaderAuth from 'components/HeaderAuth';
import InputWithLabel from 'components/Input/InputWithLabel';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const SignIn = () => {
    const router = useRouter();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const rulePassword = (key: any) => {
        const regEx = /^[0-9]*$/;
        if (key.length > 7 && !regEx.test(key)) {
            return true;
        }
        return 'At least 8 characters. Cannot be all numbers';
    };

    const ruleEmail = (key: any) => {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (pattern.test(key)) {
            return true;
        }
        return 'Email is not valid!';
    };

    const handleSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Box component='main'>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box padding='95px 40px'>
                    <HeaderAuth title='Sign Up into Admin Prizeplay' subTitle='Additional description if required' />
                    <Grid container mt='27px'>
                        <Grid item container xs={12} mb='37px'>
                            <Grid item xs={12} xl={6}>
                                <InputWithLabel
                                    name='email'
                                    form={form}
                                    label='Email Address'
                                    type='email'
                                    rules={{ validate: ruleEmail }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} mb='37px'>
                            <Grid item xs={12} xl={6}>
                                <InputWithLabel
                                    name='password'
                                    form={form}
                                    label='Password'
                                    type='password'
                                    rules={{ required: true, validate: rulePassword }}
                                />
                                <ButtonBase sx={{ color: '#A54CE5', fontSize: '14px', fontWeight: 400, float: 'right', mt: 5 }}>
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
                        width: '100%',
                        bottom: 0
                    }}
                >
                    <Box>
                        <CustomButton title='SIGN iN' type='submit' />
                    </Box>
                    <Box ml='40px'>
                        <CustomButton
                            title='SIGN UP'
                            border='1px solid #A54CE5'
                            backgroundColor='#fff'
                            color='#A54CE5'
                            onClick={() => router.push('/sign-up')}
                        />
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default SignIn;
