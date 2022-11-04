import React from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import InputWithLabel from 'components/Input/InputWithLabel';
import InputDate from 'components/Input/InputDate';
import { SelectChangeEvent } from '@mui/material/Select';

interface CreateTournamentProps {
    form: any;
}

const CreateTournament: React.FC<CreateTournamentProps> = ({ form }) => {
    const [game, setGame] = React.useState('0');

    const handleFiter = (event: SelectChangeEvent) => {
        setGame(event.target.value as string);
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
                <form>
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
                            <InputDate form={form} name='startDate' label='Start Date' type='date' />
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
                </form>
            </Box>
        </Box>
    );
};

export default CreateTournament;
