import React from 'react';
import { Box, FormControlLabel, Typography, FormGroup, Checkbox, Divider } from '@mui/material';
import TitleCard from 'components/Layout/TitleCard';
import InputWithLabel from 'components/Input/InputWithLabel';
// import InputUpload from 'components/Input/InputUpload';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Button';
import { useRouter } from 'next/router';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import InputImage from 'components/Input/InputImage';
import RadioButton from 'components/Radio/RadioV2';
import convertBase64 from 'helpers/convertBase64';

const AddBanner = () => {
    const rules = { required: true };
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            title: '',
            img: '',
            desc: '',
            isActive: true,
            link: ''
        }
    });
    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    // const [checked, setChecked] = React.useState([true, false]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    // const [value, setValue] = React.useState('female');

    // const handleChange = (event: any) => {
    //     // console.log(event.target.checked);
    //     form.setValue('isActive', event.target.value);
    // };
    const handleAddSetActive = (event: any) => {
        // setIsValue(true);
        form.setValue('isActive', event.target.checked);
    };

    const handleAddSetNotActive = () => {
        // setIsValue(true);
        form.setValue('isActive', !form.watch('isActive'));
    };

    // const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked([event.target.checked, false]);
    // };

    // const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked([false, event.target.checked]);
    // };

    const handleSubmit = async (data: any) => {
        // const { isActive, title, img, link, desc: description } = data;
        const { isActive, title, img, link } = data;
        setIsLoading(true);
        try {
            const imgToBase64 = await convertBase64(img);
            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/banners',
                data: {
                    title,
                    link,
                    image_url: imgToBase64,
                    // description,
                    is_active: isActive
                }
            });
            if (response?.status === 200) {
                setIsLoading(false);
                notify('Banner added successfully', 'success');
                form.reset();
            }
            setIsLoading(false);
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
    };
    // console.log(form.watch('isActive'));
    return (
        <Box component='section'>
            <TitleCard title='Add Banner' subtitle='Addtional description if required' isSearchExist={false} />
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box sx={{ my: 3, mx: 2 }}>
                    <Box sx={{ width: '30%' }}>
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
                    </Box>

                    {/* <InputUpload isRequired label='Banner Image' name='img' form={form} rules={rules} /> */}
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: '', alignItems: 'center' }}>
                        <Box sx={{ width: '8.5%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
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
                        <Box sx={{ width: '21.2%' }}>
                            <InputImage
                                rules={rules}
                                isImage
                                name='img'
                                form={form}
                                label='Banner Image'
                                secondaryLabel='or drag and drop'
                                placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                            />
                        </Box>
                    </Box>
                    <Box sx={{ width: '30%' }}>
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
                    </Box>
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'baseline', alignItems: '' }}>
                        <Box sx={{ width: '8.5%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
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
                        <Box sx={{ width: '30%' }}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox color='secondary' defaultChecked />} label='Home' />
                                <FormControlLabel control={<Checkbox color='secondary' />} label='Redeem Prizes' />
                                <FormControlLabel control={<Checkbox color='secondary' />} label='Lucky Raffle' />
                            </FormGroup>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'baseline', alignItems: 'center' }}>
                        <Box sx={{ width: '8.5%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
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
                        <Box sx={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <RadioButton
                                form={form}
                                name='isActive'
                                handleChange={handleAddSetActive}
                                rules={{ required: true }}
                                checked={form.watch('isActive')}
                                label='Yes'
                            />
                            <RadioButton
                                form={form}
                                name='isActive'
                                handleChange={handleAddSetNotActive}
                                rules={{ required: true }}
                                checked={!form.watch('isActive')}
                                label='No'
                            />
                            {/* <FormGroup row>
                                <RadioGroup
                                    aria-labelledby='demo-controlled-radio-buttons-group'
                                    name='controlled-radio-buttons-group'
                                    value={form.watch('isActive')}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel
                                        value='true'
                                        // control={<Checkbox color='secondary' checked={checked[0]} onChange={handleChange1} />}
                                        control={<Radio color='secondary' />}
                                        label='Yes'
                                    />
                                    <FormControlLabel
                                        value='false'
                                        // control={<Checkbox color='secondary' checked={!checked[0]} onChange={handleChange2} />}
                                        control={<Radio color='secondary' />}
                                        label='No'
                                    />
                                </RadioGroup>
                            </FormGroup> */}
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

export default AddBanner;
