/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, TextField, Stack, ButtonBase, Typography, CircularProgress } from '@mui/material';
import Image from 'next/image';
import FieldRequired from 'components/FieldRequired';
import InputDate from './InputDate';
import Input from './Input';

interface InputExchangeRatesProps {
    nameName: string;
    effectiveName: string;
    coinsName: string;
    idrName: string;
    descriptionName: string;
    form: any;
    handleSubmit: any;
    loadingSubmit: boolean;
}

const InputExchangeRates: React.FC<InputExchangeRatesProps> = ({
    nameName,
    effectiveName,
    coinsName,
    idrName,
    descriptionName,
    form,
    handleSubmit,
    loadingSubmit
}) => {
    const values = {
        someDate: '2017-05-24'
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box sx={{ width: '100%' }}>
                <Stack direction='row' spacing={30}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography component='h3' fontSize='16px' fontWeight={600}>
                            Effective
                        </Typography>
                        <FieldRequired />
                    </Box>
                    <Box sx={{ width: '30%' }}>
                        <InputDate label='Effective Date' type='date' form={form} name={effectiveName} rules={{ required: true }} />
                    </Box>
                </Stack>
                <Stack direction='row' spacing={30} sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography component='h3' fontSize='16px' fontWeight={600}>
                            Name
                        </Typography>
                        <FieldRequired />
                    </Box>
                    <Box sx={{ width: '30%' }}>
                        <Input
                            isColor
                            type='text'
                            rules={{ required: true }}
                            form={form}
                            name={nameName}
                            label='Name'
                            placeholder='Enter Name'
                        />
                    </Box>
                </Stack>
                <Stack direction='row' spacing={30} sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography component='h3' fontSize='16px' fontWeight={600}>
                            Coins
                        </Typography>
                        <FieldRequired />
                    </Box>
                    <Box sx={{ width: '30%' }}>
                        <Input
                            isColor
                            type='number'
                            rules={{ required: true }}
                            form={form}
                            name={coinsName}
                            label='Amount'
                            placeholder='Enter Amount'
                            startAdornment={
                                <img src='/images/coin.png' alt='coins' width={20} height={20} style={{ marginRight: '9px' }} />
                            }
                        />
                    </Box>
                </Stack>
                <Stack direction='row' spacing={24} sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography component='h3' fontSize='16px' fontWeight={600}>
                            Indonesia Rupiah
                        </Typography>
                        <FieldRequired />
                    </Box>
                    <Box sx={{ width: '30%' }}>
                        <Input
                            isColor
                            type='number'
                            rules={{ required: true }}
                            form={form}
                            name={idrName}
                            label='IDR'
                            placeholder='Enter Amount'
                            startAdornment={
                                <Typography component='span' fontSize='16px' fontWeight={900} sx={{ color: '#A54CE5', mr: '7px' }}>
                                    RP
                                </Typography>
                            }
                        />
                    </Box>
                </Stack>
                <Stack direction='row' spacing={24} sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography component='h3' fontSize='16px' fontWeight={600}>
                            Indonesia Rupiah
                        </Typography>
                        <FieldRequired />
                    </Box>
                    <Box sx={{ width: '30%' }}>
                        <Input
                            isColor
                            isTextArea
                            type='text'
                            rules={{ required: true }}
                            form={form}
                            name={descriptionName}
                            label='Description'
                            placeholder='Enter Description'
                        />
                    </Box>
                </Stack>
                <Stack direction='row' spacing={5} sx={{ mt: 50 }}>
                    {loadingSubmit ? (
                        <CircularProgress sx={{ ml: 5, color: '#A54CE5' }} />
                    ) : (
                        <>
                            <ButtonBase
                                disabled={loadingSubmit}
                                type='submit'
                                sx={{ background: '#A54CE5', borderRadius: '4px', width: '150px', height: '60px' }}
                            >
                                <Typography sx={{ color: '#ffffff' }}>Submit</Typography>
                            </ButtonBase>
                            <ButtonBase
                                disabled={loadingSubmit}
                                sx={{
                                    background: '#ffffff',
                                    border: '1px solid #A54CE5',
                                    borderRadius: '4px',
                                    width: '150px',
                                    height: '60px'
                                }}
                            >
                                <Typography sx={{ color: '#A54CE5' }}>Cancel</Typography>
                            </ButtonBase>
                        </>
                    )}
                </Stack>
            </Box>
        </form>
    );
};

export default InputExchangeRates;
