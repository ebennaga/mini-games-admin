/* eslint-disable no-unused-vars */
import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    ButtonBase,
    Grid,
    Select,
    OutlinedInput,
    MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DialogFilterProps {
    open: boolean;
    setOpen: any;
    form: any;
    nameSelect: string;
    dataSelect: any;
    handleFilter: (value: 'all' | 'latest' | 'oldest') => void;
    handleReset: () => void;
}

const DialogFilter: React.FC<DialogFilterProps> = ({ open, setOpen, form, nameSelect, dataSelect, handleFilter, handleReset }) => {
    const radioList = [
        { value: 'all', label: 'All' },
        { value: 'latest', label: 'Latest' },
        { value: 'oldest', label: 'Oldest' }
    ];

    const [valueTab, setValueTab] = React.useState<'all' | 'latest' | 'oldest'>('all');

    const handleSubmit = (data: any) => {
        setOpen(false);
        handleFilter(valueTab);
    };

    const handleChange = (e: any) => {
        form.setValue(nameSelect, e.target.value);
    };

    const handleResetFilter = () => {
        setOpen(false);
        handleReset();
        form.setValue(nameSelect, '');
        setValueTab('all');
    };

    if (!open) {
        return null;
    }
    return (
        <Box
            color='rgba(0, 0, 0, 0.6)'
            minWidth='375px'
            boxShadow='0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)'
            borderRadius='4px'
            padding='36px 28px'
            bgcolor='#fff'
        >
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography component='h3' fontSize='16px' fontWeight={500}>
                    Filters
                </Typography>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <FormControl component='form' onSubmit={form.handleSubmit(handleSubmit)} fullWidth sx={{ mt: '24px' }}>
                <RadioGroup
                    row
                    aria-labelledby='radio-filter-time'
                    name='radio-filter'
                    defaultValue={valueTab}
                    sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, '& .Mui-checked': { color: '#A54CE5 !important' } }}
                >
                    {radioList.map((item: any) => {
                        return (
                            <FormControlLabel
                                key={item.value}
                                value={item.value}
                                control={<Radio onClick={() => setValueTab(item.value)} />}
                                label={item.label}
                            />
                        );
                    })}
                </RadioGroup>
                <Box position='relative'>
                    <Typography
                        component='span'
                        fontSize='12px'
                        sx={{ background: '#fff', position: 'absolute', top: '-9px', zIndex: 1, left: 14, px: 1 }}
                    >
                        Genre
                    </Typography>
                    <Select
                        fullWidth
                        displayEmpty
                        value={form.watch(nameSelect)}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#A54CE5'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#A54CE5'
                            },
                            '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                                color: form.watch(nameSelect) ? 'rgba(0, 0, 0,1)' : 'rgba(0, 0, 0, 0.38)'
                            }
                        }}
                    >
                        <MenuItem sx={{ fontSize: '16px' }} disabled value=''>
                            Select Genre
                        </MenuItem>
                        {dataSelect.map((item: any) => {
                            return (
                                <MenuItem key={item.id} sx={{ fontSize: '16px' }} value={item.id}>
                                    {item.title}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>
                <Grid container spacing={2} mt={0.3}>
                    <Grid item xs={6}>
                        <ButtonBase
                            type='submit'
                            sx={{ bgcolor: '#A54CE5', padding: '10px', color: '#fff', width: '100%', borderRadius: '4px' }}
                        >
                            FILTER
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonBase
                            onClick={handleResetFilter}
                            sx={{ border: '1px solid #A54CE5', color: '#A54CE5', padding: '10px', width: '100%', borderRadius: '4px' }}
                        >
                            RESET
                        </ButtonBase>
                    </Grid>
                </Grid>
            </FormControl>
        </Box>
    );
};

export default DialogFilter;
