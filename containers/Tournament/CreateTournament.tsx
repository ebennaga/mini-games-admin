/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Grid, ButtonBase } from '@mui/material';
import InputDate from 'components/Input/InputDate';
import { SelectChangeEvent } from '@mui/material/Select';
import InputImage from 'components/Input/InputImage';
import Input from 'components/Input/Input';
import { Remove, Add } from '@mui/icons-material';
import CustomButton from 'components/Button';
import useNotify from 'hooks/useNotify';
import InputPrizingTable from 'components/Input/InputPrizingTable';
import useAPICaller from 'hooks/useAPICaller';
import InputSelect from 'components/Input/InputSelect';
import dataTable from './dataSelect';
import TableAddTournament from './Table';

interface CreateTournamentProps {
    form: any;
    setCreateTour: any;
    createTour: any;
}

const CreateTournament: React.FC<CreateTournamentProps> = ({ setCreateTour, createTour, form }) => {
    const [game, setGame] = React.useState('0');
    const [table, setTable] = React.useState('0');
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const notify = useNotify();

    const { fetchAPI } = useAPICaller();
    const dataType = [
        { id: 1, title: 'Accumulation' },
        { id: 2, title: 'High Score' }
    ];
    const dataGames = [
        { id: 1, title: 'Hop Up' },
        { id: 2, title: 'Tower Stack' },
        { id: 3, title: 'Rose Dart' }
    ];
    const handleFiter = (event: SelectChangeEvent) => {
        setGame(event.target.value as string);
    };

    const handleTable = (event: SelectChangeEvent) => {
        setTable(event.target.value as string);
    };

    const handlePOSTSubmit = async () => {
        // console.log(`checking${categoryList[parseInt(form.watch('category'), 10) - 1].label}`);
        // form.watch('name');
        // console.log('masuk');
        // console.log(`${form.watch('startDate')} ${form.watch('startTime')}`);
        try {
            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/tournaments',
                data: {
                    game_id: 4,
                    name: form.watch('title'),
                    start_time: `${form.watch('startDate')} ${form.watch('startTime')}`,
                    end_time: '',
                    entry_coin: form.watch('fee'),
                    total_points: form.watch('pool'),
                    game: {
                        id: game,
                        name: ''
                    }
                }
            });

            if (response?.status === 200) {
                // console.log(response);
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

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
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Create Tournament</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                        Additional description if required
                    </Typography>
                </Paper>
                <form onSubmit={form.handleSubmit(handlePOSTSubmit)}>
                    <Grid container mt='37px' color='rgba(0, 0, 0, 0.6)'>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Tournament Title
                                    </Typography>

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
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Tournament Image
                                    </Typography>

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
                            </Grid>
                            <Grid item xs={3}>
                                <InputImage
                                    name='image'
                                    form={form}
                                    label='Click to upload'
                                    rules={{ required: true }}
                                    secondaryLabel='or drag and drop'
                                    placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between' direction='column'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Duration
                                    </Typography>

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

                                {/* <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography> */}
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
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Games
                                    </Typography>

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
                            </Grid>
                            <Grid item xs={3}>
                                <InputSelect
                                    form={form}
                                    name='games'
                                    dataSelect={dataGames}
                                    title='Games'
                                    placeholder='Select Type'
                                    rules={{ required: true }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Tournament Type
                                    </Typography>

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
                            </Grid>
                            <Grid item xs={3}>
                                <InputSelect
                                    form={form}
                                    name='tournamentType'
                                    dataSelect={dataType}
                                    title='Genre'
                                    placeholder='Select Type'
                                    rules={{ required: true }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Tournament Fee
                                    </Typography>

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
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Prize Table
                                    </Typography>

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
                            </Grid>
                            <Grid item xs={3}>
                                {/* <FormControl fullWidth>
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
                                </FormControl> */}
                                <InputPrizingTable
                                    form={form}
                                    name='tournamentType'
                                    dataSelect={dataType}
                                    title='Genre'
                                    placeholder='Select Type'
                                    rules={{ required: true }}
                                />
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
                                            width: '27%',
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
                        <CustomButton type='submit' />
                        {/* <CustomButton type='submit' padding='10px' width='193px' height='59px' title='Submit' backgroundColor='#A54CE5' /> */}
                        <CustomButton
                            onClick={() => {
                                setCreateTour(!createTour);
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
            </Box>
        </Box>
    );
};

export default CreateTournament;
