import React from 'react';
import { Box, Grid, Typography, FormGroup, FormControlLabel, Checkbox, ButtonBase } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import Input from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';

const AddRole = () => {
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            code: '',
            name: '',
            description: '',
            isActive: true
        }
    });

    const handleChange = () => {
        const value = form.watch('isActive');
        form.setValue('isActive', !value);
    };

    const handleSubmit = async (data: any) => {
        try {
            console.log(data);
            const { name, code, description, isActive } = data;
            const response = await fetchAPI({
                method: 'POST',
                endpoint: 'roles',
                data: {
                    code,
                    name,
                    description,
                    is_active: isActive
                }
            });
            console.log('responsepostdata', response);
            if (response?.status === 200) {
                notify(response.data.message, 'success');
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    return (
        <Box>
            <HeaderChildren title='Add Role' subTitle='Additional description if required'>
                {' '}
            </HeaderChildren>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container color='rgba(0, 0, 0, 0.6)' mt={6}>
                    <Grid container item xs={12} spacing={3} mb={5}>
                        <Grid item xs={2} display='flex' justifyContent='space-between' alignItems='center'>
                            <Box alignItems='center'>
                                <Box>
                                    <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Roles Code</Typography>
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
                            </Box>
                            <Typography component='span' variant='h1' fontSize='16px' fontWeight={600}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                name='code'
                                form={form}
                                rules={{ required: true }}
                                placeholder='Enter role code'
                                label='Code'
                                borderColor='rgba(0, 0, 0, 0.9)'
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3} mb={5}>
                        <Grid item xs={2} display='flex' justifyContent='space-between' alignItems='center'>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Roles Name</Typography>
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
                            <Typography component='span' variant='h1' fontSize='16px' fontWeight={600}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                name='name'
                                form={form}
                                rules={{ required: true }}
                                placeholder='Enter role name'
                                label='Name'
                                borderColor='rgba(0, 0, 0, 0.9)'
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3} mb={5}>
                        <Grid item xs={2} display='flex' justifyContent='space-between' alignItems='center'>
                            <Box display='flex' alignItems='center'>
                                <Typography component='h3' variant='h1' fontSize='16px' fontWeight={600}>
                                    Role Description
                                </Typography>
                            </Box>
                            <Typography component='span' variant='h1' fontSize='16px' fontWeight={600}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                name='description'
                                form={form}
                                rules={{ required: true }}
                                placeholder='Enter role description'
                                label='Description'
                                borderColor='rgba(0, 0, 0, 0.9)'
                                isTextArea
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3} mb={5}>
                        <Grid item xs={2} display='flex' justifyContent='space-between' alignItems='center'>
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
                            <Typography component='span' variant='h1' fontSize='16px' fontWeight={600}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FormGroup
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' }
                                }}
                            >
                                <FormControlLabel
                                    control={<Checkbox checked={form.watch('isActive')} onChange={handleChange} />}
                                    label='Yes'
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={!form.watch('isActive')} onChange={handleChange} />}
                                    label='No'
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3} mt={15} mb={5} borderTop='1px solid rgba(0,0,0,0.2)'>
                        <Grid item xs={4} display='flex' gap='40px'>
                            <ButtonBase
                                type='submit'
                                sx={{
                                    width: '-webkit-fill-available',
                                    padding: '17px',
                                    borderRadius: '4px',
                                    bgcolor: '#A54CE5',
                                    color: '#fff'
                                }}
                            >
                                SUBMIT
                            </ButtonBase>
                            <ButtonBase
                                sx={{
                                    width: '-webkit-fill-available',
                                    padding: '17px',
                                    borderRadius: '4px',
                                    border: '1px solid #A54CE5',
                                    color: '#A54CE5'
                                }}
                            >
                                CANCEL
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddRole;
