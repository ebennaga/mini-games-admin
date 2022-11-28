import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Divider } from '@mui/material';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Button';
import InputUpload from 'components/Input/InputUpload';
import TitleCard from 'components/Layout/TitleCard';
import { useRouter } from 'next/router';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';

const unitList = [
    {
        value: 1,
        label: 'Unit 1'
    },
    {
        value: 2,
        label: 'Unit 2'
    }
];

const categoryList = [
    {
        value: 1,
        label: 'Baterai'
    },
    {
        value: 2,
        label: 'Category 2'
    }
];
interface AddPrizeProps {
    statusEdit?: boolean;
}
const AddPrize: React.FC<AddPrizeProps> = ({ statusEdit = false }) => {
    const rules = { required: true };
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const router = useRouter();
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            code: '',
            name: '',
            img: '',
            img2: '',
            img3: '',
            category: '',
            unit: '',
            qty: '',
            is_active: false
        }
    });
    const [checked, setChecked] = React.useState([true, false]);
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, false]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([false, event.target.checked]);
    };
    const getDataPrize = async () => {
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: `product-prizes/${router.query.id}`
            });
            if (response.status === 200) {
                form.setValue('name', response.data.data.name);
                form.setValue('code', response.data.data.code);
                form.setValue('unit', response.data.data.uom);
                form.setValue('category', response.data.data.category);
                // form.setValue('img', response.data.data.image_url_1);
                // form.setValue('img2', response.data.data.image_url_2);
                // form.setValue('img3', response.data.data.image_url_3);
                form.setValue('is_active', response.data.data.is_active);
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    const handlePUTSubmit = async () => {
        try {
            const response = await fetchAPI({
                method: 'PUT',
                endpoint: `/product-prizes/${router.query.id}`,
                data: {
                    code: form.watch('code'),
                    name: form.watch('name'),
                    category: categoryList[parseInt(form.watch('category'), 10) - 1].label,
                    uom: unitList[parseInt(form.watch('unit'), 10) - 1].label,
                    image_url_1: form.watch('img'),
                    image_url_2: form.watch('img2'),
                    image_url_3: form.watch('img3'),
                    is_active: checked[0] ? checked[0] : checked[1]
                }
            });

            if (response?.status === 200) {
                notify(response.data.message, 'success');
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };
    const handlePOSTSubmit = async () => {
        // console.log(`checking${categoryList[parseInt(form.watch('category'), 10) - 1].label}`);
        // form.watch('name');
        try {
            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/product-prizes',
                data: {
                    id: 2,
                    code: form.watch('code'),
                    name: form.watch('name'),
                    category: categoryList[parseInt(form.watch('category'), 10) - 1].label,
                    uom: unitList[parseInt(form.watch('unit'), 10) - 1].label,
                    image_url_1: form.watch('img'),
                    image_url_2: form.watch('img2'),
                    image_url_3: form.watch('img3'),
                    expired_at: '',
                    is_active: checked[0] ? checked[0] : checked[1]
                }
            });
            if (response?.status === 200) {
                // console.log(response);
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    React.useEffect(() => {
        if (statusEdit) {
            getDataPrize();
        }
    }, []);
    return (
        <Box component='section'>
            <TitleCard title='Add Prize' subtitle='Addtional description if required' isSearchExist={false} />
            <form onSubmit={form.handleSubmit(statusEdit ? handlePUTSubmit : handlePOSTSubmit)}>
                <Box sx={{ my: 3, mx: 2, width: '40%' }}>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Product Code'
                            name='code'
                            type='text'
                            form={form}
                            labelField='Code'
                            placeHolder='PC00001'
                            isSelectType={false}
                            isMultiline={false}
                            rules={rules}
                            isRequired
                        />
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Product Name'
                            name='name'
                            type='text'
                            rules={rules}
                            form={form}
                            labelField='Name'
                            placeHolder='Max 50 Character'
                            isSelectType={false}
                            isMultiline={false}
                            isRequired
                        />
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Product Category'
                            labelField='Category'
                            placeHolder='Select Category'
                            form={form}
                            name='category'
                            type='text'
                            isSelectType
                            rules={rules}
                            listSelect={categoryList}
                            isMultiline={false}
                            isRequired
                        />
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Uom'
                            labelField='Unit'
                            placeHolder='Select Unit'
                            form={form}
                            name='unit'
                            type='text'
                            isSelectType
                            listSelect={unitList}
                            rules={rules}
                            isMultiline={false}
                            isRequired
                        />
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Qty'
                            name='qty'
                            type='number'
                            rules={rules}
                            form={form}
                            labelField='Quantity'
                            placeHolder='Fill Amount'
                            isSelectType={false}
                            isMultiline={false}
                            isRequired
                        />
                    </Box>

                    <InputUpload isRequired label='Product Image 1' name='img' form={form} rules={rules} />
                    <InputUpload label='Product Image 2 -(Optional)' name='img2' form={form} />
                    <InputUpload label='Product Image 3 -(Optional)' name='img3' form={form} />

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
                        onClick={() => router.back()}
                        title='Cancel'
                        border='1px solid #A54CE5'
                        backgroundColor='white'
                        color='#A54CE5'
                    />
                </Box>
            </form>
        </Box>
    );
};

export default AddPrize;
