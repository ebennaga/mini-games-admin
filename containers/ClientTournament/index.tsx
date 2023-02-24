import TitleCard from 'components/Layout/TitleCard';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import {
    Box,
    Typography,
    ButtonBase,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Select,
    SelectChangeEvent,
    Popover,
    DialogActions,
    DialogContentText,
    Skeleton
} from '@mui/material';
import CheckboxController from 'components/Checkbox';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import InputDate from 'components/Input/InputDate';
import { getCurrentDate } from 'utils/date';
import Input from 'components/Input/Input';
import InputSelect from 'components/Input/InputSelect';
import { CheckCircle } from '@mui/icons-material';

const valueList = [
    {
        id: 'closed',
        title: 'Closed'
    },
    {
        id: 'open',
        title: 'Open'
    }
];

const prizeType = [
    { id: 'coins', title: 'Coins' },
    { id: 'point', title: 'Point' }
];

const gamesSelect = [
    { id: 'hop up', title: 'Hop Up' },
    { id: 'rose dart', title: 'Rose Dart' },
    { id: 'block stack', title: 'Block Stack' }
];

const tabList = ['All', 'Latest', 'Oldest'];

// const dummyData = [
//     {
//         id: 1,
//         title: 'Touney Starling CP lt Ground',
//         start: '2022-12-20T04:45:18.000Z',
//         end: '2022-12-25T04:45:18.000Z',
//         games: 'Hop Up',
//         mode: 'Closed',
//         fee: 0,
//         prize: 10000,
//         prize_type: 'Coins'
//     },
//     {
//         id: 2,
//         title: 'Open Tourney Texxas Chicken 2022',
//         start: '2022-12-22T17:45:18.000Z',
//         end: '2022-12-24T17:45:18.000Z',
//         games: 'Block Stack',
//         mode: 'Open',
//         fee: 20,
//         prize: 20000,
//         prize_type: 'Point'
//     },
//     {
//         id: 3,
//         title: 'Tourney Starbuck Cp lt 2',
//         start: '2022-12-28T23:00:18.000Z',
//         end: '2022-12-31T16:59:18.000Z',
//         games: 'Rose Dart',
//         mode: 'Closed',
//         fee: 20,
//         prize: 20000,
//         prize_type: 'Point'
//     },
//     {
//         id: 4,
//         title: 'Tourney Starbuck Cp lt 2',
//         start: '2023-01-04T17:00:00.000Z',
//         end: '2023-01-08T17:00:00.000Z',
//         games: 'Rose Dart',
//         mode: 'Closed',
//         fee: 20,
//         prize: 20000,
//         prize_type: 'Point'
//     }
// ];

