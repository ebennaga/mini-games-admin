import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { CheckCircle, Circle, Close, UploadFile } from '@mui/icons-material';
import Image from 'next/image';
import InputImage from 'components/Input/InputImage';
import Input from 'components/Input/Input';
import CustomButton from 'components/Button';
// import useAPICaller from 'hooks/useAPICaller';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface EditBlogsProps {}

const EditBlogs: React.FC<EditBlogsProps> = () => {
    const data = {
        id: 1,
        blogsTitle: 'Open Tourney Pre Launch Hop up',
        postedBy: 'Owikun',
        postedDate: '18-11-2022',
        image: '/images/drivegoogleimage_001-2022.png',
        description: 'Hi Everyone, we have launch new game to play. lets try '
    };

    const form = useForm({
        mode: 'all',
        defaultValues: {
            title: data.blogsTitle,
            date: data.postedDate,
            description: data.description,
            image: data.image,
            acc: 'OWIKUN'
        }
    });

    const router = useRouter();
    // const { fetchAPI } = useAPICaller();
    // const [datas, setDatas] = React.useState<any>(null);
    const [isUpload, setIsUpload] = React.useState(true);

    const handleSubmit = (body: any) => {
        console.log('response', body);
    };

    // const fetchItemDetail = async () => {
    //     const response = await fetchAPI({
    //         endpoint: `exchange-rates/${router.query.id}`,
    //         method: 'GET'
    //     });
    //     setDatas(response?.data.data);
    // };

    // React.useEffect(() => {
    //     fetchItemDetail();
    // }, []);

    return (
        <Box sx={{}}>
            <Box sx={{ padding: '40px 25px' }}>
                <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Edit Blogs</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                        Additional description if required
                    </Typography>
                </Paper>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                                    name='title'
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
                                    Posted date
                                </Typography>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Input name='date' label='' isDisabled placeholder={form.watch('date')} form={form} />
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
                                {!isUpload ? (
                                    <InputImage
                                        name='image'
                                        form={form}
                                        label='Click to upload'
                                        secondaryLabel='or drag and drop'
                                        placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                                    />
                                ) : (
                                    <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <Box sx={{ padding: '3px 5px', borderRadius: '100%', backgroundColor: '#F4F4F4' }}>
                                            <UploadFile sx={{ color: '#A54CE5' }} />
                                        </Box>
                                        <Box>
                                            <Typography>{form.watch('image')}</Typography>
                                            <Box
                                                sx={{ display: 'flex', fontWeight: 'bold', gap: '10px', alignItems: 'center', mt: '10px' }}
                                            >
                                                <Typography>1Mb</Typography>
                                                <Circle sx={{ fontSize: '7px' }} />
                                                <Typography>Completed</Typography>
                                            </Box>
                                        </Box>
                                        <Close
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setIsUpload(!isUpload);
                                            }}
                                        />
                                        <Box sx={{ height: '80px' }}>
                                            <CheckCircle sx={{ color: '#A54CE5' }} />
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                        {isUpload && (
                            <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                                <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between' />
                                <Grid item xs={4}>
                                    <Typography sx={{ fontWeight: 'bold', mb: '10px' }}>Preview</Typography>
                                    <Image src={`${form.watch('image')}.png`} width={461} height={252} alt='previewimage' loading='lazy' />
                                </Grid>
                            </Grid>
                        )}
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
                                    rules={{ required: true }}
                                    placeholder='Max 500 Character'
                                    form={form}
                                    isTextArea
                                    type='text'
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
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
                <CustomButton onClick={() => {}} padding='10px' width='193px' height='59px' title='Submit' backgroundColor='#A54CE5' />
                <CustomButton
                    onClick={() => {
                        form.reset();
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
        </Box>
    );
};

export default EditBlogs;
