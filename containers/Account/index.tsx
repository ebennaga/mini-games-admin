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
    CircularProgress
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import InputSearch from 'components/Input/InputSearch';
import React, { useEffect, useState } from 'react';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import { useForm } from 'react-hook-form';
import { FilterList, ArrowBackIos, ArrowForwardIos, Close, Edit, Delete } from '@mui/icons-material';
import CustomButton from 'components/Button';
import CheckboxController from 'components/Checkbox';
import { useRouter } from 'next/router';
import DeleteAccDialog from './DeleteAccDialog';

const AccountContainer = () => {
    // const dummy = [
    //     { id: 1, name: 'Owi-kun', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: true },
    //     { id: 2, name: 'Rinto', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: false },
    //     { id: 3, name: 'Eben', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: true },
    //     { id: 4, name: 'Amang', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: false },
    //     { id: 5, name: 'Suwardi', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: false },
    //     { id: 6, name: 'Saitama', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: true },
    //     { id: 7, name: 'Sasukekyun', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: true },
    //     { id: 8, name: 'Narto', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: false },
    //     { id: 9, name: 'Ed Sheeran', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: true },
    //     { id: 10, name: 'Tulus', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: false },
    //     { id: 11, name: 'Tidak Tulus', email: 'test@abc.com', access: ['Admin', 'Content Creator'], isActive: false }
    // ];
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
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

    const router = useRouter();
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
    const [input, setInput] = useState('');
    const [routeId, setRouteId] = useState<any>(null);
    const [isSearch, setIsSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const checkTrue: string[] = [];
    const checkBoxKeys: string[] = [];

    const fetchAccountData = async () => {
        setIsLoading(true);
        try {
            const result = await fetchAPI({
                endpoint: `accounts?search=${form.watch('search')}`,
                method: 'GET'
            });
            console.log(result?.data.data);
            if (result.status === 200) {
                setRemove(result?.data.data);
            }
            // setIsLoading(false);
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        if (isSearch) {
            return search.slice(startIndex, endIndex);
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
            [...Array(remove.length)].forEach((item: any, idx: number) => {
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
            [...Array(remove.length)].forEach((item: any, idx: number) => {
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

    const fetchDeleteData = async (id: any) => {
        try {
            const result = await fetchAPI({
                endpoint: `accounts/${id}`,
                method: 'DELETE'
            });
            notify(result?.data.message);
        } catch (err: any) {
            notify(err.message);
        }
    };

    const handleDelete = () => {
        deleted.forEach((item: any) => {
            fetchDeleteData(item);
        });
        const filter = remove.filter((item: any) => {
            return !deleted.includes(item.id);
        });
        setRemove(filter);
        setOnDelete(!onDelete);
        setCheckedObj([]);
    };

    useEffect(() => {
        fetchAccountData();
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

    useEffect(() => {
        if (isSearch) {
            const searched = remove.filter((item: any) => {
                if (input) {
                    if (item.name.toLowerCase().includes(input) || item.email.toLowerCase().includes(input)) {
                        return item;
                    }
                }
            });
            setSearch(searched);
        }
        if (form.watch('search') === '') {
            setIsSearch(false);
        }
    }, [remove, input]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ padding: '35px 25px' }}>
                <Paper sx={{ width: '100%', height: '170px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Master Company</Typography>
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
                                    setInput(data.search);
                                    setIsSearch(true);
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
                                router.push('/account/add-account');
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
                                        <MenuItem value='1'>Super Admin</MenuItem>
                                        <MenuItem value='2'>Admin</MenuItem>
                                        <MenuItem value='3'>Content Writer</MenuItem>
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
                                <CustomButton title='FILTER' width='159px' height='36px' />
                                <CustomButton
                                    title='RESET'
                                    width='159px'
                                    height='36px'
                                    backgroundColor='white'
                                    color='#A54CE5'
                                    border='1px solid #A54CE5
                                '
                                />
                            </Box>
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
                                        router.push(`/account/${routeId}`);
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
                <Box sx={{ mt: isLoading ? '50px' : '20px' }}>
                    {isLoading ? (
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress size={100} color='secondary' />
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
                                            const check: any = `checkbox${
                                                currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10
                                            }`;
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
                                                            name={`checkbox${
                                                                currentPage === 1
                                                                    ? idx + 1
                                                                    : currentPage > 1 && idx + 1 + (currentPage - 1) * 10
                                                            }`}
                                                            checked={!!form.watch(check)}
                                                            onChange={(e: any) =>
                                                                handleChangeChekcbox(
                                                                    e,
                                                                    `checkbox${
                                                                        currentPage === 1
                                                                            ? idx + 1
                                                                            : currentPage > 1 && idx + 1 + (currentPage - 1) * 10
                                                                    }`,
                                                                    Number(
                                                                        currentPage === 1
                                                                            ? idx + 1
                                                                            : currentPage > 1 && idx + 1 + (currentPage - 1) * 10
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                            <Typography>{currentPage}</Typography>
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
                titleDialog='Are you sure remove this account ?'
            />
        </Box>
    );
};

export default AccountContainer;
