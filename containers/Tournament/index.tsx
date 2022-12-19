/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-unused-vars */
import { Typography, Box, Paper, MenuItem, FormControl, Select, ButtonBase, CircularProgress } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import InputSearch from 'components/Input/InputSearch';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FilterList, ArrowBackIos, ArrowForwardIos, Delete } from '@mui/icons-material';
import CustomButton from 'components/Button';
import { getCurrentDate, getCurrentTime } from 'utils/date';
import useNotify from 'hooks/useNotify';
import { useRouter } from 'next/router';
import useAPICaller from 'hooks/useAPICaller';
import Tables from './TournamentTable';
import DeleteAccDialog from '../Account/DeleteAccDialog';
import FilterDrop from './FilterDrop';
import CreateTournament from './CreateTournament';
// import dummy from './dummy';
import LeaderboardDialog from './LeaderboardTour';

const TournamentContainer = () => {
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            search: '',
            isActive: false,
            activeRole: true,
            checkAll: false,
            titleSearch: '',
            role: '0',
            start: new Date().toISOString().slice(0, 10) || '',
            end: new Date().toISOString().slice(0, 10) || '',
            startDate: '',
            endDate: '',
            maxDate: getCurrentDate(),
            title: '',
            startTime: '',
            endTime: '',
            image: '',
            fee: 0,
            pool: 0
        }
    });

    // const [createTour, setCreateTour] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogTour, setOpenDialogTour] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [row, setRow] = useState('7');
    const [game, setGame] = useState('0');
    const [createTournament, setCreateTournament] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [checked, setIsChecked] = useState(false);
    const [checkedObj, setCheckedObj] = useState<string[]>([]);
    const [deleted, setDeleted] = useState<number[]>([]);
    const [leaderboards, setLeaderboards] = useState<any>(null);
    const [remove, setRemove] = useState<any>([]);
    const [gamesData, setGameDatas] = useState<any>([]);
    const [onDelete, setOnDelete] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    const [search, setSearch] = useState<any>([]);
    const [input, setInput] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isGame, setIsGame] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const checkTrue: string[] = [];
    const checkBoxKeys: string[] = [];
    const notify = useNotify();
    const { fetchAPI } = useAPICaller();
    const router = useRouter();

    const handleFetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: '/tournaments'
            });
            if (response.status === 200) {
                const tournaments = response.data.data;
                setRemove(tournaments);
                setRow(tournaments.length.toString());
                setIsLoading(false);
                // notify(response?.data.message, 'success');
            }
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
    };
    const handleRemoveData = async () => {
        try {
            const response = await fetchAPI({
                endpoint: `/product-prizes/${router.query.id}`,
                method: 'DELETE'
            });
            if (response.status === 200) {
                notify(response.data.message, 'success');
                const res = remove.filter((item: any) => !deleted.includes(item));
                setDeleted([]);
                setCheckedObj([]);
                setRow(res.length);
                form.setValue('checkAll', false);
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        if (isSearch) {
            return search.slice(startIndex, endIndex);
        }
        if ((game !== '0' && gamesData.length > 0) || (selectedValue && gamesData.length > 0) || gamesData.length > 0) {
            return gamesData.slice(startIndex, endIndex);
        }
        return remove.slice(startIndex, endIndex);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    const handleChangeGame = (event: SelectChangeEvent) => {
        setGame(event.target.value as string);
        setIsGame(true);
    };

    const handleChangeChekcbox = (e: any, name: any, id: number) => {
        form.setValue(name, e.target.checked);
        const checkBox: any = { ...form.watch() };
        checkBoxKeys.forEach((item: any) => {
            if (checkBox[item] === true) {
                checkTrue.push(item);
            }
        });
        if (checkTrue.length === remove.length) {
            form.setValue('checkAll', true);
        } else {
            form.setValue('checkAll', false);
        }
        setCheckedObj(checkTrue);

        if (e.target.checked) {
            const found = remove.find((element: any) => {
                return element.id === id;
            });
            setDeleted([...deleted, found]);
        }

        if (!e.target.checked) {
            if (deleted.length > 0) {
                const filter = deleted.filter((item: any) => {
                    return id !== item;
                });
                setDeleted(filter);
            } else {
                setDeleted([]);
            }
        }
    };

    const handleChangeCheckboxAll = (e: any) => {
        const temp: any[] = [];
        form.setValue('checkAll', e.target.checked);
        if (e.target.checked) {
            remove.forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, e.target.checked);
                temp.push(item);
            });
            setDeleted(temp);
            setCheckedObj(checkBoxKeys);
        } else if (!e.target.checked) {
            setCheckedObj([]);
            setDeleted([]);
            remove.forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, false);
            });
        }
    };
    // const handleChangeCheckboxAll = (e: any) => {
    //     form.setValue('checkAll', e.target.checked);
    //     const arr: any = [];
    //     if (e.target.checked) {
    //         setCheckedObj(checkBoxKeys);
    //         const checkBox: any = { ...form.watch() };
    //         [...Array(remove.length)].forEach((item: any, idx: number) => {
    //             const datas: any = `checkbox${idx + 1}`;
    //             form.setValue(datas, e.target.checked);
    //             arr.push(idx + 1);
    //             if (checkBox[idx + 1] === undefined || checkBox[idx + 1] === false) {
    //                 form.setValue(datas, true);
    //             } else {
    //                 form.setValue(datas, false);
    //             }
    //         });
    //         setDeleted(arr);
    //     } else if (!e.target.checked) {
    //         setCheckedObj([]);
    //         const checkBox: any = { ...form.watch() };
    //         [...Array(remove.length)].forEach((item: any, idx: number) => {
    //             const datas: any = `checkbox${idx + 1}`;
    //             form.setValue(datas, false);
    //         });
    //         setDeleted([]);
    //     }
    // };

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const goToNextPage = () => {
        if (currentPage !== pages) {
            setCurrentPage((page) => page + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((page) => page - 1);
        }
    };

    const handleFilterButton = () => {
        let games: any = [...remove];

        if (selectedValue === 'oldest') {
            const filter = games.sort((a: any, b: any) => {
                return Date.parse(a.start_time) - Date.parse(b.start_time);
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }
        if (selectedValue === 'latest') {
            const filter = games.sort((a: any, b: any) => {
                return Date.parse(b.start_time) - Date.parse(a.start_time);
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }
        if (game !== '0') {
            const filter = games.filter((item: any) => {
                return item.game.id === game;
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }
        if (form.watch('startDate') && !form.watch('endDate')) {
            const filter = games.filter((item: any) => {
                return item.start_time.slice(0, 10) === form.watch('startDate');
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }
        if (form.watch('endDate') && !form.watch('startDate')) {
            const filter = games.filter((item: any) => {
                return item.end_time.slice(0, 10) === form.watch('endDate');
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }

        if (form.watch('startDate') && form.watch('endDate')) {
            const filter = games.filter((item: any) => {
                const eventDate = new Date(item.start_time).getTime();
                return eventDate >= new Date(form.watch('startDate')).getTime() && eventDate <= new Date(form.watch('endDate')).getTime();
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }
        if (form.watch('startTime') && !form.watch('endTime')) {
            const filter = games.filter((item: any) => {
                const options: any = { hour: '2-digit', minute: '2-digit' };
                const startTime = new Date(item.start_time).toLocaleString(undefined, options);
                return startTime.slice(0, 5) === form.watch('startTime');
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }
        if (form.watch('endTime') && !form.watch('startTime')) {
            const filter = games.filter((item: any) => {
                const options: any = { hour: '2-digit', minute: '2-digit' };
                const endTime = new Date(item.end_time).toLocaleString(undefined, options);
                return endTime.slice(0, 5) === form.watch('endTime');
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }
        if (form.watch('startTime') && form.watch('endTime')) {
            const filter = games.filter((item: any) => {
                const options: any = { hour: '2-digit', minute: '2-digit', hour12: false };
                const start = new Date(item.start_time).toLocaleTimeString(undefined, options);
                const end = new Date(item.end_time).toLocaleTimeString(undefined, options);
                return (
                    start >= form.watch('startTime') &&
                    end <= form.watch('endTime') &&
                    end > form.watch('startTime') &&
                    start < form.watch('endTime')
                );
            });
            games = [...filter];
            setGameDatas(games);
            setOpenFilter(false);
        }
        if (selectedValue === 'all') {
            setGameDatas(remove);
            setGame('0');
            form.reset();
            setSelectedValue('');
            setOpenFilter(false);
        }
        // setFilter(true);
    };

    const handleResetButton = () => {
        setIsGame(false);
        setSelectedValue('');
        setGame('0');
        form.reset();
        return handleFetchData();
    };

    // console.log(remove);

    // const handleDelete = () => {
    //     const filter = remove.filter((item: any) => {
    //         return !deleted.includes(item.id);
    //     });
    //     setRemove(filter);
    //     setOnDelete(!onDelete);
    //     setCheckedObj([]);
    // };

    useEffect(() => {
        handleFetchData();
        // setRemove(dummy);
    }, []);

    useEffect(() => {
        setPages(Math.ceil(remove.length / Number(row)));
    }, [pages, row]);

    useEffect(() => {
        [...Array(remove.length)].forEach((item: any, idx: number) => {
            checkBoxKeys.push(`checkbox${idx + 1}`);
        });
        if (checkedObj.length > 0 || form.watch('checkAll')) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [checkBoxKeys, form.watch('checkAll')]);

    React.useEffect(() => {
        const inputs = form.watch();
        if (inputs.start) {
            form.setValue('maxDate', inputs.start);
        }
        if (inputs.end) {
            form.setValue('maxDate', inputs.end);
        }
    }, [form.watch('start'), form.watch('end'), form.watch('startTime'), form.watch('endTime')]);

    useEffect(() => {
        if (isSearch) {
            const searched = remove.filter((item: any) => {
                if (input) {
                    if (
                        item.name.toLowerCase().includes(input.toLowerCase()) ||
                        item.game.name.toLowerCase().includes(input.toLowerCase())
                    ) {
                        return item;
                    }
                }
            });
            setSearch(searched);
        }
        if (form.watch('search') === '') {
            setIsSearch(false);
        }
    }, [remove, input, search]);

    return (
        <Box sx={{ width: '100%' }}>
            {createTournament ? (
                <CreateTournament form={form} createTour={createTournament} setCreateTour={setCreateTournament} />
            ) : (
                <Box sx={{ padding: '0px 25px' }}>
                    <Paper sx={{ width: '100%', height: '170px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                        <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Tournament</Typography>
                        <Typography sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400 }}>
                            Additional description if required
                        </Typography>
                        <Box
                            sx={{
                                mt: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '25%',
                                    gap: '10px'
                                }}
                            >
                                <form
                                    onSubmit={form.handleSubmit((data: any, e: any) => {
                                        setInput(data.search);
                                        setIsSearch(true);
                                    })}
                                >
                                    <InputSearch placeholder='Search by title, game, etc' name='search' label='Search' form={form} />
                                </form>

                                <FilterList
                                    onClick={() => {
                                        setOpenFilter(!openFilter);
                                    }}
                                    sx={{ cursor: 'pointer' }}
                                />
                            </Box>
                            <CustomButton
                                onClick={() => {
                                    setCreateTournament(!createTournament);
                                }}
                                padding='10px'
                                width='150px'
                                height='45px'
                                title='CREATE NEW'
                                backgroundColor='#A54CE5
'
                            />
                        </Box>
                        {openFilter && (
                            <FilterDrop
                                // disabled={game !== '0'}
                                handleReset={handleResetButton}
                                selectedValue={selectedValue}
                                game={game}
                                form={form}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                                handleChangeRadio={handleChangeRadio}
                                handleFiter={handleChangeGame}
                                handleFilterButton={handleFilterButton}
                            />
                        )}
                    </Paper>
                    {checked && (
                        <Box
                            sx={{
                                padding: '8px 16px',
                                backgroundColor: '#F4F1FF',
                                height: '72px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mt: '20px'
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>{checkedObj.length} item selected</Typography>
                            <Box sx={{ width: '13%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                <ButtonBase
                                    onClick={() => {
                                        setOpenDialog(!openDialog);
                                    }}
                                    sx={{ color: '#A54CE5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                >
                                    <Delete />
                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>REMOVE</Typography>
                                </ButtonBase>
                            </Box>
                        </Box>
                    )}
                    <Box sx={{ mt: '20px' }}>
                        {isLoading ? (
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress size={100} color='secondary' sx={{ marginTop: '50px' }} />
                            </Box>
                        ) : (
                            <Tables
                                currentPage={currentPage}
                                // setLeaderboards={setLeaderboards}
                                // openDialogTour={openDialogTour}
                                // setOpenDialogTour={setOpenDialogTour}
                                data={getPaginatedData()}
                                form={form}
                                handleChangeCheckboxAll={handleChangeCheckboxAll}
                                remove={remove}
                                handleChangeChekcbox={handleChangeChekcbox}
                            />
                        )}
                        {remove.length === 0 && !isLoading && (
                            <Box sx={{ width: '100%', textAlign: 'center', mt: '100px' }}>
                                <Typography variant='h6' component='h6'>
                                    DATA NOT FOUND, PLEASE RESET THE FILTER
                                </Typography>
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: '10px' }}>
                            <Box />
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '20%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                                    <Typography>Rows per page</Typography>
                                    <Box>
                                        <FormControl>
                                            <Select
                                                sx={{
                                                    boxShadow: 'none',
                                                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                                    '& .Mui-focused': { border: 0 }
                                                }}
                                                labelId='demo-simple-select-label'
                                                id='demo-simple-select'
                                                value={row}
                                                onChange={handleChange}
                                            >
                                                {[...Array(remove.length)].map((item: any, idx: number) => (
                                                    <MenuItem key={idx} value={idx + 1}>
                                                        {idx + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex' }}>
                                    <Typography>
                                        1-{row} of {remove.length}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', width: '15%', justifyContent: 'space-between' }}>
                                    <ArrowBackIos onClick={goToPreviousPage} sx={{ cursor: 'pointer' }} />
                                    <ArrowForwardIos onClick={goToNextPage} sx={{ cursor: 'pointer' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
            <DeleteAccDialog
                form={form}
                setIsChecked={setIsChecked}
                setOnDelete={setOnDelete}
                onDelete={onDelete}
                handleDelete={handleRemoveData}
                open={openDialog}
                setOpen={setOpenDialog}
                qty={checkedObj.length}
                titleDialog='Are you sure remove this tour?'
            />
            {openDialogTour && (
                <LeaderboardDialog
                    item={leaderboards}
                    open={openDialogTour}
                    setOpenDialog={() => {
                        setOpenDialogTour(!openDialogTour);
                    }}
                />
            )}
        </Box>
    );
};

export default TournamentContainer;
