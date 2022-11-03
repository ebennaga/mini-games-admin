import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Divider } from '@mui/material';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Button';
import InputUpload from 'components/Input/InputUpload';
import TitleCard from 'components/Layout/TitleCard';

const AddPrize = () => {
    const form = useForm();
    const [checked, setChecked] = React.useState([true, false]);

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, false]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([false, event.target.checked]);
    };

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
            label: 'Category 1'
        },
        {
            value: 2,
            label: 'Category 2'
        }
    ];
    return (
        <Box component='section'>
            <TitleCard title='Add Prize' subtitle='Addtional description if required' isSearchExist={false} />
            <Box sx={{ my: 3, mx: 2 }}>
                <InputWithLabel
                    label='Product Code'
                    name='code'
                    type='text'
                    form={form}
                    labelField='Code'
                    placeHolder='PC00001'
                    isSelectType={false}
                />
                <InputWithLabel
                    label='Product Name'
                    name='name'
                    type='text'
                    rules='required'
                    form={form}
                    labelField='Name'
                    placeHolder='Max 50 Character'
                    isSelectType={false}
                />
                <InputWithLabel
                    label='Product Category'
                    labelField='Category'
                    placeHolder='Select Category'
                    form={form}
                    name='category'
                    type='text'
                    isSelectType
                    rules='required'
                    listSelect={categoryList}
                />
                <InputWithLabel
                    label='Uom'
                    labelField='Unit'
                    placeHolder='Select Unit'
                    form={form}
                    name='unit'
                    type='text'
                    isSelectType
                    listSelect={unitList}
                    rules='required'
                />
                <InputWithLabel
                    label='Qty'
                    name='qty'
                    type='number'
                    form={form}
                    labelField='Quantity'
                    placeHolder='Fill Amount'
                    isSelectType={false}
                />
                <InputUpload label='Product Image 1' />
                <InputUpload label='Product Image 2 -(Optional)' />
                <InputUpload label='Product Image 3 -(Optional)' />

                <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Is Active</Typography>
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
                <CustomButton />
                <CustomButton title='Cancel' border='1px solid #A54CE5' backgroundColor='white' color='#A54CE5' />
            </Box>
        </Box>
    );
};

export default AddPrize;
