import { Box, Grid } from '@mui/material';
import CustomButton from 'components/Button';
import HeaderAuth from 'components/HeaderAuth';
import InputWithLabel from 'components/Input/InputWithLabel';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ResetPasswordConfirmation = () => {
    const [isDisable, setIsDisable] = useState<boolean>(true);

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

    const handleSubmit = (data: any) => {
        console.log(data);
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
                    <HeaderAuth title='Forgot Password' subTitle='Additional description if required' />
                    <Grid container mt='27px'>
                        <Grid item container xs={12} mb='37px'>
                            <Grid item xs={12} xl={7}>
                                <InputWithLabel
                                    isMultiline={false}
                                    name='password'
                                    form={form}
                                    label='New Password'
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
                                    label='Confirmation New Password'
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
                        <CustomButton title='SUBMIT' type='submit' isDisable={isDisable} />
                    </Box>
                    <Box ml='40px'>
                        <CustomButton
                            title='CANCEL'
                            border='1px solid #A54CE5'
                            backgroundColor='#fff'
                            color='#A54CE5'
                            onClick={handleCancel}
                        />
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default ResetPasswordConfirmation;
