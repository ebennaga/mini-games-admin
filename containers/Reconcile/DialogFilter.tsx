import React from 'react';
import { Box, Typography, IconButton, FormControl, RadioGroup, FormControlLabel, Radio, ButtonBase, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputDate from 'components/Input/InputDate';

interface DialogFilterProps {
    open: boolean;
    setOpen: any;
    form: any;
    dataDate: any;
    handleFilter: any;
    handleReset: () => void;
}

const DialogFilter: React.FC<DialogFilterProps> = ({ open, setOpen, form, dataDate, handleFilter, handleReset }) => {
    const radioList = [
        { value: 'all', label: 'All' },
        { value: 'latest', label: 'Latest' },
        { value: 'oldest', label: 'Oldest' }
    ];

    const [tabRadio, setTabRadio] = React.useState<'all' | 'latest' | 'oldest'>('all');

    const handleSubmit = (data: any) => {
        setOpen(false);
        handleFilter(data, tabRadio);
    };

    const onReset = () => {
        handleReset();
        setOpen(false);
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
                    defaultValue='all'
                    value={tabRadio}
                    sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, '& .Mui-checked': { color: '#A54CE5' } }}
                >
                    {radioList.map((item: any) => {
                        return (
                            <FormControlLabel
                                key={item.value}
                                value={item.value}
                                control={<Radio onChange={() => setTabRadio(item.value)} />}
                                label={item.label}
                            />
                        );
                    })}
                </RadioGroup>
                {dataDate.map((item: any) => {
                    return (
                        <InputDate
                            key={item.name}
                            form={form}
                            type={item.type}
                            label={item.label}
                            // defaultValue={item.defaultValue}
                            name={item.name}
                        />
                    );
                })}
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
                            onClick={onReset}
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
