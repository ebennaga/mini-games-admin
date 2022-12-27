import { Box, Paper, Typography } from '@mui/material';
import InputWithLabel from 'components/Input/InputWithLabel';
import React from 'react';
import { useForm } from 'react-hook-form';
import useNotify from 'hooks/useNotify';
import useAPICaller from 'hooks/useAPICaller';
import { useRouter } from 'next/router';
import CustomButton from 'components/Button';
import RadioButton from 'components/Radio/RadioV2';

const EditCompanyContainer = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            active: true,
            name: '',
            code: ''
        }
    });
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmitData = async (d: any) => {
        setIsLoading(true);
        try {
            const result = await fetchAPI({
                endpoint: 'companies',
                method: 'POST',
                data: {
                    name: d.name,
                    code: d.code,
                    is_active: d.is_active
                }
            });
            if (result.status === 200) {
                notify(result.data.message, 'success');
                setIsLoading(false);
                form.reset();
                router.push('/settings/company');
            }
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const handleAddSetActive = (event: any) => {
        form.setValue('active', event.target.checked);
    };

    const handleAddSetNotActive = () => {
        form.setValue('active', !form.watch('active'));
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ padding: '40px 25px', height: '100vh' }}>
                    <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                        <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Add Company</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                            Additional description if required
                        </Typography>
                    </Paper>
                    <Box sx={{ mt: '45px', width: '40%' }}>
                        <InputWithLabel
                            isRequired
                            foucused
                            labelField='Company Code'
                            name='code'
                            form={form}
                            type='text'
                            rules={{ required: true, maxLength: 100 }}
                            label='Code'
                            placeHolder='Max 100 Character'
                        />
                    </Box>
                    <Box sx={{ mt: '45px', width: '40%' }}>
                        <InputWithLabel
                            isRequired
                            foucused
                            labelField='Company Name'
                            name='name'
                            form={form}
                            type='text'
                            rules={{ required: true, maxLength: 100 }}
                            label='Name'
                            placeHolder='Max 100 Character'
                        />
                    </Box>
                    <Box sx={{ mt: '35px', width: '35%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <Box sx={{ width: '35%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Is Active</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        fontSize: '12px',
                                        position: 'relative',
                                        bottom: '-10px'
                                    }}
                                >
                                    *Field Required
                                </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <RadioButton
                                form={form}
                                name='active'
                                handleChange={handleAddSetActive}
                                rules={{ required: true }}
                                checked={form.watch('active')}
                                label='Yes'
                            />
                            <RadioButton
                                form={form}
                                name='active'
                                handleChange={handleAddSetNotActive}
                                rules={{ required: true }}
                                checked={!form.watch('active')}
                                label='No'
                            />
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center',
                        mt: '20px',
                        position: 'absolute',
                        bottom: '0px',
                        padding: '40px',
                        width: '100%'
                    }}
                >
                    <CustomButton
                        isLoading={isLoading}
                        type='submit'
                        padding='10px'
                        width='193px'
                        height='59px'
                        title='Submit'
                        backgroundColor='#A54CE5'
                    />
                    <CustomButton
                        onClick={() => {
                            // setCreateAcc(!createAcc);
                            router.push('/settings/company');
                        }}
                        padding='10px'
                        width='193px'
                        height='59px'
                        title='cancel'
                        backgroundColor='white'
                        color='#A54CE5'
                        border='1px solid #A54CE5'
                    />
                </Box>
            </Box>
        </form>
    );
};

export default EditCompanyContainer;
