import React from 'react';
import { Box, FormControlLabel, Typography, FormGroup, Checkbox, Divider } from '@mui/material';
import TitleCard from 'components/Layout/TitleCard';
import InputWithLabel from 'components/Input/InputWithLabel';
import InputUpload from 'components/Input/InputUpload';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Button';
import { useRouter } from 'next/router';

const AddBanner = () => {
    const rules = { required: true };
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            title: '',
            img: '',
            desc: ''
        }
    });
    const router = useRouter();
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, false]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([false, event.target.checked]);
    };

    const handleSubmit = () => {};

    return (
        <Box component='section'>
            <TitleCard title='Add Banner' subtitle='Addtional description if required' isSearchExist={false} />
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
                        label='Description'
                        name='desc'
                        type='text'
                        form={form}
                        labelField='Description'
                        rules={rules}
                        placeHolder='Fill description'
                        isSelectType={false}
                        isMultiline
                    />
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    </Box>
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
                    <CustomButton type='submit' />
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

export default AddBanner;
