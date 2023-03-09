/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Divider } from '@mui/material';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Button';
// import InputUpload from 'components/Input/InputUpload';
import TitleCard from 'components/Layout/TitleCard';
import { useRouter } from 'next/router';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import InputDate from 'components/Input/InputDate';
import convertBase64 from 'helpers/convertBase64';
import InputImage from 'components/Input/InputImage';

const unitList = [
    { id: 'Pcs', label: 'Pcs' },
    { id: 'Unit', label: 'Unit' },
    { id: 'Bal', label: 'Bal' },
    { id: 'Dus', label: 'Dus' },
    { id: 'Meter', label: 'Meter' },
    { id: 'Galon', label: 'Galon' },
    { id: 'Pack', label: 'Pack' }
];

const categoryList = [
    { id: 'Gold', label: 'Gold' },
    { id: 'Game Console', label: 'Game Console' },
    { id: 'Accessories', label: 'Accessories' },
    { id: 'Voucher', label: 'Voucher' }
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
            expiredDate: '',
            is_active: false,
            poin: ''
        }
    });

    const [checked, setChecked] = React.useState([true, false]);
    const [dataDetail, setDataDetail] = React.useState<any>({});
    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);

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
                setDataDetail(response.data.data);
                form.setValue('name', response.data.data.name);
                form.setValue('code', response.data.data.code);
                form.setValue('unit', response.data.data.uom);
                form.setValue('category', response.data.data.category);
                form.setValue('img', response.data.data.image_url_1);
                form.setValue('img2', response.data.data.image_url_2);
                form.setValue('img3', response.data.data.image_url_3);
                form.setValue('is_active', response.data.data.is_active);
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    const handlePUTSubmit = async () => {
        setLoadingSubmit(true);
        try {
            const { img, img2, img3 } = form.watch();
            const { image_url_1, image_url_2, image_url_3 } = dataDetail;

            let payload: any = {
                code: form.watch('code'),
                name: form.watch('name'),
                category: form.watch('category'),
                uom: form.watch('unit'),
                is_active: !!checked[0],
                qty: form.watch('qty'),
                point: form.watch('poin'),
                expired_date: form.watch('expiredDate')
            };

            const image1: any = img !== image_url_1 ? await convertBase64(img) : null;
            const image2 = img2 !== image_url_2 ? await convertBase64(img2) : null;
            const image3 = img3 !== image_url_3 ? await convertBase64(img3) : null;
            payload = image1 ? { ...payload, image_url: image1 } : payload;
            payload = image1 ? { ...payload, image_url_2: image2 } : payload;
            payload = image1 ? { ...payload, image_url_3: image3 } : payload;

            const response = await fetchAPI({
                method: 'PUT',
                endpoint: `/product-prizes/${router.query.id}`,
                data: payload
            });

            if (response?.status === 200) {
                notify(response.data.message, 'success');
                form.reset();
                router.push('/settings/product-prizes');
            } else {
                notify(response?.data?.message, 'error');
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
        setLoadingSubmit(false);
    };

    const handlePOSTSubmit = async () => {
        setLoadingSubmit(true);
        try {
            const { img, img2, img3 } = form.watch();
            const image_url = await convertBase64(img);
            const image_url_2 = img2 ? await convertBase64(img2) : null;
            const image_url_3 = img3 ? await convertBase64(img3) : null;
            // console.log('category', categoryList, unitList);
            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/product-prizes',
                data: {
                    id: 2,
                    code: form.watch('code'),
                    name: form.watch('name'),
                    // category: categoryList[parseInt(form.watch('category'), 10) - 1].label,
                    category: form.watch('category'),
                    uom: form.watch('unit'),
                    // uom: unitList[parseInt(form.watch('unit'), 10) - 1].label,
                    image_url,
                    image_url_2,
                    image_url_3,
                    expired_at: form.watch('expiredDate'),
                    is_active: checked[0] ? checked[0] : checked[1]
                }
            });

            if (response?.status === 200) {
                notify(response.data.message);
                form.reset();
                router.push('/settings/product-prizes');
            } else {
                notify(response?.data?.message, 'error');
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
        setLoadingSubmit(false);
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
                            // label='Product Category'
                            // labelField='Category'
                            // placeHolder='Select Category'
                            // form={form}
                            // name='category'
                            // type='text'
                            // isSelectType
                            // rules={rules}
                            // listSelect={categoryList}
                            // isMultiline={false}
                            // isRequired
                            label='Product Category'
                            name='category'
                            type='text'
                            form={form}
                            labelField='Mode'
                            placeHolder='Select Category'
                            isSelectType
                            listSelect={categoryList}
                            isMultiline={false}
                            rules={rules}
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
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Expired Date</Typography>
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
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <InputDate rules={{ required: true }} label='Expired Date' type='date' form={form} name='expiredDate' />
                            </Box>
                        </Box>
                    </Box>

                    {/* <InputUpload isRequired label='Product Image 1' name='img' form={form} rules={rules} />
                    <InputUpload label='Product Image 2 -(Optional)' name='img2' form={form} />
                    <InputUpload label='Product Image 3 -(Optional)' name='img3' form={form} /> */}
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Product Image 1</Typography>
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
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <InputImage
                                    name='img'
                                    form={form}
                                    label='Click to upload'
                                    secondaryLabel='or drag and drop'
                                    placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                                    rules={{ required: true }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Product Image 2</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        fontSize: '12px',
                                        position: 'relative',
                                        bottom: '-10px'
                                    }}
                                >
                                    (Optional)
                                </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '70%' }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <InputImage
                                    name='img2'
                                    form={form}
                                    label='Click to upload'
                                    secondaryLabel='or drag and drop'
                                    placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Product Image 3</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        fontSize: '12px',
                                        position: 'relative',
                                        bottom: '-10px'
                                    }}
                                >
                                    (Optional)
                                </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '70%' }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <InputImage
                                    name='img3'
                                    form={form}
                                    label='Click to upload'
                                    secondaryLabel='or drag and drop'
                                    placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Point'
                            name='poin'
                            type='number'
                            rules={rules}
                            form={form}
                            labelField='Point'
                            placeHolder='Point'
                            isSelectType={false}
                            isMultiline={false}
                            isRequired
                        />
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
                    <CustomButton type='submit' isLoading={loadingSubmit} />
                    {!loadingSubmit && (
                        <CustomButton
                            onClick={() => router.back()}
                            title='Cancel'
                            border='1px solid #A54CE5'
                            backgroundColor='white'
                            color='#A54CE5'
                        />
                    )}
                </Box>
            </form>
        </Box>
    );
};

export default AddPrize;
