/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Grid, ButtonBase } from '@mui/material';
import InputDate from 'components/Input/InputDate';
import { SelectChangeEvent } from '@mui/material/Select';
import InputImage from 'components/Input/InputImage';
import Input from 'components/Input/Input';
import { Remove, Add } from '@mui/icons-material';
import CustomButton from 'components/Button';
import { useForm } from 'react-hook-form';
import { getCurrentDate, getCurrentTime, getSplitDate } from 'utils/date';
import { useRouter } from 'next/router';
import TableAddTournament from 'containers/Tournament/Table';
import dataTable from 'containers/Tournament/dataSelect';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import InputSelect from 'components/Input/InputSelect';

interface EditTournamentProps {}

const EditTournament: React.FC<EditTournamentProps> = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            start: new Date().toISOString().slice(0, 10) || '',
            end: new Date().toISOString().slice(0, 10) || '',
            // startDate: new Date().toISOString().slice(0, 10) || '',
            startDate: '',
            endDate: '',
            // endDate: new Date().toISOString().slice(0, 10) || '',
            maxDate: getCurrentDate(),
            title: '',
            startTime: getCurrentTime(),
            endTime: getCurrentTime(),
            image: '',
            game: '',
            fee: '',
            pool: 0
        }
    });
    const router = useRouter();
    const [game, setGame] = React.useState('0');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [table, setTable] = React.useState('0');
    const [loadingSubmit, setLoadingSubmit] = React.useState(false);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    const dataGames = [
        { id: 1, title: 'Hop Up' },
        { id: 2, title: 'Tower Stack' },
        { id: 3, title: 'Rose Dart' }
    ];

    const fetchDetailTournaments = async () => {
        setIsLoading(true);
        try {
            const result = await fetchAPI({
                method: 'GET',
                endpoint: `tournaments/${router.query.id}`
            });
            console.log('results', result);
            if (result.status === 200) {
                form.setValue('title', result.data.data.name);
                form.setValue('game', result.data.data.game.id);
                form.setValue('fee', result.data.data.entry_coin);
                const startDate = getSplitDate(result.data.data.start_time);
                const endDate = getSplitDate(result.data.data.end_time);
                form.setValue('startDate', startDate.date);
                form.setValue('startTime', startDate.time);
                form.setValue('endDate', endDate.date);
                form.setValue('endTime', endDate.time);
                form.setValue('pool', result.data.data.total_point);
            }
            setIsLoading(false);
        } catch (err: any) {
            notify(err.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchDetailTournaments();
    }, []);
    const handleFiter = (event: SelectChangeEvent) => {
        setGame(event.target.value as string);
    };

    const handleTable = (event: SelectChangeEvent) => {
        setTable(event.target.value as string);
    };

    const handleSubmit = async (data: any) => {
        setLoadingSubmit(true);
        try {
            const { title, endTime, fee, startTime } = form.watch();
            const result = await fetchAPI({
                endpoint: `tournaments/${router.query.id}`,
                method: 'PUT',
                data: {
                    name: title,
                    game_id: router.query.id,
                    end_time: endTime,
                    entry_coin: fee,
                    start_time: startTime
                }
            });

            if (result.status === 200) {
                notify(result.data.message, 'success');
                setLoadingSubmit(false);
            }
        } catch (err: any) {
            notify(err.message, 'error');
            setLoadingSubmit(false);
        }
    };
    console.log('hasil', form.watch());
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    return (
        <Box sx={{}}>
            <Box sx={{ padding: '40px 25px' }}>
                <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Edit Tournament</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                        Additional description if required
                    </Typography>
                </Paper>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Grid container mt='37px' color='rgba(0, 0, 0, 0.6)'>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    Tournament Title
                                </Typography>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Input
                                    isColor
                                    name='title'
                                    label='Title'
                                    rules={{ required: true }}
                                    placeholder='Max 100 Character'
                                    form={form}
                                />
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
                            <Grid item xs={3}>
                                <InputImage
                                    name='image'
                                    form={form}
                                    label='Click to upload'
                                    secondaryLabel='or drag and drop'
                                    placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                                    rules={{ required: true }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    Duration
                                </Typography>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <InputDate
                                    isCreate
                                    rules={{ required: true }}
                                    form={form}
                                    name='startDate'
                                    label='Start Date'
                                    type='date'
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputDate isCreate rules={{ required: true }} form={form} name='endDate' label='End Date' type='date' />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between' />
                            <Grid item xs={3}>
                                <InputDate
                                    isCreate
                                    rules={{ required: true }}
                                    form={form}
                                    name='startTime'
                                    label='Start Time'
                                    type='time'
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputDate isCreate rules={{ required: true }} form={form} name='endTime' label='End Time' type='time' />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    Games
                                </Typography>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <InputSelect form={form} name='game' dataSelect={dataGames} title='Games' placeholder='Select Game' />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    Tournament Fee
                                </Typography>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Input
                                    isColor
                                    rules={{ required: true }}
                                    isCoin
                                    name='fee'
                                    label='Fee'
                                    placeholder='Min Amount 20'
                                    form={form}
                                    type='number'
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    Prizing Table
                                </Typography>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                        Copy Table
                                    </InputLabel>
                                    <Select
                                        sx={{ color: table === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                        placeholder='Games'
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={table}
                                        label='Copy Table'
                                        onChange={handleTable}
                                    >
                                        <MenuItem value='0' disabled>
                                            Select Table
                                        </MenuItem>
                                        {dataTable.length > 0 &&
                                            dataTable.map((item: any) => <MenuItem value={item.id}>{item.label}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between' />
                            <Grid item xs={6}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <TableAddTournament value={table} data={dataTable} />
                                    <Box
                                        sx={{
                                            mt: '20px',
                                            display: 'flex',
                                            width: '35%',
                                            gap: '15px',
                                            alignSelf: 'flex-end',
                                            fontWeight: 700
                                        }}
                                    >
                                        <ButtonBase
                                            sx={{
                                                backgroundColor: 'white',
                                                padding: '20px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                color: '#A54CE5',
                                                borderRadius: '5px',
                                                border: '1px solid #A54CE5',
                                                gap: '10px'
                                            }}
                                        >
                                            <Remove />
                                            <Typography sx={{ fontWeight: 600 }}>DELETE</Typography>
                                        </ButtonBase>
                                        <ButtonBase
                                            sx={{
                                                backgroundColor: '#A54CE5',
                                                padding: '20px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                color: 'white',
                                                borderRadius: '5px',
                                                gap: '10px'
                                            }}
                                        >
                                            <Add />
                                            <Typography sx={{ fontWeight: 600 }}>ADD</Typography>
                                        </ButtonBase>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    Total Pool Prizes
                                </Typography>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Input isColor name='pool' label='Prize Pool' rules={{ required: true }} placeholder='30.000' form={form} />
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
                <CustomButton
                    onClick={handleSubmit}
                    type='submit'
                    padding='10px'
                    width='193px'
                    height='59px'
                    title='Submit'
                    backgroundColor='#A54CE5'
                />
                <CustomButton
                    onClick={() => {
                        router.push('/tournament');
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

export default EditTournament;
