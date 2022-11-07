import { Box, IconButton } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import InputSearch from 'components/Input/InputSearch';
import React from 'react';
import { useForm } from 'react-hook-form';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getCurrentDate, getPastDate } from 'utils/date';
import DialogFilter from './DialogFilter';

const ParticipantTournament = () => {
    const [isDialogFilter, setIsDialogFilter] = React.useState<boolean>(false);

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            titleFilter: '',
            gamesFilter: '',
            startDateFilter: getPastDate(5, true),
            endDateFilter: getCurrentDate(true)
        }
    });

    return (
        <Box>
            <HeaderChildren title='Participant Tournament' subTitle='Additional description if required'>
                <Box mt='27px' display='flex' alignItems='center' position='relative'>
                    <InputSearch name='search' label='Search' placeholder='Name, email, etc...' form={form} />
                    <IconButton sx={{ ml: '35px' }} onClick={() => setIsDialogFilter(!isDialogFilter)}>
                        <FilterListIcon />
                    </IconButton>
                    <Box position='absolute' top='55px' left='325px'>
                        <DialogFilter
                            open={isDialogFilter}
                            setOpen={setIsDialogFilter}
                            form={form}
                            titleName='titleFilter'
                            gameName='gamesFilter'
                            startDateName='startDateFilter'
                            endDateName='endDateFilter'
                        />
                    </Box>
                </Box>
            </HeaderChildren>
        </Box>
    );
};

export default ParticipantTournament;