const ClientTournament = () => {
    const dateOption: any = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const timeOption: any = { hour: '2-digit', minute: '2-digit', hour12: false };

    const form = useForm({
        mode: 'all',
        defaultValues: {
            action: false,
            title: '',
            start: '',
            end: '',
            games: '',
            mode: '',
            fee: 0,
            prize: 10000,
            prizeType: '',
            checkedAll: false,
            startDate: '',
            endDate: '',
            maxDate: getCurrentDate(),
            startTime: '',
            endTime: '',
            keySearch: ''
        }
    });

    const [openFilter, setOpenFilter] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [row, setRow] = React.useState('');
    const [filteredData, setFilteredData] = React.useState<any>([]);
    const [searchData, setSearchData] = React.useState<any>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [checked, setIsChecked] = React.useState(false);
    const [checkedObj, setCheckedObj] = React.useState<string[]>([]);
    let checkBoxKeys: string[] = [];
    const [openRemove, setOpenRemove] = React.useState(false);
    const [val, setVal] = React.useState<string>('All');
    const [existingData, setExistingData] = React.useState<any>([]);
    const [defaultData, setDefaultData] = React.useState<Array<any>>([]);
    const [loadingDelete, setLoadingDelete] = React.useState<boolean>(false);
    const [onDelete, setOnDelete] = React.useState(false);

    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    // Fetch data client Tournament
    const fetchData = async () => {
        setIsLoading(true);
        try {
            // fetch data companies
            const getCompanies = await fetchAPI({
                method: 'GET',
                endpoint: `companies`
            });

            if (getCompanies.status === 200) {
                const companies = getCompanies.data.data;
                let result: any = [];

                // Looping through companies to fetch data client tournaments with the company id
                const getClientTournaments = companies.map(async (item: any) => {
                    setIsLoading(true);
                    const response = await fetchAPI({
                        method: 'GET',
                        endpoint: `tournaments?company_id=${item.id}`
                    });

                    if (response.status === 200) {
                        // saving data response into result
                        result = [...result, ...response.data.data];
                    }
                });

                // waiting for looping client tournaments
                await Promise.all(getClientTournaments);

                setFilteredData(result);
                setDefaultData(result);
                setSearchData(result);
                setRow(result.length.toString());
                setIsLoading(false);
            } else {
                notify(getCompanies?.data?.message);
                setIsLoading(false);
            }
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchData();
        // setFilteredData(dummyData);
    }, []);

    React.useEffect(() => {
        setPages(Math.round(filteredData.length / Number(row)));
    }, [pages, row]);

    React.useEffect(() => {
        // [...Array(filteredData.length)].forEach((item: any, idx: number) => {
        //     checkBoxKeys.push(`checkbox${idx + 1}`);
        // });
        const ObjForm = { ...form.watch() };
        const makeArr = Object.keys(ObjForm).filter((item: any) => item.includes('checkbox'));
        checkBoxKeys = [...makeArr];
        if (checkedObj.length > 0 || form.watch('checkedAll')) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [checkBoxKeys, form.watch('checkedAll')]);

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        return filteredData.slice(startIndex, endIndex);
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

    const handleDialog = (value: boolean) => {
        setOpenFilter(value);
    };

    const handleViewRow = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    const handleChangeTab = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVal(event.target.value);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleCheckBoxAll = (e: any) => {
        const temp: any[] = [];
        form.setValue('checkedAll', e.target.checked);
        if (e.target.checked) {
            filteredData.forEach((item: any) => {
                const datas: any = `checkbox${item.id}`;
                form.setValue(datas, e.target.checked);
                temp.push(item);
            });
            setExistingData(temp);
            setCheckedObj(checkBoxKeys);
        } else if (!e.target.checked) {
            setCheckedObj([]);
            setExistingData([]);
            filteredData.forEach((item: any) => {
                const datas: any = `checkbox${item.id}`;
                form.setValue(datas, false);
            });
        }
    };

    const checkTrue: string[] = [];
    const handleSingleCheckBox = (e: any, name: any, id: number) => {
        // console.log('name : ', name);
        form.setValue(name, e.target.checked);
        const checkBox: any = { ...form.watch() };
        checkBoxKeys.forEach((item: any) => {
            if (checkBox[item] === true) {
                checkTrue.push(item);
            }
        });
        setCheckedObj(checkTrue);
        if (e.target.checked) {
            setExistingData([...existingData, id]);
        }
        if (!e.target.checked) {
            if (existingData.length > 0) {
                const filter = existingData.filter((item: any) => {
                    return id !== item;
                });
                console.log(filter);
                setExistingData(filter);
            } else {
                setExistingData([]);
            }
        }
    };

    // console.log(existingData);

    const handleRemoveData = async () => {
        setLoadingDelete(true);
        try {
            const idFailedDelete: any = []; // data
            const deleteCheckedClientTournament = existingData.map(async (id: any) => {
                const response = await fetchAPI({
                    endpoint: `/tournaments/${id}`,
                    method: 'DELETE'
                });
                if (response.status !== 200) {
                    idFailedDelete.push(id);
                }
            });
            await Promise.all(deleteCheckedClientTournament);
            if (idFailedDelete.length === 0) {
                notify('Deleted tournaments success', 'success');
            } else {
                notify(`Id tournaments: ${idFailedDelete.join()} failed to delete`, 'error');
            }

            await fetchData();
            setOnDelete(true);
            setCheckedObj([]);
            existingData.forEach((_item: any) => {
                const datas: any = `checkbox${_item}`;
                form.setValue(datas, false);
            });
        } catch (error: any) {
            notify(error.message, 'error');
            setLoadingDelete(false);
            setOpenRemove(false);
        }
        setLoadingDelete(false);
        // const res = filteredData.filter((item: any) => !existingData.includes(item));
        // setCheckedObj([]);
        // setFilteredData(res);
        // setExistingData([]);
        // setOpenRemove(false);
        // setRow(res.length);
        // filteredData.forEach((item: any, idx: number) => {
        //     const datas: any = `checkbox${idx + 1}`;
        //     form.setValue(datas, false);
        // });
    };
    // console.log(checkedObj);
    // // console.log(existingData);
    // console.log(form.watch());

    const handleEdit = () => {
        // const { id } = filteredData[existingData];
        router.push(`/tournament/client-tournament/${existingData}`);
    };

    // Component Update for Search Event
    const keySearch = form.watch('keySearch');
    React.useEffect(() => {
        const tempData = [...searchData];
        const result = tempData.filter((item: any) => {
            if (keySearch) {
                return item?.name?.toLowerCase()?.includes(keySearch.toLowerCase());
            }
            return item;
        });
        setFilteredData(result);
    }, [keySearch]);

    // Event Handler Filter
    const handleFilter = () => {
        let result: Array<any> = [];
        const data = filteredData;
        const { title, mode, prizeType: prize, games, startDate, startTime, endDate, endTime } = form.watch();

        if (title) {
            const arr = result.length > 0 ? result : data;
            result = [...arr.filter((item: any) => item?.title?.toLowerCase()?.includes(title.toLowerCase()))];
        }
        if (mode) {
            const arr = result.length > 0 ? result : data;
            result = [...arr.filter((item: any) => item?.mode?.toLowerCase() === mode.toLowerCase())];
        }
        if (prize) {
            const arr = result.length > 0 ? result : data;
            result = [...arr.filter((item: any) => item?.prize_type?.toLowerCase() === prize.toLowerCase())];
        }
        if (games) {
            const arr = result.length > 0 ? result : data;
            result = [...arr.filter((item: any) => item?.games?.toLowerCase() === games.toLowerCase())];
        }
        if (startDate) {
            const arr = result.length > 0 ? result : data;
            result = [
                ...arr.filter((item: any) => {
                    const value: any = new Date(item.start.slice(0, 10));
                    const filter: any = new Date(startDate);
                    return value >= filter;
                })
            ];
        }
        if (endDate) {
            const arr = result.length > 0 ? result : data;
            result = [
                ...arr.filter((item: any) => {
                    const value: any = new Date(item.end.slice(0, 10));
                    const filter: any = new Date(endDate);
                    return value <= filter;
                })
            ];
        }
        if (startTime && !endTime) {
            const arr = result.length > 0 ? result : data;
            result = [
                ...arr.filter((item: any) => {
                    const itemStart = new Date(item.start).toLocaleString('ca', timeOption);
                    return itemStart === startTime;
                })
            ];
        }
        if (endTime && !startTime) {
            const arr = result.length > 0 ? result : data;
            result = [
                ...arr.filter((item: any) => {
                    const itemEnd = new Date(item?.end)?.toLocaleString('ca', timeOption);
                    return itemEnd === endTime;
                })
            ];
        }
        if (endTime && startTime) {
            const arr = result.length > 0 ? result : data;
            result = [
                ...arr.filter((item: any) => {
                    const itemStart = new Date(item.start).toLocaleString('ca', timeOption);
                    const itemEnd = new Date(item.end).toLocaleString('ca', timeOption);
                    return itemStart >= startTime && itemEnd <= endTime;
                })
            ];
        }
        if (!title && !mode && !prize && !games && !startDate && !startTime && !endDate && !endTime) {
            result = [...defaultData];
        }

        if (val === 'Latest') {
            result = [
                ...result.sort((a: any, b: any) => {
                    const first: any = new Date(a.start);
                    const second: any = new Date(b.start);
                    return first - second;
                })
            ];
        }
        if (val === 'Oldest') {
            result = [
                ...result.sort((a: any, b: any) => {
                    const first: any = new Date(a.start);
                    const second: any = new Date(b.start);
                    return second - first;
                })
            ];
        }
        setFilteredData(result);
        setRow(result.length.toString());
        setPages(1);
        setOpenFilter(false);
        setCurrentPage(1);
    };

    // Event handle Reset filter
    const handleResetFilter = () => {
        form.setValue('title', '');
        form.setValue('mode', '');
        form.setValue('prizeType', '');
        form.setValue('games', '');
        form.setValue('startDate', '');
        form.setValue('startTime', '');
        form.setValue('endDate', '');
        form.setValue('endTime', '');
        setFilteredData(defaultData);
        setRow(defaultData.length.toString());
        setPages(1);
        setCurrentPage(1);
        setOpenFilter(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // console.log(userState.company_id);
    return (
        <Box>
            <Dialog
                open={openFilter}
                onClose={() => setOpenFilter(false)}
                PaperProps={{ sx: { width: '100%', maxWidth: '375px', borderRadius: '4px', margin: 0 } }}
            >
                <DialogTitle
                    sx={{
                        position: 'relative',
                        background: 'transparent',
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 20px'
                    }}
                >
                    <Typography sx={{ flex: 1, fontWeight: 500, color: 'rgba(0, 0, 0, 0.6);', fontSize: '16px' }} component='div'>
                        Filters
                    </Typography>
                    <IconButton edge='start' color='inherit' onClick={() => setOpenFilter(false)} aria-label='close'>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <RadioGroup
                            defaultValue='All'
                            value={val}
                            row
                            aria-labelledby='demo-row-radio-buttons-group-label'
                            name='row-radio-buttons-group'
                        >
                            {tabList.map((item: any) => {
                                return (
                                    <FormControlLabel
                                        key={item}
                                        sx={{ mr: 1 }}
                                        value={item}
                                        control={
                                            <Radio
                                                onClick={(e: any) => handleChangeTab(e)}
                                                sx={{
                                                    color: 'grey',
                                                    '&.Mui-checked': {
                                                        color: '#A54CE5'
                                                    }
                                                }}
                                            />
                                        }
                                        label={item}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            marginTop: '14px',
                            marginBottom: '14px'
                        }}
                    >
                        <Input form={form} name='title' label='Title' placeholder='Enter Title' />
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            marginTop: '14px',
                            marginBottom: '14px'
                        }}
                    >
                        <InputSelect form={form} name='mode' dataSelect={valueList} title='Tournament Mode' placeholder='Select Mode' />
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            marginTop: '14px',
                            marginBottom: '14px'
                        }}
                    >
                        <InputSelect form={form} name='prizeType' dataSelect={prizeType} title='Prize Type' placeholder='Select Type' />
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            marginTop: '14px',
                            marginBottom: '14px'
                        }}
                    >
                        <InputSelect form={form} name='games' dataSelect={gamesSelect} title='Games' placeholder='Select Games' />
                    </FormControl>

                    <Box sx={{ marginTop: '14px' }}>
                        <InputDate label='Start Date' type='date' form={form} name='startDate' />
                    </Box>
                    <Box sx={{ marginTop: '24px' }}>
                        <InputDate label='End Date' type='date' form={form} name='endDate' />
                    </Box>
                    <FormControl fullWidth>
                        <InputDate label='Start Time' type='time' form={form} name='startTime' />
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            marginBottom: '14px'
                        }}
                    >
                        <InputDate label='End Time' type='time' form={form} name='endTime' />
                    </FormControl>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, mb: 3, mt: 2 }}>
                        <ButtonBase
                            onClick={handleFilter}
                            sx={{
                                background: '#A54CE5',
                                borderRadius: '4px',
                                width: '100%',
                                pt: 1,
                                pb: 1,
                                color: 'white',
                                fontWeight: 500
                            }}
                        >
                            FILTER
                        </ButtonBase>
                        <ButtonBase
                            onClick={handleResetFilter}
                            sx={{
                                border: '1px solid #A54CE5',
                                borderRadius: '4px',
                                width: '100%',
                                fontWeight: 500,
                                background: 'white',
                                color: '#A54CE5'
                            }}
                        >
                            RESET
                        </ButtonBase>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openRemove}
                onClose={() => setOpenRemove(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle sx={{ m: 1, display: 'flex', justifyContent: 'center' }} id='alert-dialog-title'>
                    {onDelete ? 'Success Remove Account' : 'Are you sure remove this prizes ?'}
                </DialogTitle>
                <DialogContent sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {onDelete ? (
                        <CheckCircle sx={{ width: '80px', height: '80px', color: '#A54CE5', my: '20px' }} />
                    ) : (
                        <DialogContentText id='alert-dialog-description'>{checkedObj.length} items selected</DialogContentText>
                    )}
                </DialogContent>
                <DialogActions sx={{ m: 1 }}>
                    {onDelete ? (
                        <CustomButton
                            onClick={() => {
                                setOpenRemove(false);
                                setTimeout(() => {
                                    setOnDelete(!onDelete);
                                }, 2000);
                            }}
                            title='Back'
                            width='100%'
                        />
                    ) : (
                        <>
                            {' '}
                            <CustomButton title='REMOVE' isDisable={loadingDelete} height='47px' onClick={handleRemoveData} />
                            <CustomButton
                                title='CANCEL'
                                backgroundColor='white'
                                color='#A54CE5'
                                border='1px solid #A54CE5'
                                height='47px'
                                onClick={() => setOpenRemove(false)}
                            />
                        </>
                    )}
                </DialogActions>
            </Dialog>
            <Box component='section'>
                <TitleCard
                    onConfirm={(value: boolean) => handleDialog(value)}
                    handleSearch={(key: string) => form.setValue('keySearch', key)}
                    title='Client Tournament'
                    subtitle='Addtional description if required'
                    isSearchExist
                    placeholderSeacrhText='Search by title'
                    href='/tournament/client-tournament/add-client-tournament'
                />
                {checked && (
                    <Box sx={{ mx: 1, my: 3, padding: 2, background: '#F4F1FF' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ color: 'black', fontWeight: 500, fontSize: '14px' }}>
                                {checkedObj.length} items selected
                            </Typography>
                            <Box sx={{ display: 'flex' }}>
                                {checkedObj.length === 1 && (
                                    <ButtonBase onClick={handleEdit} sx={{ color: '#A54CE5', m: 1 }}>
                                        <ModeEditIcon />
                                        <Typography sx={{ fontWeight: 500, fontSize: '13px', pl: 0.5 }}>EDIT</Typography>
                                    </ButtonBase>
                                )}
                                <ButtonBase sx={{ color: '#A54CE5', m: 1 }} onClick={() => setOpenRemove(true)}>
                                    <DeleteIcon />
                                    <Typography sx={{ fontWeight: 500, fontSize: '13px', pl: 0.5 }}>REMOVE</Typography>
                                </ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                )}
                <Box sx={{ mt: '20px' }}>
                    {isLoading ? (
                        <Box
                            sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                        >
                            {/* <CircularProgress size={100} color='secondary' /> */}
                            {[...Array(6)].map((item: any, index: number) => (
                                <Skeleton variant='rounded' width='100%' height='60px' key={index} sx={{ mt: '15px' }} />
                            ))}
                        </Box>
                    ) : (
                        <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
                            <Table sx={{ width: '100%' }}>
                                <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                                    <TableRow>
                                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>No.</TableCell>
                                        <TableCell
                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                            align='center'
                                        >
                                            Title
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                            align='center'
                                        >
                                            Start Date
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                            align='center'
                                        >
                                            Start Time
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                            align='center'
                                        >
                                            End Date
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                            align='center'
                                        >
                                            End Time
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderLeft: '1px solid #E0E0E0',
                                                borderRight: '1px solid #E0E0E0',
                                                fontWeight: 'bold'
                                            }}
                                            align='center'
                                        >
                                            Games
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderLeft: '1px solid #E0E0E0',
                                                borderRight: '1px solid #E0E0E0',
                                                fontWeight: 'bold'
                                            }}
                                            align='center'
                                        >
                                            Tournament Mode
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderLeft: '1px solid #E0E0E0',
                                                borderRight: '1px solid #E0E0E0',
                                                fontWeight: 'bold'
                                            }}
                                            align='center'
                                        >
                                            Registration Fee
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderLeft: '1px solid #E0E0E0',
                                                borderRight: '1px solid #E0E0E0',
                                                fontWeight: 'bold'
                                            }}
                                            align='center'
                                        >
                                            Prize Type
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                borderLeft: '1px solid #E0E0E0',
                                                borderRight: '1px solid #E0E0E0',
                                                fontWeight: 'bold'
                                            }}
                                            align='center'
                                        >
                                            Total Prize
                                        </TableCell>
                                        <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                            <FormControlLabel
                                                control={
                                                    <CheckboxController
                                                        name='action'
                                                        form={form}
                                                        onChange={handleCheckBoxAll}
                                                        checked={form.watch('checkedAll')}
                                                        disabled={filteredData.length === 0}
                                                    />
                                                }
                                                label='Action'
                                            />
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '8%',
                                                borderLeft: '1px solid #E0E0E0',
                                                borderRight: '1px solid #E0E0E0',
                                                fontWeight: 'bold'
                                            }}
                                            align='center'
                                        >
                                            More
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getPaginatedData().length > 0 &&
                                        getPaginatedData().map((item: any, idx: number) => {
                                            const check: any = `checkbox${item.id}`;
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell align='center' sx={{ width: '5%' }}>
                                                        {currentPage === 1 ? idx + 1 : idx + 1 + Number(row) * (currentPage - 1)}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {new Date(item.start_time).toLocaleString('id', dateOption)}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {new Date(item.start_time).toLocaleString(undefined, timeOption)}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {new Date(item.end_time).toLocaleString('id', dateOption)}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {new Date(item.end_time).toLocaleString(undefined, timeOption)}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item?.game?.name}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.entry_coin > 0 ? 'Grand Tournaments' : 'Casual Tournaments'}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.entry_coin}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.prize_type}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.total_point}
                                                    </TableCell>
                                                    <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                                        <CheckboxController
                                                            form={form}
                                                            name={`checkbox${item.id}`}
                                                            checked={!!form.watch(check)}
                                                            onChange={(e: any) => handleSingleCheckBox(e, `checkbox${item.id}`, item.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell align='center' sx={{ borderLeft: '1px solid #E0E0E0' }}>
                                                        <IconButton onClick={handleClick}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Popover
                                                            id={id}
                                                            open={open}
                                                            anchorEl={anchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right'
                                                            }}
                                                        >
                                                            <Box sx={{ p: 1 }}>
                                                                <CustomButton
                                                                    onClick={() =>
                                                                        router.push(`/tournament/client-tournament/${item.id}/set-prizes`)
                                                                    }
                                                                    width='121px'
                                                                    height='30px'
                                                                    title='SET PRIZE'
                                                                />
                                                            </Box>
                                                        </Popover>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', fontSize: '12px', fontWeight: 400 }}>
                        <Typography>Rows per page</Typography>
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
                                defaultValue='5'
                                onChange={handleViewRow}
                            >
                                {[...Array(filteredData.length)].map((item: any, idx: number) => (
                                    <MenuItem key={idx} value={idx + 1}>
                                        {idx + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography>
                            1-{row} of {defaultData?.length}
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton onClick={goToPreviousPage}>
                                <ArrowBackIosIcon sx={{ cursor: 'pointer', mx: 3 }} />
                            </IconButton>
                            <IconButton onClick={goToNextPage}>
                                <ArrowForwardIosIcon sx={{ cursor: 'pointer' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ClientTournament;
