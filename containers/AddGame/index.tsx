/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import Input from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import InputImage from 'components/Input/InputImage';
import InputSelect from 'components/Input/InputSelect';
import CustomButton from 'components/Button';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import convertBase64 from 'helpers/convertBase64';
import { useRouter } from 'next/router';

const AddGame = () => {
    const dataGenre = [
        { id: 1, title: 'Real Time Strategy (RTS)' },
        { id: 2, title: 'First Persan Shooter (FPS)' },
        { id: 3, title: 'Simulation' },
        { id: 4, title: 'Arcade' }
    ];

    const [isLoading, setisLoading] = React.useState<boolean>(false);

    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const router = useRouter();
    const rules = { required: true };

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

    const handleSubmit = async (data: any) => {
        setisLoading(true);
        try {
            const { description, genre, image, title, url } = data;

            const imgBase64 = await convertBase64(image);

            const resultGenre = dataGenre.filter((i: any) => i.id === genre);
            const response = await fetchAPI({
                method: 'POST',
                endpoint: 'games',
                data: {
                    name: title,
                    description,
                    game_url: url,
                    version: 1,
                    banner_url: imgBase64,
                    genre: resultGenre[0].title
                }
            });

            if (response.status === 200) {
                notify(response.data.message, 'success');
                router.push('/games');
                form.reset();
            } else {
                notify(response.message, 'error');
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setisLoading(false);
    };

    return (
        <Box>
            <HeaderChildren title='Add Game' subTitle='Additional description if required'>{` `}</HeaderChildren>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container mt='37px' color='rgba(0, 0, 0, 0.6)'>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Game Title</Typography>
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
                                rules={{ required: true, minLength: 6, maxLength: 100 }}
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
                            <Input name='description' label='Description' placeholder='Game Description' form={form} isTextArea />
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
                                isImage
                                rules={rules}
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
                            <InputSelect
                                form={form}
                                name='genre'
                                dataSelect={dataGenre}
                                title='Genre'
                                placeholder='Select Genre'
                                rules={{ required: true }}
                            />
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
                        <Grid item container xs={12} md={6} lg={4}>
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <Grid item xs={6} display='flex' alignItems='center' justifyContent='space-between'>
                                        <CustomButton type='submit' title='RELEASE' />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomButton
                                            title='BACK'
                                            onClick={() => router.push('/games')}
                                            backgroundColor='#fff'
                                            border='1px solid #A54CE5'
                                            color='#A54CE5'
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddGame;
