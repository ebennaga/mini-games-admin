import React from 'react';
import { Box, TextField, Stack, ButtonBase, Typography } from '@mui/material';
import Image from 'next/image';

const InputExchangeRates = () => {
    const values = {
        someDate: '2017-05-24'
    };
    return (
        // <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //     <Box>adad</Box>
        //     <TextField
        //         name='someDate'
        //         label='Effective Date'
        //         InputLabelProps={{ shrink: true, required: true }}
        //         type='date'
        //         defaultValue={values.someDate}
        //     />
        // </Box>
        <Box sx={{ width: '100%' }}>
            <Stack direction='row' spacing={30}>
                <Box>Effective</Box>
                <TextField
                    sx={{ width: '30%' }}
                    name='someDate'
                    label='Effective Date'
                    InputLabelProps={{ shrink: true, required: true }}
                    type='date'
                    defaultValue={values.someDate}
                />
            </Stack>
            <Stack direction='row' spacing={32} sx={{ mt: 4 }}>
                <Box>Coins</Box>
                <TextField
                    sx={{ width: '30%' }}
                    name='Enter Amount'
                    label='Enter Amount'
                    InputProps={{
                        // eslint-disable-next-line jsx-a11y/alt-text
                        // startAdornment: <img src='/icons/navbar/account.png' />
                        startAdornment: <Image src='/images/coin.png' alt='picture' width={20} height={20} />
                    }}
                />
            </Stack>
            <Stack direction='row' spacing={22} sx={{ mt: 4 }}>
                <Box>Indonesia Rupiah</Box>
                <TextField
                    sx={{ width: '30%' }}
                    name='Enter Amount'
                    label='IDR'
                    InputProps={{
                        // eslint-disable-next-line jsx-a11y/alt-text
                        // startAdornment: <img src='/icons/navbar/account.png' />
                        startAdornment: <Image src='/images/Rp.png' alt='picture' width={20} height={20} />
                    }}
                />
            </Stack>
            <Stack direction='row' spacing={5} sx={{ mt: 50 }}>
                <ButtonBase sx={{ background: '#A54CE5', borderRadius: '4px', width: '150px', height: '60px' }}>
                    <Typography sx={{ color: '#ffffff' }}>Submit</Typography>
                </ButtonBase>
                <ButtonBase
                    sx={{ background: '#ffffff', border: '1px solid #A54CE5', borderRadius: '4px', width: '150px', height: '60px' }}
                >
                    <Typography sx={{ color: '#A54CE5' }}>Cancel</Typography>
                </ButtonBase>
            </Stack>
        </Box>
    );
};

export default InputExchangeRates;
