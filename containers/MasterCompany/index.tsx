/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import {
    Typography,
    Box,
    Paper,
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
// import CheckboxController from 'components/Checkbox';
import { useRouter } from 'next/router';
import TableCompanies from './TableCompanies';
import Pagination from './Pagination';
// import DeleteAccDialog from './DeleteAccDialog';

const MasterCompanyContainer = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            isActive: false,
            // name: '',
            // email: '',
            checkAll: false
        }
    });

    const { fetchAPI } = useAPICaller();
    const router = useRouter();
    const notify = useNotify();
    const [isActive] = useState('active');
    const [search, setSearch] = useState<any>([]);
    const [input, setInput] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    // const [role, setRole] = useState('0');
    const [checked, setIsChecked] = useState(false);
    const [checkedObj, setCheckedObj] = useState<string[]>([]);
    const [routeId, setRouteId] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [remove, setRemove] = useState<any>([]);
    const [row, setRow] = useState('7');
    const [filterData, setFilterData] = useState<any>([]);
    const [isFilter, setIsFilter] = useState(false);
    const checkBoxKeys: string[] = [];
    const checkTrue: string[] = [];
    const [deleted, setDeleted] = useState<number[]>([]);
    const [pages, setPages] = useState(1);

    const fetchCompaniesData = async () => {
        setIsLoading(true);
        try {
            const result = await fetchAPI({
                endpoint: `companies?search=${form.watch('search')}`,
                method: 'GET'
            });
            console.log('result', result);
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
        if ((search.length > 0 && form.watch('search')) || form.watch('search')) {
            return search.slice(startIndex, endIndex);
        }
        if (isFilter) {
            if (filterData.length >= 0) {
                return filterData.slice(startIndex, endIndex);
            }
        }
        return remove.slice(startIndex, endIndex);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
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

    const handleFilterButton = () => {
        const data = [...remove];
        const filter = data.filter((item: any) => {
            if (form.watch('isActive') || !form.watch('isActive')) {
                return item.is_active === form.watch('isActive');
            }
        });
        setFilterData(filter);
        setIsFilter(true);
        setOpenFilter(false);
    };

    const handleResetButton = () => {
        // setRole('0');
        setIsFilter(false);
        setOpenFilter(false);
        // form.reset();
        // setCheckedObj([]);
        // setIsChecked(false);
    };

    // const handleFiter = (event: SelectChangeEvent) => {
    //     setRole(event.target.value as string);
    // };

    const handleSwicth = (event: any) => {
        form.setValue('isActive', event.target.checked);
    };

    useEffect(() => {
        fetchCompaniesData();
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
        if (form.watch('search') === '') {
            setIsSearch(false);
            setSearch(remove);
        }
    }, [search, form.watch()]);

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
                                    const datas = [...remove];
                                    const searched = datas.filter((item: any) => {
                                        if (
                                            item?.name?.toLowerCase()?.includes(data.search.toLowerCase()) ||
                                            item?.code?.toLowerCase()?.includes(data.search.toLowerCase())
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
                                <InputSearch placeholder='Search by code or name' name='search' label='Search' form={form} />
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
                                router.push('/settings/company/add-company');
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
                            sx={{ width: '375px', height: '205px', position: 'absolute', zIndex: 2, padding: '20px', left: '330px' }}
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
                            {/* <Box sx={{ mt: '20px' }}>
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
                            </Box> */}
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
                                        router.push(`/settings/company/${routeId}`);
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
                        <TableCompanies
                            data={getPaginatedData()}
                            form={form}
                            handleChangeCheckbox={handleChangeChekcbox}
                            handleChangeCheckboxAll={handleChangeCheckboxAll}
                            remove={remove}
                            currentPage={currentPage}
                        />
                    )}
                    <Pagination
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                        row={row}
                        handleChange={handleChange}
                        remove={remove}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default MasterCompanyContainer;
