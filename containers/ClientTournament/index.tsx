import TitleCard from 'components/Layout/TitleCard';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    TextField,
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
    DialogContentText
} from '@mui/material';
import CheckboxController from 'components/Checkbox';
import { useForm } from 'react-hook-form';
import CustomButton from 'components/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import InputDate from 'components/Input/InputDate';
import { getCurrentDate, getCurrentTime } from 'utils/date';

const valueList = [
    {
        value: '1',
        label: 'Value 1'
    },
    {
        value: '2',
        label: 'Value 2'
    }
];

const dummyData = [
    {
        id: 1,
        title: 'Touney Starling CP lt Ground',
        start: '18-10-2022',
        end: '25-10-2022',
        games: 'Hop Up',
        mode: 'Closed',
        fee: 20,
        prize: 10000
    },
    {
        id: 2,
        title: 'Open Tourney Texxas Chicken 2022',
        start: '18-10-2022',
        end: '25-10-2022',
        games: 'Block Stack',
        mode: 'Open',
        fee: 20,
        prize: 20000
    },
    {
        id: 3,
        title: 'Tourney Starbuck Cp lt 2',
        start: '18-10-2022',
        end: '25-10-2022',
        games: 'Rose Dart',
        mode: 'Closed',
        fee: 20,
        prize: 20000
    },
    {
        id: 4,
        title: 'Tourney Starbuck Cp lt 2',
        start: '18-10-2022',
        end: '25-10-2022',
        games: 'Rose Dart',
        mode: 'Closed',
        fee: 20,
        prize: 20000
    }
];
const ClientTournament = () => {
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
            checkedAll: false,
            startDate: new Date().toJSON().slice(0, 10),
            endDate: new Date().toJSON().slice(0, 10),
            maxDate: getCurrentDate(),
            startTime: getCurrentTime(),
            endTime: getCurrentTime()
        }
    });
    const [openFilter, setOpenFilter] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [row, setRow] = React.useState(dummyData.length.toString());
    const [filteredData, setFilteredData] = React.useState<any>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [checked, setIsChecked] = React.useState(false);
    const [checkedObj, setCheckedObj] = React.useState<string[]>([]);
    const checkBoxKeys: string[] = [];
    const [openRemove, setOpenRemove] = React.useState(false);
    const [val, setVal] = React.useState('1');
    const [removeData, setRemoveData] = React.useState<any>([]);
    const router = useRouter();

    React.useEffect(() => {
        setFilteredData(dummyData);
    }, []);

    React.useEffect(() => {
        setPages(Math.round(filteredData.length / Number(row)));
    }, [pages, row]);

    React.useEffect(() => {
        [...Array(dummyData.length)].forEach((item: any, idx: number) => {
            checkBoxKeys.push(`checkbox${idx + 1}`);
        });
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            dummyData.forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, e.target.checked);
                temp.push(item);
            });
            setRemoveData(temp);
            setCheckedObj(checkBoxKeys);
        } else if (!e.target.checked) {
            setCheckedObj([]);
            setRemoveData([]);
            dummyData.forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, false);
            });
        }
    };

    const handleSingleCheckBox = (e: any, name: any, id: number) => {
        if (!e.target.checked) {
            form.setValue('checkedAll', false);
            if (removeData.length === 1) {
                setRemoveData([]);
                setRow('0');
            } else {
                setRemoveData([removeData[removeData.findIndex((obj: any) => obj.id !== id)]]);
            }
        } else {
            setRemoveData([...removeData, filteredData[filteredData.findIndex((obj: any) => obj.id === id)]]);
        }
        form.setValue(name, e.target.checked);
        const checkBox: any = { ...form.watch() };
        const updateChecked: string[] = [];
        checkBoxKeys.forEach((item: any) => {
            if (checkBox[item]) {
                updateChecked.push(item);
            }
        });
        setCheckedObj(updateChecked);

        if (updateChecked.length === dummyData.length) {
            form.setValue('checkedAll', true);
        }
    };

    const handleRemoveData = () => {
        const res = filteredData.filter((item: any) => !removeData.includes(item));
        setCheckedObj([]);
        setFilteredData(res);
        setRemoveData([]);
        setOpenRemove(false);
        setRow(res.length);
        filteredData.forEach((item: any, idx: number) => {
            const datas: any = `checkbox${idx + 1}`;
            form.setValue(datas, false);
        });
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
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
                        <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
                            <FormControlLabel
                                sx={{ mr: 1 }}
                                value='all'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'grey',
                                            '&.Mui-checked': {
                                                color: '#A54CE5'
                                            }
                                        }}
                                    />
                                }
                                label='All'
                            />
                            <FormControlLabel
                                sx={{ ml: 1, mr: 1 }}
                                value='latest'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'grey',
                                            '&.Mui-checked': {
                                                color: '#A54CE5'
                                            }
                                        }}
                                    />
                                }
                                label='Latest'
                            />
                            <FormControlLabel
                                sx={{ ml: 1, mr: 1 }}
                                value='oldest'
                                control={
                                    <Radio
                                        sx={{
                                            color: 'grey',
                                            '&.Mui-checked': {
                                                color: '#A54CE5'
                                            }
                                        }}
                                    />
                                }
                                label='Oldest'
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            marginTop: '14px',
                            marginBottom: '14px'
                        }}
                    >
                        <TextField id='outlined-select-title' select label='Title' value={val} onChange={handleChange}>
                            {valueList.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl
                        fullWidth
                        sx={{
                            marginTop: '14px',
                            marginBottom: '14px'
                        }}
                    >
                        <TextField id='outlined-select-games' select label='Games' value={val} onChange={handleChange}>
                            {valueList.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <Box sx={{ marginTop: '14px' }}>
                        <InputDate label='Start Date' type='date' form={form} name='startDate' />
                    </Box>
                    <Box sx={{ marginTop: '24px' }}>
                        <InputDate label='End Date' type='date' form={form} name='endDate' />
                    </Box>
                    <FormControl
                        fullWidth
                        sx={{
                            marginTop: '14px',
                            marginBottom: '14px'
                        }}
                    >
                        <TextField id='outlined-select-mode' select label='Tournament Mode' value={val} onChange={handleChange}>
                            {valueList.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, mb: 3, mt: 2 }}>
                        <ButtonBase
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
                    Are you sure remove this prizes ?
                </DialogTitle>
                <DialogContent sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DialogContentText id='alert-dialog-description'>{checkedObj.length} items selected</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ m: 1 }}>
                    <CustomButton title='REMOVE' height='47px' onClick={handleRemoveData} />
                    <CustomButton
                        title='CANCEL'
                        backgroundColor='white'
                        color='#A54CE5'
                        border='1px solid #A54CE5'
                        height='47px'
                        onClick={() => setOpenRemove(false)}
                    />
                </DialogActions>
            </Dialog>
            <Box component='section'>
                <TitleCard
                    onConfirm={(value: boolean) => handleDialog(value)}
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
                                <ButtonBase sx={{ color: '#A54CE5', m: 1 }}>
                                    <ModeEditIcon />
                                    <Typography sx={{ fontWeight: 500, fontSize: '13px', pl: 0.5 }}>EDIT</Typography>
                                </ButtonBase>
                                <ButtonBase sx={{ color: '#A54CE5', m: 1 }} onClick={() => setOpenRemove(true)}>
                                    <DeleteIcon />
                                    <Typography sx={{ fontWeight: 500, fontSize: '13px', pl: 0.5 }}>REMOVE</Typography>
                                </ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                )}
                <Box sx={{ mt: '20px' }}>
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
                                        Start
                                    </TableCell>
                                    <TableCell
                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                        align='center'
                                    >
                                        End
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
                                    getPaginatedData().map((item: any) => {
                                        const check: any = `checkbox${item.id}`;
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell align='center' sx={{ width: '5%' }}>
                                                    {item.id}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.title}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.start}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.end}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.games}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.mode}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.fee}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.prize}
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
                                                                onClick={() => router.push('/settings/product-prizes')}
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
                                defaultValue={dummyData.length.toString()}
                                onChange={handleViewRow}
                            >
                                {[...Array(dummyData.length)].map((item: any, idx: number) => (
                                    <MenuItem key={idx} value={idx + 1}>
                                        {idx + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography>
                            1-{row} of {dummyData.length}
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
