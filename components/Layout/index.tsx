import React from 'react';
import { Box } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import InputWithLabel from 'components/Input/InputWithLabel';

const Layout = () => {
    // const form = useForm({
    //     mode: 'all',
    //     defaultValues: {
    //         email: ''
    //     }
    // });
    return (
        <Box>
            <img src='/images/logo.png' alt='Prize Play' width='99.89px' height='46.56px' />
            {/* <InputWithLabel form={form} name='email' type='email' rules={{ required: true }} /> */}
        </Box>
    );
};

export default Layout;
