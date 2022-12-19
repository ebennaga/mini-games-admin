import { Box } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import DialogSuccess from 'components/Dialog/DialogSuccess';
import PaginationCard from 'components/PaginationCard';
import TitleCard from 'components/Layout/TitleCard';
import DialogFilter from './DialogFilter';
import TableParticipant from './TableParticipant';

// Dummy Data for table
const dummyData = [
    {
        id: 1,
        title: 'Open Tourney Pre Launch Hop up',
        game: 'Hop Up',
        username: 'Lesty',
        start_register: '2022-12-19T08:19:52.310Z',
        end_register: '2022-12-29T08:19:52.310Z'
    },
    {
        id: 2,
        title: 'Tourney Pre Launch Rose Dart',
        game: 'Rose Dart',
        username: 'Eko',
        start_register: '2022-12-09T08:19:52.310Z',
        end_register: '2022-12-12T08:19:52.310Z'
    },
    {
        id: 3,
        title: 'Pre Launch Tower Stack',
        game: 'Tower Stack',
        username: 'Yanto',
        start_register: '2022-12-21T08:19:52.310Z',
        end_register: '2022-12-25T08:19:52.310Z'
    },
    {
        id: 4,
        title: ' Launch Hop up',
        game: 'Hop Up',
        username: 'Asep',
        start_register: '2022-12-10T08:19:52.310Z',
        end_register: '2022-12-19T08:19:52.310Z'
    },
    {
        id: 5,
        title: 'Open Tourney Pre Launch Tower Stack',
        game: 'Tower Stack',
        username: 'Warto',
        start_register: '2022-12-11T08:19:52.310Z',
        end_register: '2022-12-15T08:19:52.310Z'
    },
    {
        id: 6,
        title: 'Open Tourney Pre Launch Tower Stack',
        game: 'Tower Stack',
        username: 'Butet',
        start_register: '2022-12-19T08:19:52.310Z',
        end_register: '2022-12-29T08:19:52.310Z'
    },
    {
        id: 7,
        title: 'Open Tourney Pre Launch Rose Dart',
        game: 'Rose Dart',
        username: 'Ucok',
        start_register: '2022-12-30T08:19:52.310Z',
        end_register: '2023-01-03T08:19:52.310Z'
    },
    {
        id: 8,
        title: 'Open Tourney Pre Launch Hop up',
        game: 'Hop Up',
        username: 'Uda',
        start_register: '2022-12-15T08:19:52.310Z',
        end_register: '2022-12-19T08:19:52.310Z'
    },
    {
        id: 9,
        title: 'Open Tourney Pre Launch Tower Stack',
        game: 'Tower Stack',
        username: 'Umi',
        start_register: '2022-12-19T08:19:52.310Z',
        end_register: '2022-12-20T08:19:52.310Z'
    }
];
const ParticipantTournament = () => {
    // List for games filter
    const listGames = [
        { id: 1, title: 'Hop Up' },
        { id: 2, title: 'Rose Dart' },
        { id: 3, title: 'Tower Stack' }
    ];

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
            startDateFilter: '',
            endDateFilter: '',
            dataTable: filteredData,
            idxAppears: { startIndex: 0, endIndex: 5 },
            row: 5,
            page: 1,
            tabFilter: 'all'
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

    const dateFormat = (date: string) => new Date(date).toLocaleString('id-id').slice(0, 10);
    // Event Filter
    const handleFilter = (data: any) => {
        const { titleFilter, gamesFilter, startDateFilter, endDateFilter } = data;

        const gamefilt = gamesFilter ? listGames.filter((item: any) => item.id === gamesFilter)[0].title : '';
        const table = dummyData;

        const resFilter = table.filter((item: any) => {
            const { title, game, start_register: startRegister, end_register: endRegister } = item;

            if (titleFilter && !gamefilt && !startDateFilter && !endDateFilter) {
                return title?.toLowerCase()?.includes(titleFilter.toLowerCase());
            }
            if (titleFilter && gamefilt && !startDateFilter && !endDateFilter) {
                return title?.toLowerCase()?.includes(titleFilter.toLowerCase()) && game.toLowerCase() === gamefilt.toLowerCase();
            }
            if (titleFilter && !gamefilt && startDateFilter && !endDateFilter) {
                return (
                    title?.toLowerCase()?.includes(titleFilter.toLowerCase()) && dateFormat(startRegister) === dateFormat(startDateFilter)
                );
            }
            if (titleFilter && !gamefilt && !startDateFilter && endDateFilter) {
                return title?.toLowerCase()?.includes(titleFilter.toLowerCase()) && dateFormat(endRegister) === dateFormat(endDateFilter);
            }
            if (titleFilter && gamefilt && startDateFilter && !endDateFilter) {
                return (
                    title?.toLowerCase()?.includes(titleFilter.toLowerCase()) &&
                    game.toLowerCase() === gamefilt.toLowerCase() &&
                    dateFormat(startRegister) === dateFormat(startDateFilter)
                );
            }
            if (titleFilter && gamefilt && !startDateFilter && endDateFilter) {
                return (
                    title?.toLowerCase()?.includes(titleFilter.toLowerCase()) &&
                    game.toLowerCase() === gamefilt.toLowerCase() &&
                    dateFormat(endRegister) === dateFormat(endDateFilter)
                );
            }
            if (titleFilter && !gamefilt && startDateFilter && endDateFilter) {
                return (
                    title?.toLowerCase()?.includes(titleFilter.toLowerCase()) &&
                    dateFormat(endRegister) === dateFormat(endDateFilter) &&
                    dateFormat(startRegister) === dateFormat(startDateFilter)
                );
            }

            if (gamefilt && !titleFilter && !startDateFilter && !endDateFilter) {
                return game.toLowerCase() === gamefilt.toLowerCase();
            }
            if (gamefilt && startDateFilter && !titleFilter && !endDateFilter) {
                return game.toLowerCase() === gamefilt.toLowerCase() && dateFormat(startRegister) === dateFormat(startDateFilter);
            }
            if (gamefilt && !startDateFilter && !titleFilter && endDateFilter) {
                return game.toLowerCase() === gamefilt.toLowerCase() && dateFormat(endRegister) === dateFormat(endDateFilter);
            }
            if (gamefilt && startDateFilter && !titleFilter && endDateFilter) {
                return (
                    game.toLowerCase() === gamefilt.toLowerCase() &&
                    dateFormat(startRegister) === dateFormat(startDateFilter) &&
                    dateFormat(endRegister) === dateFormat(endDateFilter)
                );
            }

            if (startDateFilter && !gamefilt && !titleFilter && !endDateFilter) {
                return dateFormat(startRegister) === dateFormat(startDateFilter);
            }
            if (startDateFilter && !gamefilt && !titleFilter && endDateFilter) {
                return dateFormat(startRegister) === dateFormat(startDateFilter) && dateFormat(endRegister) === dateFormat(endDateFilter);
            }

            if (endDateFilter && !titleFilter && !gamesFilter && !startDateFilter) {
                return dateFormat(endRegister) === dateFormat(endDateFilter);
            }

            if (gamefilt && titleFilter && startDateFilter && endDateFilter) {
                return (
                    game.toLowerCase() === gamefilt.toLowerCase() &&
                    title?.toLowerCase()?.includes(titleFilter.toLowerCase()) &&
                    dateFormat(startRegister) === dateFormat(startDateFilter) &&
                    dateFormat(endRegister) === dateFormat(endDateFilter)
                );
            }
            return item;
        });

        const tab = form.watch('tabFilter');

        if (tab === 'latest') {
            const sorting = resFilter.sort((a: any, b: any) => {
                const first: any = new Date(a.start_register);
                const second: any = new Date(b.start_register);
                return first - second;
            });
            form.setValue('dataTable', sorting);
        } else if (tab === 'oldest') {
            const sorting = resFilter.sort((a: any, b: any) => {
                const first: any = new Date(a.start_register);
                const second: any = new Date(b.start_register);
                return second - first;
            });
            form.setValue('dataTable', sorting);
        } else {
            form.setValue('dataTable', resFilter);
        }

        setIsDialogFilter(false);
    };

    // Event Reset Filter
    const handleResetFilter = () => {
        form.setValue('dataTable', dummyData);
        form.setValue('tabFilter', 'all');
        form.setValue('titleFilter', '');
        form.setValue('gamesFilter', '');
        form.setValue('endDateFilter', '');
        form.setValue('startDateFilter', '');
        setFilteredData(dummyData);
        setIsDialogFilter(false);
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
            <TitleCard
                handleSearch={(keyword: any) => handleDataSearch(keyword)}
                onConfirm={(value: boolean) => handleDialog(value)}
                title='Participant Tournament'
                subtitle='Addtional description if required'
                isSearchExist
                isButtonCreateExist={false}
                placeholderSeacrhText='title, game, username, etc...'
                href='/games/add-game'
            />
            <Box position='absolute' top='55px' left='325px' zIndex={1}>
                <DialogFilter
                    listGames={listGames}
                    onReset={handleResetFilter}
                    onFilter={(data: any) => handleFilter(data)}
                    open={isDialogFilter}
                    setOpen={setIsDialogFilter}
                    form={form}
                    titleName='titleFilter'
                    gameName='gamesFilter'
                    startDateName='startDateFilter'
                    endDateName='endDateFilter'
                    tabName='tabFilter'
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
