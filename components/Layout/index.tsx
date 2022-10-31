import React from 'react';
import { Box } from '@mui/material';
// import InputSearch from 'components/Input/InputSearch';
// import { useForm } from 'react-hook-form';
// import InputWithLabel from 'components/Input/InputWithLabel';

const Layout = () => {
    // const form = useForm({
    //     mode: 'all',
    //     defaultValues: {
    //         search: ''
    //     }
    // });
    return (
        <Box>
            <img src='/images/logo.png' alt='Prize Play' width='99.89px' height='46.56px' />
            {/* <Box sx={{ mt: '10px' }}>
                <InputSearch form={form} label='Search' name='search' />
            </Box> */}
        </Box>
    );
};

export default Layout;
