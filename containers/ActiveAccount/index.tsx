import { Box, Grid } from '@mui/material';
import CustomButton from 'components/Button';
import HeaderAuth from 'components/HeaderAuth';
import InputWithLabel from 'components/Input/InputWithLabel';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import { useRouter } from 'next/router';

const ActiveAccount = () => {
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const router = useRouter();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    const rulePassword = (key: any) => {
        const regEx = /^[0-9]*$/;
        if (key.length > 7 && !regEx.test(key)) {
            return true;
        }
        return 'At least 8 characters. Cannot be all numbers';
    };

    const ruleConfirmPassword = (key: any) => {
        if (key === form.watch('password') && form.watch('password')) {
            setIsDisable(false);
            return true;
        }
        return 'The password confirmation does not match!';
    };

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const { token } = router.query;

            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/auths/activate',
                data: {
                    password: data.password,
                    password_confirmation: data.confirmPassword,
                    activate_token: token
                }
            });
            if (response?.status === 200) {
                notify('Successfully actived account');
                router.push('/');
            } else {
                notify(response?.data?.message, 'error');
            }
            setIsLoading(false);
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const handleCancel = () => {
        form.setValue('password', '');
        form.setValue('confirmPassword', '');
    };

    useEffect(() => {
        if (form.watch('password').length > 4) {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }
    }, [form.watch('password')]);

    return (
        <Box component='main'>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box padding='95px 40px'>
                    <HeaderAuth title='Set Password' subTitle='Additional description if required' />
                    <Grid container mt='27px'>
                        <Grid item container xs={12} mb='37px'>
                            <Grid item xs={12} xl={7}>
                                <InputWithLabel
                                    isMultiline={false}
                                    name='password'
                                    form={form}
                                    label='Password'
                                    type='password'
                                    rules={{ required: true, validate: rulePassword }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} mb='37px'>
                            <Grid item xs={12} xl={7}>
                                <InputWithLabel
                                    isMultiline={false}
                                    name='confirmPassword'
                                    form={form}
                                    label='Confirmation Password'
                                    type='password'
                                    rules={{ required: true, validate: ruleConfirmPassword }}
                                />
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
                        <CustomButton isDisable={isDisable} isLoading={isLoading} title='SUBMIT' type='submit' />
                    </Box>
                    {!isLoading && (
                        <Box ml='40px'>
                            <CustomButton
                                title='CANCEL'
                                border='1px solid #A54CE5'
                                backgroundColor='#fff'
                                color='#A54CE5'
                                onClick={handleCancel}
                            />
                        </Box>
                    )}
                </Box>
            </form>
        </Box>
    );
};

export default ActiveAccount;
