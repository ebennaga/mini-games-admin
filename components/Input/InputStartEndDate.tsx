import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, FormControl, Box, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface InputStartEndDateProps {
    nameStartDate: string;
    nameEndDate: string;
    form: any;
    label: string;
}

const InputStartEndDate: React.FC<InputStartEndDateProps> = ({ nameStartDate, nameEndDate, label, form }) => {
    return (
        <Box>
            <Typography
                component='h4'
                fontSize='12px'
                mb='-10px'
                bgcolor='#fff'
                zIndex='1'
                ml='10px'
                position='relative'
                width='fit-content'
                paddingX='5px'
                color='rgba(0, 0, 0, 0.6)'
            >
                {label}
            </Typography>
            <Box display='flex' border='1px solid rgba(0,0,0,0.2)' borderRadius='4px' padding='10px 19px 10px 9px'>
                <FormControl sx={{ position: 'relative' }}>
                    <Controller
                        name={nameStartDate}
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <TextField
                                    type='date'
                                    variant='standard'
                                    InputProps={{ disableUnderline: true, inputProps: { max: form.watch(nameEndDate) } }}
                                    sx={{
                                        position: 'relative',
                                        '& ::-webkit-calendar-picker-indicator': {
                                            paddingLeft: '100px',
                                            zIndex: 1,
                                            position: 'absolute',
                                            opacity: 0
                                        }
                                    }}
                                    {...field}
                                />
                            );
                        }}
                    />
                    <Typography component='span' fontSize='16px' sx={{ position: 'absolute', zIndex: 0, right: '-3px', top: '3px' }}>
                        -
                    </Typography>
                </FormControl>

                <FormControl sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', position: 'relative' }}>
                    <Controller
                        name={nameEndDate}
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <TextField
                                    type='date'
                                    id='date'
                                    variant='standard'
                                    InputProps={{ disableUnderline: true, inputProps: { min: form.watch(nameStartDate) } }}
                                    sx={{
                                        position: 'relative',
                                        pl: '10px',
                                        '& ::-webkit-calendar-picker-indicator': {
                                            paddingLeft: '100px',
                                            zIndex: 1,
                                            position: 'absolute',
                                            opacity: 0
                                        }
                                    }}
                                    {...field}
                                />
                            );
                        }}
                    />
                    <DateRangeIcon
                        sx={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '19px', position: 'absolute', zIndex: 0, right: '-5px' }}
                    />
                </FormControl>
            </Box>
        </Box>
    );
};

export default InputStartEndDate;
