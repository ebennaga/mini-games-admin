/* eslint-disable no-unused-vars */
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
    Switch
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import InputSearch from 'components/Input/InputSearch';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FilterList, ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import CustomButton from 'components/Button';
import CheckboxController from 'components/Checkbox';
import CreateAccount from './CreateAccount';

const AccountContainer = () => {
    const dummy = [
        { id: 1, name: 'Rinto', email: 'test@abc.com', isActive: true },
        { id: 2, name: 'Arya', email: 'test@abc.com', isActive: false },
        { id: 3, name: 'Eben', email: 'test@abc.com', isActive: true },
        { id: 4, name: 'Amang', email: 'test@abc.com', isActive: false },
        { id: 5, name: 'Suwardi', email: 'test@abc.com', isActive: false },
        { id: 6, name: 'Saitama', email: 'test@abc.com', isActive: true },
        { id: 7, name: 'Sasukekyun', email: 'test@abc.com', isActive: true },
        { id: 8, name: 'Narto', email: 'test@abc.com', isActive: false },
        { id: 9, name: 'Ed Sheeran', email: 'test@abc.com', isActive: true },
        { id: 10, name: 'Tulus', email: 'test@abc.com', isActive: false },
        { id: 11, name: 'Tidak Tulus', email: 'test@abc.com', isActive: false }
    ];
    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            isActive: false,
            name: '',
            email: '',
            role: '0',
            activeRole: false
        }
    });

    const [openFilter, setOpenFilter] = React.useState(false);
    const [row, setRow] = React.useState('7');
    const [role, setRole] = React.useState('0');
    const [addRole, setAddRole] = React.useState('0');
    const [isActive, setIsActive] = React.useState('active');
    const [createAcc, setCreateAcc] = React.useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        return dummy.slice(startIndex, endIndex);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    const handleFiter = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    const handleAddRole = (event: any) => {
        form.setValue('role', event.target.value);
    };

    const handleSwicth = (event: any) => {
        form.setValue('isActive', event.target.checked);
    };

    const handleAddSetActive = (event: any) => {
        form.setValue('activeRole', event.target.checked);
    };

    const handleChangeChekcbox = (e: any, name: any) => {
        form.setValue(name, e.target.checked);
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

    useEffect(() => {
        setPages(Math.round(dummy.length / Number(row)));
    }, [pages, row]);

    return (
        <Box sx={{ width: '100%' }}>
            {createAcc ? (
                <CreateAccount
                    handleAddSetActive={handleAddSetActive}
                    activeRole={form.watch('activeRole')}
                    handleAddRole={handleAddRole}
                    addRole={form.watch('role')}
                    setCreateAcc={setCreateAcc}
                    createAcc={createAcc}
                    form={form}
                />
            ) : (
                <Box sx={{ padding: '35px 25px' }}>
                    <Paper sx={{ width: '100%', height: '170px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                        <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Account</Typography>
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
                                <InputSearch placeholder='Search by name, email, etc.' name='search' label='Search' form={form} />
                                <FilterList
                                    onClick={() => {
                                        setOpenFilter(!openFilter);
                                    }}
                                    sx={{ cursor: 'pointer' }}
                                />
                            </Box>
                            <CustomButton
                                onClick={() => {
                                    setCreateAcc(!createAcc);
                                }}
                                padding='10px'
                                width='150px'
                                height='45px'
                                title='CREATE VIEW'
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
                    <Box sx={{ mt: '20px' }}>
                        <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
                            <Table sx={{ width: '100%' }} aria-label='simple table'>
                                <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                                    <TableRow>
                                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>No.</TableCell>
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
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getPaginatedData().length > 0 &&
                                        getPaginatedData().map((item: any) => {
                                            const check: any = `checkbox${item.id}`;
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell sx={{ width: '5%' }}>{item.id}</TableCell>
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
                                                        Admin, Content Writer
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
                                                                    backgroundColor: item.isActive ? '#A54CE5' : 'red',
                                                                    padding: '2px',
                                                                    borderRadius: '10px',
                                                                    color: 'white'
                                                                }}
                                                            >
                                                                <Typography>{item.isActive ? 'Yes' : 'No'}</Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                                        <CheckboxController
                                                            form={form}
                                                            name={`checkbox${item.id}`}
                                                            checked={form.watch(check)}
                                                            onChange={(e: any) => handleChangeChekcbox(e, `checkbox${item.id}`)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                                                {[...Array(dummy.length)].map((item: any, idx: number) => (
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
                                        1-{row} of {dummy.length}
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
        </Box>
    );
};

export default AccountContainer;
