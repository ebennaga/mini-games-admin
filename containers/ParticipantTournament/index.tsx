/* eslint-disable no-unused-vars */
import { Box, Skeleton } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import DialogSuccess from 'components/Dialog/DialogSuccess';
import PaginationCard from 'components/PaginationCard';
import TitleCard from 'components/Layout/TitleCard';
import DialogFilter from './DialogFilter';
import TableParticipant from './TableParticipant';

// Dummy Data for table
// const dummyData = [
//     {
//         id: 1,
//         title: 'Open Tourney Pre Launch Hop up',
//         game: 'Hop Up',
//         username: 'Lesty',
//         start_register: '2022-12-19T08:19:52.310Z',
//         end_register: '2022-12-29T08:19:52.310Z'
//     }
// ];
const ParticipantTournament = () => {
    interface listGamesI {
        id: number | string;
        title: string;
    }

    const [isDialogFilter, setIsDialogFilter] = React.useState<boolean>(false);
    const [openDialogConfirm, setOpenDialogConfirm] = React.useState<boolean>(false);
    const [openDialogSuccess, setOpenDialogSuccess] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [totalChecked, setTotalChecked] = React.useState<number>(0);
    const [dataComing, setDataComing] = React.useState<any>([]);
    const [query, setQuery] = React.useState('');
    const [filteredData, setFilteredData] = React.useState<any>([]);
    const [listGames, setListGames] = React.useState<Array<listGamesI>>([]);

    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
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
            idxAppears: { startIndex: 0, endIndex: 4 },
            row: 5,
            page: 1,
            tabFilter: 'all'
        }
    });

    // Fetch data table
    const handleFetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: '/tournament-participants'
            });

            if (response.status === 200) {
                setDataComing(response.data.data);
                setFilteredData(response.data.data);
                setIsLoading(false);
                form.setValue('dataTable', response.data.data);
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
    };

    // Fetch data games
    const handleFetchGames = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: 'games'
            });

            if (response.status === 200) {
                const { data } = response.data;
                const resData = data.map((item: any) => {
                    return { id: item.id, title: item.name };
                });
                setListGames(resData);
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsLoading(false);
    };
    console.log('datatable', form.watch('dataTable'));
    const handleRemoveParticipant = async () => {
        try {
            const table = form.watch('dataTable');

            table.map(async (item: any) => {
                if (item.isAction) {
                    const response = await fetchAPI({
                        endpoint: `tournament-participants/remove`,
                        method: 'DELETE'
                    });
                    if (response?.status === 200) {
                        console.log(2);
                        notify(response.data.message, 'success');
                        await handleFetchData();
                        setOpenDialogConfirm(false);
                        setOpenDialogSuccess(true);
                    }
                }
            });
        } catch (err: any) {
            notify(err.message, 'error');
        }
    };
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
        const table = dataComing;

        const resFilter = table.filter((item: any) => {
            const {
                tornament: { name: title },
                game: { name: gameName },
                created_at: startRegister,
                end_register: endRegister
            } = item;

            if (titleFilter && !gamefilt && !startDateFilter && !endDateFilter) {
                return title?.toLowerCase()?.includes(titleFilter.toLowerCase());
            }
            if (titleFilter && gamefilt && !startDateFilter && !endDateFilter) {
                return title?.toLowerCase()?.includes(titleFilter.toLowerCase()) && gameName.toLowerCase() === gamefilt.toLowerCase();
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
                    gameName.toLowerCase() === gamefilt.toLowerCase() &&
                    dateFormat(startRegister) === dateFormat(startDateFilter)
                );
            }
            if (titleFilter && gamefilt && !startDateFilter && endDateFilter) {
                return (
                    title?.toLowerCase()?.includes(titleFilter.toLowerCase()) &&
                    gameName.toLowerCase() === gamefilt.toLowerCase() &&
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
                return gameName.toLowerCase() === gamefilt.toLowerCase();
            }
            if (gamefilt && startDateFilter && !titleFilter && !endDateFilter) {
                return gameName.toLowerCase() === gamefilt.toLowerCase() && dateFormat(startRegister) === dateFormat(startDateFilter);
            }
            if (gamefilt && !startDateFilter && !titleFilter && endDateFilter) {
                return gameName.toLowerCase() === gamefilt.toLowerCase() && dateFormat(endRegister) === dateFormat(endDateFilter);
            }
            if (gamefilt && startDateFilter && !titleFilter && endDateFilter) {
                return (
                    gameName.toLowerCase() === gamefilt.toLowerCase() &&
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
                    gameName.toLowerCase() === gamefilt.toLowerCase() &&
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

        form.setValue('page', 1);
        form.setValue('idxAppears', { startIndex: 0, endIndex: 4 });
        form.setValue('row', 5);
        setIsDialogFilter(false);
    };

    // Event Reset Filter
    const handleResetFilter = () => {
        form.setValue('dataTable', dataComing);
        form.setValue('page', 1);
        form.setValue('idxAppears', { startIndex: 0, endIndex: 4 });
        form.setValue('row', 5);
        form.setValue('tabFilter', 'all');
        form.setValue('titleFilter', '');
        form.setValue('gamesFilter', '');
        form.setValue('endDateFilter', '');
        form.setValue('startDateFilter', '');
        setFilteredData(dataComing);
        setIsDialogFilter(false);
    };

    // Fetch data component did mount
    React.useEffect(() => {
        handleFetchData();
        handleFetchGames();
    }, []);

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
        // eslint-disable-next-line consistent-return, array-callback-return
        const temp = dataComing.filter((post: any) => {
            if (query === '') {
                return post;
            }
            if (
                post.user.username?.toString()?.toLowerCase()?.includes(query.toLowerCase()) ||
                post?.tornament?.name?.toLowerCase()?.includes(query.toLowerCase()) ||
                post.game.name?.toLowerCase()?.includes(query.toLowerCase())
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

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

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
                {isLoading ? (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {/* <CircularProgress size={100} color='secondary' /> */}
                        {[...Array(6)].map((item: any, index: number) => (
                            <Skeleton variant='rounded' width='100%' height='60px' key={index} sx={{ mt: '15px' }} />
                        ))}
                    </Box>
                ) : (
                    <TableParticipant name='dataTable' form={form} nameIdxAppears='idxAppears' />
                )}
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
                handleConfirm={handleRemoveParticipant}
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
