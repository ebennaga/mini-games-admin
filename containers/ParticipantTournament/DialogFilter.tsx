import React from 'react';
import { Box, Typography, IconButton, FormControl, RadioGroup, FormControlLabel, Radio, ButtonBase, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Input from 'components/Input/Input';
import InputSelect from 'components/Input/InputSelect';
import InputDate from 'components/Input/InputDate';

interface DialogFilterProps {
    open: boolean;
    setOpen: any;
    form: any;
    titleName: string;
    gameName: string;
    startDateName: string;
    endDateName: string;
    tabName: string;
    // eslint-disable-next-line no-unused-vars
    onFilter: (data: any) => void;
    onReset: () => void;
    listGames: any;
}

const DialogFilter: React.FC<DialogFilterProps> = ({
    open,
    setOpen,
    form,
    titleName,
    gameName,
    startDateName,
    endDateName,
    tabName,
    onFilter,
    onReset,
    listGames
}) => {
    const radioList = [
        { value: 'all', label: 'All' },
        { value: 'latest', label: 'Latest' },
        { value: 'oldest', label: 'Oldest' }
    ];

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
            <FormControl component='form' onSubmit={form.handleSubmit(onFilter)} fullWidth sx={{ mt: '24px' }}>
                <RadioGroup
                    row
                    aria-labelledby='radio-filter-time'
                    name='radio-filter'
                    defaultValue={form.watch(tabName) || 'all'}
                    sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, '& .Mui-checked': { color: '#A54CE5 !important' } }}
                >
                    {radioList.map((item: any) => {
                        return (
                            <FormControlLabel
                                key={item.value}
                                value={item.value}
                                control={<Radio onClick={() => form.setValue(tabName, item.value)} />}
                                label={item.label}
                            />
                        );
                    })}
                </RadioGroup>

                <Box mb='30px'>
                    <Input form={form} name={titleName} label='Title' placeholder='Enter Title' borderColor='rgba(0, 0, 0, 0.23)' />
                </Box>
                <Box mb='17px'>
                    <InputSelect form={form} name={gameName} dataSelect={listGames} title='Games' placeholder='Select Game' />
                </Box>
                <Box>
                    <InputDate label='Start Register Date' type='date' form={form} name={startDateName} />
                </Box>
                <Box>
                    <InputDate label='End Register Date' type='date' form={form} name={endDateName} />
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
