import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import Input from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import InputImage from 'components/Input/InputImage';
import InputSelect from 'components/Input/InputSelect';
import CustomButton from 'components/Button';

const AddGame = () => {
    const dataGenre = [
        { id: 1, title: 'Arcade' },
        { id: 2, title: 'RPG' },
        { id: 3, title: 'Racing' }
    ];

    const form = useForm({
        mode: 'all',
        defaultValues: {
            title: '',
            url: '',
            description: '',
            image: '',
            genre: ''
        }
    });

    const handleSubmit = (data: any) => {
        console.log('response', data);
    };

    return (
        <Box>
            <HeaderChildren title='Edit Game Detail' subTitle='Additional description if required'>{` `}</HeaderChildren>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container mt='37px' color='rgba(0, 0, 0, 0.6)'>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Game Detail</Typography>
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
                            <Typography component='h3' fontSize='15px' fontWeight={500}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                name='title'
                                label='Title'
                                rules={{ minLength: 5, maxLength: 100 }}
                                placeholder='Max 100 Character'
                                form={form}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Game Url</Typography>
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
                            <Typography component='h3' fontSize='15px' fontWeight={500}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Input name='url' label='Url' rules={{ required: true }} placeholder='https://' form={form} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography component='h3' fontSize='15px' fontWeight={500}>
                                Short Description
                            </Typography>
                            <Typography component='h3' fontSize='15px' fontWeight={500}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Input
                                name='description'
                                label='Description'
                                rules={{ required: true }}
                                placeholder='Game Description'
                                form={form}
                                isTextArea
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Game Cover</Typography>
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
                            <Typography component='h3' fontSize='15px' fontWeight={500}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <InputImage
                                name='image'
                                form={form}
                                label='Click to upload'
                                secondaryLabel='or drag and drop'
                                placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Genre</Typography>
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
                            <Typography component='h3' fontSize='15px' fontWeight={500}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <InputSelect form={form} name='genre' dataSelect={dataGenre} title='Genre' placeholder='Select Genre' />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        display='flex'
                        alignItems='center'
                        spacing={3}
                        mb='37px'
                        mt='70px'
                        pt='30px'
                        borderTop='1px solid rgba(0,0,0,0.5)'
                    >
                        <Grid item container xs={6}>
                            <Grid item xs={6} display='flex' alignItems='center' justifyContent='space-between'>
                                <CustomButton type='submit' title='Edit' />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomButton
                                    title='CANCEL'
                                    onClick={undefined}
                                    backgroundColor='#fff'
                                    border='1px solid #A54CE5'
                                    color='#A54CE5'
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddGame;
