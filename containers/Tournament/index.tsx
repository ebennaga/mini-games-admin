/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-unused-vars */
import { Typography, Box, Paper, MenuItem, FormControl, Select, ButtonBase } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import InputSearch from 'components/Input/InputSearch';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FilterList, ArrowBackIos, ArrowForwardIos, Delete } from '@mui/icons-material';
import CustomButton from 'components/Button';
import { getCurrentDate, getCurrentTime } from 'utils/date';
import Tables from './TournamentTable';
import DeleteAccDialog from '../Account/DeleteAccDialog';
import FilterDrop from './FilterDrop';
import CreateTournament from './CreateTournament';
import dummy from './dummy';
import LeaderboardDialog from './LeaderboardTour';

const TournamentContainer = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            isActive: false,
            activeRole: true,
            checkAll: false,
            titleSearch: '',
            role: '0',
            start: new Date().toISOString().slice(0, 10) || '',
            end: new Date().toISOString().slice(0, 10) || '',
            startDate: new Date().toISOString().slice(0, 10) || '',
            endDate: new Date().toISOString().slice(0, 10) || '',
            maxDate: getCurrentDate(),
            title: '',
            startTime: getCurrentTime(),
            endTime: getCurrentTime(),
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
    const [role, setRole] = useState('0');
    const [createTournament, setCreateTournament] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [checked, setIsChecked] = useState(false);
    const [checkedObj, setCheckedObj] = useState<string[]>([]);
    const [deleted, setDeleted] = useState<number[]>([]);
    const [leaderboards, setLeaderboards] = useState<any>(null);
    const [remove, setRemove] = useState<any>([]);
    const [onDelete, setOnDelete] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState('all');
    const checkTrue: string[] = [];
    const checkBoxKeys: string[] = [];

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        return remove.slice(startIndex, endIndex);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
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
            const checkBox: any = { ...form.watch() };
            [...Array(dummy.length)].forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, false);
            });
            setDeleted([]);
        }
    };

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

    const handleDelete = () => {
        const filter = remove.filter((item: any) => {
            return !deleted.includes(item.id);
        });
        setRemove(filter);
        setOnDelete(!onDelete);
        setCheckedObj([]);
    };

    useEffect(() => {
        setRemove(dummy);
    }, []);

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

    React.useEffect(() => {
        const input = form.watch();
        if (input.start) {
            form.setValue('maxDate', input.start);
        }
        if (input.end) {
            form.setValue('maxDate', input.end);
        }
    }, [form.watch('start'), form.watch('end'), form.watch('startTime'), form.watch('endTime')]);

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
                                <InputSearch placeholder='Search by title' name='search' label='Search' form={form} />
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
                                selectedValue={selectedValue}
                                role={role}
                                form={form}
                                openFilter={openFilter}
                                setOpenFilter={setOpenFilter}
                                handleChangeRadio={handleChangeRadio}
                                handleFiter
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
                        <Tables
                            setLeaderboards={setLeaderboards}
                            openDialogTour={openDialogTour}
                            setOpenDialogTour={setOpenDialogTour}
                            data={getPaginatedData()}
                            form={form}
                            handleChangeCheckboxAll={handleChangeCheckboxAll}
                            remove={remove}
                            handleChangeChekcbox={handleChangeChekcbox}
                        />
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
                handleDelete={handleDelete}
                open={openDialog}
                setOpen={setOpenDialog}
                qty={checkedObj.length}
                titleDialog='Are you sure remove this tour?'
            />
            <LeaderboardDialog
                item={leaderboards}
                open={openDialogTour}
                setOpenDialog={() => {
                    setOpenDialogTour(!openDialogTour);
                }}
            />
        </Box>
    );
};

export default TournamentContainer;
