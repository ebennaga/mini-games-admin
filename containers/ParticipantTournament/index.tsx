import { Box } from '@mui/material';
// import HeaderChildren from 'components/HeaderChildren';
// import InputSearch from 'components/Input/InputSearch';
import React from 'react';
import { useForm } from 'react-hook-form';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { getCurrentDate, getPastDate } from 'utils/date';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import DialogSuccess from 'components/Dialog/DialogSuccess';
import PaginationCard from 'components/PaginationCard';
import TitleCard from 'components/Layout/TitleCard';
import DialogFilter from './DialogFilter';
import TableParticipant from './TableParticipant';

// Dummy Data for table
const dummyData = [
    { id: 1, title: 'Open Tourney Pre Launch Hop up', game: 'Hop Up', username: 'Lesty', registrationDate: getCurrentDate() },
    { id: 2, title: 'Tourney Pre Launch Hop up', game: 'Hop Up', username: 'Eko', registrationDate: getCurrentDate() },
    { id: 3, title: 'Pre Launch Hop up', game: 'Hop Up', username: 'Yanto', registrationDate: getCurrentDate() },
    { id: 4, title: ' Launch Hop up', game: 'Hop Up', username: 'Asep', registrationDate: getCurrentDate() },
    { id: 5, title: 'Open Tourney Pre Launch Hop up', game: 'Hop Up', username: 'Warto', registrationDate: getCurrentDate() },
    { id: 6, title: 'Open Tourney Pre Launch Hop up', game: 'Hop Up', username: 'Butet', registrationDate: getCurrentDate() },
    { id: 7, title: 'Open Tourney Pre Launch Hop up', game: 'Hop Up', username: 'Ucok', registrationDate: getCurrentDate() },
    { id: 8, title: 'Open Tourney Pre Launch Hop up', game: 'Hop Up', username: 'Uda', registrationDate: getCurrentDate() },
    { id: 9, title: 'Open Tourney Pre Launch Hop up', game: 'Hop Up', username: 'Umi', registrationDate: getCurrentDate() }
];
const ParticipantTournament = () => {
    const [isDialogFilter, setIsDialogFilter] = React.useState<boolean>(false);
    const [openDialogConfirm, setOpenDialogConfirm] = React.useState<boolean>(false);
    const [openDialogSuccess, setOpenDialogSuccess] = React.useState<boolean>(false);
    const [totalChecked, setTotalChecked] = React.useState<number>(0);
    const [query, setQuery] = React.useState('');
    const [filteredData, setFilteredData] = React.useState<any>([]);
    // react-hook-form default value initiation
    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            titleFilter: '',
            gamesFilter: '',
            startDateFilter: getPastDate(5, true),
            endDateFilter: getCurrentDate(true),
            dataTable: filteredData,
            idxAppears: { startIndex: 0, endIndex: 5 },
            row: 5,
            page: 1
        }
    });

    // Remove item
    const handleRemove = () => {
        setOpenDialogConfirm(false);
        setOpenDialogSuccess(true);
    };

    // Event Next page
    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(filteredData.length / input.row);
        if (input.page < totalPage) {
            form.setValue('page', input.page + 1);
        }
    };

    // Event Prev Page
    const handlePrev = () => {
        const input = form.watch();
        if (input.page > 1) {
            form.setValue('page', input.page - 1);
        }
    };

    // Update useForm idxAppears value, while doing pagination events
    React.useEffect(() => {
        const page = form.watch('page');
        const row = form.watch('row');

        const startIndex = page * row - row;
        const endIndex = startIndex + row - 1;

        const result = { startIndex, endIndex };
        form.setValue('idxAppears', result);
    }, [form.watch('row'), form.watch('page')]);

    // Read total of checked items
    React.useEffect(() => {
        const data = form.watch('dataTable');
        const countItems = data.filter((item: any) => item.isAction).length;
        setTotalChecked(countItems);
    }, [form.watch('dataTable')]);
    React.useEffect(() => {
        setFilteredData(dummyData);
    }, []);
    React.useEffect(() => {
        // eslint-disable-next-line consistent-return, array-callback-return
        const temp = dummyData.filter((post: any) => {
            if (query === '') {
                return post;
            }
            if (
                post.username.toString().toLowerCase().includes(query.toLowerCase()) ||
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.game.toLowerCase().includes(query.toLowerCase())
            ) {
                return post;
            }
        });
        setFilteredData(temp);
        form.setValue('dataTable', temp);
    }, [query]);
    const handleDataSearch = (keyword: any) => {
        setQuery(keyword);
    };
    const handleDialog = (value: boolean) => {
        setIsDialogFilter(value);
    };
    return (
        <Box>
            {/* <HeaderChildren title='Participant Tournament' subTitle='Additional description if required'>
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
            </HeaderChildren> */}
            <TitleCard
                handleSearch={(keyword: any) => handleDataSearch(keyword)}
                onConfirm={(value: boolean) => handleDialog(value)}
                title='Participant Tournament'
                subtitle='Addtional description if required'
                isSearchExist
                isButtonCreateExist={false}
                placeholderSeacrhText='Name, email, etc...'
                href='/games/add-game'
            />
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
            {totalChecked ? (
                <Box mt={5}>
                    <BadgeSelected total={totalChecked} handleOpenDeleteDialog={() => setOpenDialogConfirm(true)} />
                </Box>
            ) : null}
            <Box mt={5}>
                <TableParticipant name='dataTable' form={form} nameIdxAppears='idxAppears' />
            </Box>
            <PaginationCard
                totalItem={filteredData.length}
                handlePrev={handlePrev}
                handleNext={handleNext}
                form={form}
                nameRow='row'
                namePage='page'
            />
            <DialogConfirmation
                title='Are you sure remove this participant ?'
                subTitle={`${totalChecked} Selected`}
                handleConfirm={handleRemove}
                open={openDialogConfirm}
                setOpen={setOpenDialogConfirm}
                textConfirmButton='REMOVE'
                textCancelButton='CANCEL'
            />
            <DialogSuccess title='Sucess Remove Games' open={openDialogSuccess} setOpen={setOpenDialogSuccess} />
        </Box>
    );
};

export default ParticipantTournament;
