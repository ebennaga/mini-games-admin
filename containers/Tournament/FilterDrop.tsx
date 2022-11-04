import React from 'react';
import { Box, Paper, FormControl, FormControlLabel, InputLabel, Select, Typography, Radio, MenuItem } from '@mui/material';
import { Close } from '@mui/icons-material';
import InputDate from 'components/Input/InputDate';
import Input from 'components/Input/Input';

interface FilterDropProps {
    form: any;
    openFilter: any;
    setOpenFilter: any;
    handleChangeRadio: any;
    selectedValue: any;
    role: any;
    handleFiter: any;
}

const FilterDrop: React.FC<FilterDropProps> = ({
    form,
    setOpenFilter,
    openFilter,
    handleChangeRadio,
    selectedValue,
    role,
    handleFiter
}) => {
    return (
        <Paper elevation={3} sx={{ width: '375px', height: '535px', position: 'absolute', zIndex: 2, padding: '30px', left: '330px' }}>
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
                        sx={{ color: role === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                        placeholder='Select Games'
                        labelId='games'
                        id='games'
                        value={role}
                        label='Games'
                        onChange={handleFiter}
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
        </Paper>
    );
};

export default FilterDrop;
