import React from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import InputDate from 'components/Input/InputDate';
import { SelectChangeEvent } from '@mui/material/Select';
import InputImage from 'components/Input/InputImage';
import Input from 'components/Input/Input';

interface CreateTournamentProps {
    form: any;
}

const CreateTournament: React.FC<CreateTournamentProps> = ({ form }) => {
    const [game, setGame] = React.useState('0');
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const handleFiter = (event: SelectChangeEvent) => {
        setGame(event.target.value as string);
    };

    const handleSubmit = (data: any) => {
        console.log('response', data);
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
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ padding: '40px 25px', height: '100vh' }}>
                <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Add Account</Typography>
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
                            <Grid item xs={4}>
                                <Input name='title' label='Title' rules={{ required: true }} placeholder='Max 100 Character' form={form} />
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
                                    Duration
                                </Typography>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <InputDate isCreate form={form} name='startDate' label='Start Date' type='date' />
                            </Grid>
                            <Grid item xs={4}>
                                <InputDate isCreate form={form} name='endDate' label='End Date' type='date' />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between' />
                            <Grid item xs={4}>
                                <InputDate isCreate form={form} name='startTime' label='Start Time' type='time' />
                            </Grid>
                            <Grid item xs={4}>
                                <InputDate isCreate form={form} name='endTime' label='End Time' type='time' />
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
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                        Games
                                    </InputLabel>
                                    <Select
                                        MenuProps={MenuProps}
                                        sx={{ color: game === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                        placeholder='Games'
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={game}
                                        label='Games'
                                        onChange={handleFiter}
                                    >
                                        <MenuItem value='0' disabled>
                                            Select Game
                                        </MenuItem>
                                        <MenuItem value='1'>Hop Up</MenuItem>
                                        <MenuItem value='2'>Tower Stack</MenuItem>
                                        <MenuItem value='3'>Rose Dart</MenuItem>
                                    </Select>
                                </FormControl>
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
                            <Grid item xs={4}>
                                <Input
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
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                        Copy Table
                                    </InputLabel>
                                    <Select
                                        sx={{ color: game === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                        placeholder='Games'
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={game}
                                        label='Copy Table'
                                        onChange={handleFiter}
                                    >
                                        <MenuItem value='0' disabled>
                                            Select Table
                                        </MenuItem>
                                        <MenuItem value='1'>Hop Up</MenuItem>
                                        <MenuItem value='2'>Tower Stack</MenuItem>
                                        <MenuItem value='3'>Rose Dart</MenuItem>
                                    </Select>
                                </FormControl>
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
                            <Grid item xs={4}>
                                <Input name='pool' label='Prize Pool' rules={{ required: true }} placeholder='30.000' form={form} />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                {/* <form>
                    <Box sx={{ mt: '30px', width: '35%' }}>
                        <InputWithLabel
                            foucused
                            labelField='Title'
                            placeHolder='Max 100 Character'
                            name='title'
                            form={form}
                            label='Tournament Title'
                            type='text'
                            rules={{ required: true, maxLength: 100 }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', width: '35%', mt: '20px', px: '5px' }}>
                            <Box sx={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '20px' }}>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Duration</Typography>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                            </Box>
                            <Box sx={{ width: '70%', ml: '12px' }}>
                                <InputDate form={form} name='startDate' label='Start Date' type='date' />
                            </Box>
                        </Box>
                        <Box sx={{ width: '25%', ml: '12px', mt: '20px' }}>
                            <InputDate form={form} name='endDate' label='End Date' type='date' />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', width: '35%', mt: '20px', px: '5px' }}>
                            <Box
                                sx={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '20px' }}
                            />
                            <Box sx={{ width: '70%', ml: '12px' }}>
                                <InputDate form={form} name='startTime' label='Start Time' type='time' />
                            </Box>
                        </Box>
                        <Box sx={{ width: '25%', ml: '12px', mt: '20px' }}>
                            <InputDate form={form} name='endTime' label='End Time' type='time' />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '35%', mt: '20px', px: '10px' }}>
                        <Box sx={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Games</Typography>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '70%' }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                    Games
                                </InputLabel>
                                <Select
                                    sx={{ color: game === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                    placeholder='Games'
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={game}
                                    label='Games'
                                    onChange={handleFiter}
                                >
                                    <MenuItem value='0' disabled>
                                        Select Game
                                    </MenuItem>
                                    <MenuItem value='1'>Hop Up</MenuItem>
                                    <MenuItem value='2'>Tower Stack</MenuItem>
                                    <MenuItem value='3'>Rose Dart</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </form> */}
            </Box>
        </Box>
    );
};

export default CreateTournament;
