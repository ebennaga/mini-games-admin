import React from 'react';
import { Box, Paper, FormControl, FormControlLabel, InputLabel, Select, Typography, Radio, MenuItem } from '@mui/material';
import { Close } from '@mui/icons-material';
import InputDate from 'components/Input/InputDate';

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
        <Paper elevation={3} sx={{ width: '375px', height: '410px', position: 'absolute', zIndex: 2, padding: '30px', left: '330px' }}>
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
                <FormControl fullWidth>
                    <InputLabel color='secondary' sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                        Posted by
                    </InputLabel>
                    <Select
                        color='secondary'
                        sx={{ color: role === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                        placeholder='Select Admin'
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={role}
                        label='Posted by'
                        onChange={handleFiter}
                    >
                        <MenuItem value='0' disabled>
                            Select Admin
                        </MenuItem>
                        <MenuItem value='1'>Super Admin</MenuItem>
                        <MenuItem value='2'>Admin</MenuItem>
                        <MenuItem value='3'>Content Writer</MenuItem>
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
