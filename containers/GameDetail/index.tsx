/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
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
import { useRouter } from 'next/router';
import convertBase64 from 'helpers/convertBase64';

const AddGame = () => {
    const dataGenre = [
        { id: 1, title: 'Arcade' },
        { id: 2, title: 'RPG' },
        { id: 3, title: 'Racing' }
    ];

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isLoadingEdit, setIsLoadingEdit] = React.useState<boolean>(false);
    const [detailGame, setDetailGame] = React.useState<any>({});

    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const router = useRouter();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            title: '',
            url: '',
            description: '',
            image: '',
            genre: '',
            imageInput: ''
        }
    });

    const fetchDetailGame = async () => {
        setIsLoading(true);
        try {
            const { id } = router.query;
            const response = await fetchAPI({
                method: 'GET',
                endpoint: `games/${id}`
            });

            if (response.status === 200) {
                const { banner_url, name, description, game_url } = response.data.data;
                form.setValue('title', name);
                form.setValue('url', game_url);
                form.setValue('description', description);

                form.setValue('imageInput', banner_url);
                form.setValue('image', banner_url);
                setDetailGame(response.data.data);
            } else {
                notify(response.message, 'error');
            }
        } catch (err: any) {
            notify(err.mesage, 'error');
        }
        setIsLoading(false);
    };

    const handleSubmit = async (data: any) => {
        setIsLoadingEdit(true);
        try {
            const { description, genre, image, title, url } = data;
            const { description: descriptionGame, banner_url, name, game_url } = detailGame;

            const toBase64 = image && image !== banner_url ? await convertBase64(image) : null;

            let resData: any = {};

            resData = title && title !== name ? { ...resData, name: title } : { ...resData };
            resData = description && description !== descriptionGame ? { ...resData, description } : { ...resData };
            resData = url && url !== game_url ? { ...resData, game_url: url } : { ...resData };
            resData = image && image !== banner_url ? { ...resData, banner_url: toBase64 } : { ...resData };
            // resData = { ...resData, version: 1 };
            // resData = { ...resData, genre };

            if (Object.keys(resData).length > 0) {
                const response = await fetchAPI({
                    method: 'PUT',
                    endpoint: `games/${router.query.id}`,
                    data: resData
                });

                if (response.status === 200) {
                    notify('Successfully Edit Game!');
                    fetchDetailGame();
                } else {
                    notify(response.message, 'error');
                }
            } else {
                notify('No data has changed!', 'err');
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsLoadingEdit(false);
    };

    React.useEffect(() => {
        fetchDetailGame();
    }, []);

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
                                rules={{ required: true, minLength: 5, maxLength: 100 }}
                                placeholder='Max 100 Character'
                                form={form}
                                isLoading={isLoading}
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
                            <Input
                                name='url'
                                label='Url'
                                rules={{ required: true }}
                                placeholder='https://'
                                form={form}
                                isLoading={isLoading}
                            />
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
                                isLoading={isLoading}
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
                                isImage
                                name='image'
                                form={form}
                                label='Click to upload'
                                secondaryLabel='or drag and drop'
                                placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                                isLoading={isLoading}
                                rules={{ required: true }}
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
                                isLoading={isLoading}
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
                        {isLoadingEdit ? (
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Grid>
                        ) : (
                            <Grid item container xs={6}>
                                <Grid item xs={6} display='flex' alignItems='center' justifyContent='space-between'>
                                    <CustomButton type='submit' title='Edit' onClick={handleSubmit} />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomButton
                                        title='CANCEL'
                                        onClick={() => router.push('/games')}
                                        backgroundColor='#fff'
                                        border='1px solid #A54CE5'
                                        color='#A54CE5'
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddGame;
