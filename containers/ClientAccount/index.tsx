/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import {
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    FormControlLabel,
    Switch,
    ButtonBase,
    Skeleton
} from '@mui/material';
// import useNotify from 'hooks/useNotify';
import { SelectChangeEvent } from '@mui/material/Select';
import InputSearch from 'components/Input/InputSearch';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FilterList, ArrowBackIos, ArrowForwardIos, Close, Edit, Delete } from '@mui/icons-material';
import CustomButton from 'components/Button';
import CheckboxController from 'components/Checkbox';
import { useRouter } from 'next/router';
// import useAPICaller from 'hooks/useAPICaller';
import DeleteAccDialog from './DeleteAccDialog';

const AccountContainer = () => {
    const dummy = [
        { id: 1, name: 'Owi-kun', email: 'owi@abc.com', roles: 'Admin, Content Writer', is_active: true },
        { id: 2, name: 'Arya', email: 'arya@abc.com', roles: 'Content Writer', is_active: false },
        { id: 3, name: 'Eben', email: 'eben@abc.com', roles: 'Super Admin', is_active: true },
        { id: 4, name: 'Amang', email: 'amang@abc.com', roles: 'Admin, Content Writer', is_active: false },
        { id: 5, name: 'Suwardi', email: 'wardi@abc.com', roles: 'Admin, Content Writer', is_active: false },
        { id: 6, name: 'Saitama', email: 'sai@abc.com', roles: 'Super Admin', is_active: true },
        { id: 7, name: 'Sasukekyun', email: 'kyun@abc.com', roles: 'Admin, Content Writer', is_active: true },
        { id: 8, name: 'Narto', email: 'arto@abc.com', roles: 'Content Writer', is_active: false },
        { id: 9, name: 'Ed Sheeran', email: 'sheer@abc.com', roles: 'Admin, Content Writer', is_active: true },
        { id: 10, name: 'Tulus', email: 'luhut@abc.com', roles: 'Admin, Content Writer, Super Admin', is_active: false },
        { id: 11, name: 'Tidak Tulus', email: 'tilus@abc.com', roles: 'Content Writer', is_active: false }
    ];
    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            isActive: false,
            name: '',
            email: '',
            checkAll: false
        }
    });
    // const { fetchAPI } = useAPICaller();
    const router = useRouter();
    // const notify = useNotify();
    const [openDialog, setOpenDialog] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [row, setRow] = useState('7');
    const [role, setRole] = useState('0');
    const [isActive] = useState('active');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [checked, setIsChecked] = useState(false);
    const [checkedObj, setCheckedObj] = useState<string[]>([]);
    const [deleted, setDeleted] = useState<number[]>([]);
    const [remove, setRemove] = useState<any>([]);
    const [onDelete, setOnDelete] = useState(false);
    const [search, setSearch] = useState<any>([]);
    const [filterData, setFilterData] = useState<any>([]);
    const [isFilter, setIsFilter] = useState(false);
    const [routeId, setRouteId] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const checkTrue: string[] = [];
    const checkBoxKeys: string[] = [];

    // const fetchAccountData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const result = await fetchAPI({
    //             endpoint: `accounts?search=${form.watch('search')}`,
    //             method: 'GET'
    //         });
    //         // console.log(result?.data.data);
    //         if (result.status === 200) {
    //             const totalFilter = result.data.data;
    //             const filter = totalFilter.filter((item: any) => item.name !== null);
    //             // console.log('totalfilter', filter);
    //             setRemove(filter);
    //         }
    //         setIsLoading(false);
    //     } catch (error: any) {
    //         notify(error.message, 'error');
    //         setIsLoading(false);
    //     }
    //     setIsLoading(false);
    // };

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        if (search.length > 0 || form.watch('search')) {
            return search.slice(startIndex, endIndex);
        }
        if (isFilter) {
            if ((role !== '0' && filterData.length > 0) || filterData.length >= 0) {
                return filterData.slice(startIndex, endIndex);
            }
        }
        return remove.slice(startIndex, endIndex);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    const handleFiter = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    const handleSwicth = (event: any) => {
        form.setValue('isActive', event.target.checked);
    };

    const handleChangeChekcbox = (e: any, name: any, id: number) => {
        form.setValue(name, e.target.checked);
        const checkBox: any = { ...form.watch() };
        checkBoxKeys.forEach((item: any) => {
            if (checkBox[item] === true) {
                checkTrue.push(item);
            }
        });
        setCheckedObj(checkTrue);
        if (e.target.checked) {
            setDeleted([...deleted, id]);
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
        setRouteId(id);
    };

    const handleChangeCheckboxAll = (e: any) => {
        form.setValue('checkAll', e.target.checked);
        const arr: any = [];
        if (e.target.checked) {
            setCheckedObj(checkBoxKeys);
            const checkBox: any = { ...form.watch() };
            [...Array(dummy.length)].forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, e.target.checked);
                arr.push(idx + 1);
                if (checkBox[idx + 1] === undefined || checkBox[idx + 1] === false) {
                    form.setValue(datas, true);
                } else {
                    form.setValue(datas, false);
                }
            });
            setDeleted(arr);
        } else if (!e.target.checked) {
            setCheckedObj([]);
            [...Array(dummy.length)].forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, false);
            });
            setDeleted([]);
        }
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

    const handleDelete = () => {
        const filter = remove.filter((item: any) => {
            return !deleted.includes(item.id);
        });
        setRemove(filter);
        setOnDelete(!onDelete);
        setCheckedObj([]);
    };

    const handleFilterButton = () => {
        const data = [...remove];
        const filter = data.filter((item: any) => {
            const toArr = item.roles.split(',');
            if (form.watch('isActive') || !form.watch('isActive')) {
                return item.is_active === form.watch('isActive') && toArr.includes(role);
            }
            return toArr.includes(role);
        });
        setFilterData(filter);
        setIsFilter(true);
        setOpenFilter(false);
    };

    const handleResetButton = () => {
        setRole('0');
        setIsFilter(false);
        setOpenFilter(false);
        // form.reset();
        // setCheckedObj([]);
        // setIsChecked(false);
    };

    useEffect(() => {
        setRemove(dummy);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // useEffect(() => {
    //     fetchAccountData();
    // }, []);

    useEffect(() => {
        setPages(Math.ceil(remove.length / Number(row)));
    }, [pages, row]);

    useEffect(() => {
        [...Array(dummy.length)].forEach((item: any, idx: number) => {
            checkBoxKeys.push(`checkbox${idx + 1}`);
        });
        if (checkedObj.length > 0 || form.watch('checkAll')) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [checkBoxKeys, form.watch('checkAll')]);

    useEffect(() => {
        if (form.watch('search') === '') {
            // setIsSearch(false);
            setSearch(remove);
        }
    }, [search, form.watch()]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ padding: '35px 25px' }}>
                <Paper sx={{ width: '100%', height: '170px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Client Account</Typography>
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
                                onSubmit={form.handleSubmit((data: any) => {
                                    const datas = [...remove];
                                    const searched = datas.filter((item: any) => {
                                        if (
                                            item?.name?.toLowerCase()?.includes(data.search.toLowerCase()) ||
                                            item?.email?.toLowerCase()?.includes(data.search.toLowerCase())
                                        ) {
                                            return item;
                                        }
                                    });
                                    if (pages === 1) {
                                        setCurrentPage(1);
                                    }
                                    setSearch(searched);
                                })}
                            >
                                <InputSearch placeholder='Search by name, email, etc.' name='search' label='Search' form={form} />
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
                                router.push('/client-account/add-client-account');
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
                        <Paper
                            elevation={3}
                            sx={{ width: '375px', height: '305px', position: 'absolute', zIndex: 2, padding: '20px', left: '330px' }}
                        >
                            {/* <form
                                onSubmit={form.handleSubmit((data: any) => {
                                    console.log('yeay');
                                })}
                            > */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 700, fontSize: '20px' }}>Filters</Typography>
                                <Close
                                    onClick={() => {
                                        setOpenFilter(!openFilter);
                                    }}
                                    sx={{ color: 'rgba(0, 0, 0, 0.6)', cursor: 'pointer' }}
                                />
                            </Box>
                            <Box sx={{ mt: '20px' }}>
                                <FormControl fullWidth>
                                    <InputLabel sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                        Role Code
                                    </InputLabel>
                                    <Select
                                        sx={{ color: role === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                        placeholder='Select Category'
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={role}
                                        label='Role Code'
                                        onChange={handleFiter}
                                    >
                                        <MenuItem value='0' disabled>
                                            Select Category
                                        </MenuItem>
                                        <MenuItem value='Super Admin'>Super Admin</MenuItem>
                                        <MenuItem value='Admin'>Admin</MenuItem>
                                        <MenuItem value='Content Writer'>Content Writer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: '20px' }}>
                                <FormControlLabel
                                    sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 800 }}
                                    value={isActive}
                                    control={<Switch color='secondary' />}
                                    label='Is Active'
                                    labelPlacement='start'
                                    checked={form.watch('isActive')}
                                    onChange={handleSwicth}
                                />
                            </Box>
                            <Box sx={{ mt: '30px', justifyContent: 'space-between', display: 'flex', width: '100%' }}>
                                <CustomButton onClick={handleFilterButton} title='FILTER' width='159px' height='36px' />
                                <CustomButton
                                    onClick={handleResetButton}
                                    title='RESET'
                                    width='159px'
                                    height='36px'
                                    backgroundColor='white'
                                    color='#A54CE5'
                                    border='1px solid #A54CE5
                              '
                                />
                            </Box>
                            {/* </form> */}
                        </Paper>
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
                        <Box
                            sx={{
                                width: '12%',
                                display: 'flex',
                                justifyContent: checkedObj.length === 1 ? 'space-between' : 'flex-end',
                                alignItems: 'center'
                            }}
                        >
                            {checkedObj.length === 1 && (
                                <ButtonBase
                                    onClick={() => {
                                        router.push(`/client-account/${routeId}`);
                                    }}
                                    sx={{
                                        color: '#A54CE5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <Edit />
                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>EDIT</Typography>
                                </ButtonBase>
                            )}
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
                            <Table sx={{ width: '100%' }} aria-label='simple table'>
                                <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                                    <TableRow>
                                        <TableCell align='center' sx={{ width: '5%', fontWeight: 'bold' }}>
                                            No.
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                            align='left'
                                        >
                                            Name
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                            align='left'
                                        >
                                            Email
                                        </TableCell>
                                        <TableCell
                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                            align='left'
                                        >
                                            Role
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
                                            Is Active
                                        </TableCell>
                                        <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                            <FormControlLabel
                                                control={
                                                    <CheckboxController
                                                        name='action'
                                                        form={form}
                                                        onChange={handleChangeCheckboxAll}
                                                        checked={form.watch('checkAll')}
                                                        disabled={remove.length === 0}
                                                    />
                                                }
                                                label='Action'
                                            />
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
                                                        {currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10}.
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='left'
                                                    >
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='left'
                                                    >
                                                        {item.email}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='left'
                                                    >
                                                        {item.roles}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            width: '5%',
                                                            borderLeft: '1px solid #E0E0E0',
                                                            borderRight: '1px solid #E0E0E0'
                                                        }}
                                                        align='center'
                                                    >
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Box
                                                                sx={{
                                                                    width: '70%',
                                                                    backgroundColor: item.is_active ? '#A54CE5' : 'red',
                                                                    padding: '2px',
                                                                    borderRadius: '10px',
                                                                    color: 'white'
                                                                }}
                                                            >
                                                                <Typography>{item.is_active ? 'Yes' : 'No'}</Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                                        <CheckboxController
                                                            form={form}
                                                            name={`checkbox${item.id}`}
                                                            checked={!!form.watch(check)}
                                                            onChange={(e: any) => handleChangeChekcbox(e, `checkbox${item.id}`, item.id)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {getPaginatedData().length === 0 && (
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
            <DeleteAccDialog
                form={form}
                setIsChecked={setIsChecked}
                setOnDelete={setOnDelete}
                onDelete={onDelete}
                handleDelete={handleDelete}
                open={openDialog}
                setOpen={setOpenDialog}
                qty={checkedObj.length}
                titleDialog='Are you sure remove this account?'
            />
        </Box>
    );
};

export default AccountContainer;
