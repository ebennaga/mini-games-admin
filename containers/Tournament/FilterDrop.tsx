import React from 'react';
import { Box, Paper, FormControl, FormControlLabel, InputLabel, Select, Typography, Radio, MenuItem } from '@mui/material';
import { Close } from '@mui/icons-material';
import InputDate from 'components/Input/InputDate';
import Input from 'components/Input/Input';
import CustomButton from 'components/Button';

interface FilterDropProps {
    form: any;
    openFilter: any;
    setOpenFilter: any;
    handleChangeRadio: any;
    selectedValue: any;
    game: any;
    handleFiter: any;
    handleFilterButton: any;
    handleReset: any;
    disabled: any;
}

const FilterDrop: React.FC<FilterDropProps> = ({
    form,
    setOpenFilter,
    openFilter,
    handleChangeRadio,
    selectedValue,
    game,
    handleFiter,
    handleFilterButton,
    handleReset,
    disabled
}) => {
    return (
        <Paper elevation={3} sx={{ width: '375px', position: 'absolute', zIndex: 2, padding: '30px', left: '330px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 700, fontSize: '20px' }}>Filters</Typography>
                <Close
                    onClick={() => {
                        setOpenFilter(!openFilter);
                    }}
                    sx={{ color: 'rgba(0, 0, 0, 0.6)', cursor: 'pointer' }}
                />
            </Box>
            <Box sx={{ mt: '25px' }}>
                <FormControl sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <FormControlLabel
                            value='all'
                            control={<Radio color='secondary' checked={selectedValue === 'all'} onChange={handleChangeRadio} />}
                            label='All'
                        />
                        <FormControlLabel
                            value='latest'
                            control={<Radio color='secondary' checked={selectedValue === 'latest'} onChange={handleChangeRadio} />}
                            label='Latest'
                        />
                        <FormControlLabel
                            value='oldest'
                            control={<Radio color='secondary' checked={selectedValue === 'oldest'} onChange={handleChangeRadio} />}
                            label='Oldest'
                        />
                    </Box>
                </FormControl>
            </Box>
            <Box sx={{ mt: '20px' }}>
                <Input name='titleSearch' isColor placeholder='Enter Title' label='Title' form={form} />
            </Box>
            <Box sx={{ mt: '30px' }}>
                <FormControl fullWidth>
                    <InputLabel sx={{ fontWeight: 'bold' }} id='games'>
                        Games
                    </InputLabel>
                    <Select
                        sx={{ color: game === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                        placeholder='Select Games'
                        labelId='games'
                        id='games'
                        value={game}
                        label='Games'
                        onChange={handleFiter}
                        disabled={disabled}
                    >
                        <MenuItem value='0' disabled>
                            Select Games
                        </MenuItem>
                        <MenuItem value='1'>Hop Up</MenuItem>
                        <MenuItem value='2'>Tower Stack</MenuItem>
                        <MenuItem value='3'>Rose Dart</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ ml: '6px', mr: '-6px', mt: '30px' }}>
                <InputDate label='Start Date' type='date' form={form} name='startDate' />
            </Box>
            <Box sx={{ ml: '6px', mr: '-6px', mt: '30px' }}>
                <InputDate label='End Date' type='date' form={form} name='endDate' />
            </Box>
            <Box sx={{ ml: '6px', mr: '-6px', mt: '30px' }}>
                <InputDate label='Start Time' type='time' form={form} name='startTime' />
            </Box>
            <Box sx={{ ml: '6px', mr: '-6px', mt: '30px' }}>
                <InputDate label='End Time' type='time' form={form} name='endTime' />
            </Box>
            <Box sx={{ mt: '30px', justifyContent: 'space-between', display: 'flex', width: '100%' }}>
                <CustomButton onClick={handleFilterButton} title='FILTER' width='150px' height='36px' />
                <CustomButton
                    onClick={handleReset}
                    title='RESET'
                    width='150px'
                    height='36px'
                    backgroundColor='white'
                    color='#A54CE5'
                    border='1px solid #A54CE5'
                />
            </Box>
        </Paper>
    );
};

export default FilterDrop;
