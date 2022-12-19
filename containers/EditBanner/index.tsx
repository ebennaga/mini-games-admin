/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Divider, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import CustomButton from 'components/Button';
import TitleCard from 'components/Layout/TitleCard';
import InputWithLabel from 'components/Input/InputWithLabel';
import InputUpload from 'components/Input/InputUpload';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import { useRouter } from 'next/router';

const EditBanner = () => {
    const rules = { required: true };
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            title: '',
            img: '',
            link: '',
            isActive: true
        }
    });
    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const [checked, setChecked] = React.useState([true, false]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState(false);

    const fetchDetailBanners = async () => {
        try {
            const result = await fetchAPI({
                method: 'GET',
                endpoint: `banners/${router.query.id}`
            });
            console.log('result', result);
            if (result.status === 200) {
                form.setValue('title', result.data.data.title);
                // form.setValue('img', result.data.data.image_url);
                form.setValue('link', result.data.data.link);
                form.setValue('isActive', result.data.data.is_active);
            }
            setIsLoading(false);
        } catch (err: any) {
            notify(err.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };
    const handleChange1 = () => {
        const value = form.watch('isActive');
        form.setValue('isActive', !value);
    };

    const handleChange2 = () => {
        const value = form.watch('isActive');
        form.setValue('isActive', !value);
    };

    React.useEffect(() => {
        fetchDetailBanners();
    }, []);

    const handleSubmit = async (d: any) => {
        setLoadingSubmit(true);
        try {
            const result = await fetchAPI({
                endpoint: `banners/${router.query.id}`,
                method: 'PUT',
                data: {
                    title: d.title,
                    is_active: d.is_active,
                    img: d.image_url
                }
            });

            if (result.status === 200) {
                notify('update banner successfully', 'success');
                setLoadingSubmit(false);
            }
        } catch (err: any) {
            notify(err.message, 'error');
            setLoadingSubmit(false);
        }
    };

    return (
        <Box component='section'>
            <TitleCard title='Edit Banner' subtitle='Addtional description if required' isSearchExist={false} />
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box sx={{ my: 3, mx: 2 }}>
                    <InputWithLabel
                        label='Banner Title'
                        name='title'
                        type='text'
                        form={form}
                        labelField='Title'
                        placeHolder='Max 100 Character'
                        rules={rules}
                        isSelectType={false}
                        isMultiline={false}
                        isRequired
                    />
                    <InputUpload isRequired label='Banner Image' name='img' form={form} rules={rules} />
                    <InputWithLabel
                        label='Show To'
                        name='link'
                        type='text'
                        form={form}
                        labelField='Link'
                        rules={rules}
                        placeHolder=''
                        isSelectType={false}
                        isMultiline
                        isRequired
                    />
                    {/* <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Show to</Typography>
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
                        <Box sx={{ width: '70%' }}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label='Home' />
                                <FormControlLabel control={<Checkbox />} label='Redeem Prizes' />
                                <FormControlLabel control={<Checkbox />} label='Lucky Raffle' />
                            </FormGroup>
                        </Box>
                    </Box> */}
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
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
                        <Box sx={{ width: '70%' }}>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox checked={checked[0]} onChange={handleChange1} />} label='Yes' />
                                <FormControlLabel control={<Checkbox checked={checked[1]} onChange={handleChange2} />} label='No' />
                            </FormGroup>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', my: 3, mx: 5, gap: 3 }}>
                    <CustomButton type='submit' isLoading={isLoading} />
                    <CustomButton
                        title='Cancel'
                        border='1px solid #A54CE5'
                        backgroundColor='white'
                        color='#A54CE5'
                        onClick={() => router.back()}
                    />
                </Box>
            </form>
        </Box>
    );
};

export default EditBanner;
