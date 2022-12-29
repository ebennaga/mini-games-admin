import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
// import { CheckCircle, Circle, Close, UploadFile } from '@mui/icons-material';
// import Image from 'next/image';
import InputImage from 'components/Input/InputImage';
import Input from 'components/Input/Input';
import CustomButton from 'components/Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import convertBase64 from 'helpers/convertBase64';

interface CreateBlogsProps {}

const CreateBlogs: React.FC<CreateBlogsProps> = () => {
    const rules = { required: true };
    const form = useForm({
        mode: 'all',
        defaultValues: {
            blogsTitle: '',
            acc: 'Owikun',
            image: '',
            description: ''
        }
    });
    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const imgBase64 = await convertBase64(data.image);

            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/blogs',
                data: {
                    title: data.blogsTitle,
                    image_url: imgBase64,
                    description: data.description
                }
            });

            if (response?.status === 200) {
                setIsLoading(false);
                notify(response.data.message, 'success');
                form.reset();
            }
            setIsLoading(false);
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
    };
    console.log('title', form.watch('blogsTitle'));
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box sx={{ padding: '40px 25px' }}>
                <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Create Blogs</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                        Additional description if required
                    </Typography>
                </Paper>

                <Grid container mt='37px' color='rgba(0, 0, 0, 0.6)'>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                Blogs Title
                            </Typography>
                            <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                name='blogsTitle'
                                isColor
                                label='Title'
                                rules={{ required: true }}
                                placeholder='Max 100 Character'
                                form={form}
                                type='text'
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                Posted by
                            </Typography>
                            <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Input name='acc' label='' isDisabled placeholder={form.watch('acc')} form={form} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                        <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                Tournament Image
                            </Typography>
                            <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <InputImage
                                rules={rules}
                                isImage
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
                            <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                Description
                            </Typography>
                            <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Input
                                isColor
                                name='description'
                                label='Description'
                                // rules={{ required: true }}
                                placeholder='Max 500 Character'
                                form={form}
                                isTextArea
                                type='text'
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    mt: '100px',
                    padding: '40px',
                    width: '100%'
                }}
            >
                <CustomButton
                    isLoading={isLoading}
                    type='submit'
                    padding='10px'
                    width='193px'
                    height='59px'
                    title='Submit'
                    backgroundColor='#A54CE5'
                />
                <CustomButton
                    onClick={() => {
                        router.push('/blogs');
                    }}
                    padding='10px'
                    width='193px'
                    height='59px'
                    title='cancel'
                    backgroundColor='white'
                    color='#A54CE5'
                    border='1px solid #A54CE5'
                />
            </Box>
        </form>
    );
};

export default CreateBlogs;
