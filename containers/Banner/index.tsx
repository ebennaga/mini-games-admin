/* eslint-disable no-unused-vars */
import React from 'react';
import {
    Box,
    Typography,
    ButtonBase,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    FormControl,
    Switch,
    RadioGroup,
    Radio,
    FormControlLabel,
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
    Skeleton,
    CircularProgress
} from '@mui/material';
import TitleCard from 'components/Layout/TitleCard';
import CustomButton from 'components/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import CheckboxController from 'components/Checkbox';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingExchangeRates from 'containers/ExchangeRates/LoadingExchangeRates';
import { useRouter } from 'next/router';
import DialogSuccess from 'components/Dialog/DialogSuccess';
import DialogFilter from './DialogFilter';

const PurpleSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#9C27B0',
        '&:hover': {
            backgroundColor: alpha('#9C27B0', theme.palette.action.hoverOpacity)
        }
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#9C27B0'
    }
}));
const Banner = () => {
    const [openRemove, setOpenRemove] = React.useState(false);
    const [openFilter, setOpenFilter] = React.useState(false);
    const [openDialogSucces, setOpenDialogSuccess] = React.useState(false);
    const [menu, setMenu] = React.useState('1');
    const [row, setRow] = React.useState('0');
    const [filteredData, setFilteredData] = React.useState<any>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [checked, setIsChecked] = React.useState(false);
    const [checkedObj, setCheckedObj] = React.useState<string[]>([]);
    const checkBoxKeys: string[] = [];
    const [existingData, setExistingData] = React.useState<any>([]);
    const [query, setQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [loadingRemove, setLoadingRemove] = React.useState<boolean>(false);
    const [dataBanner, setDatabanner] = React.useState<any>([]);
    const [routeId, setRouteId] = React.useState<any>(null);
    const [listLink, setListLink] = React.useState<any>([]);
    const [data, setData] = React.useState<Array<any>>([]);
    const [listTable, setListTable] = React.useState<any>([]);
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const router = useRouter();

    const form = useForm({
        mode: 'all',
        defaultValues: {
            action: false,
            title: '',
            images: '',
            desc: '',
            dummyData: dataBanner,
            showTo: '',
            isActive: false,
            checkedAll: false,
            page: 1,
            select: ''
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMenu(event.target.value);
    };
    const handleDialog = (value: boolean) => {
        setOpenFilter(value);
    };
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
    const handleViewRow = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    const handleEdit = (id: any) => {
        const table: any = form.watch('dummyData');
        const filter = table.filter((item: any) => item.isAction);
        router.push(`/banner/${filter[0].id}`);
    };

    const handleCheckBoxAll = (e: any) => {
        const temp: any[] = [];
        form.setValue('checkedAll', e.target.checked);

        if (e.target.checked) {
            dataBanner.forEach((item: any, idx: number) => {
                const datas: any = `checkbox${item.id}`;
                form.setValue(datas, true);
                temp.push(item);
            });
            setExistingData(temp);
            setCheckedObj(checkBoxKeys);
        } else if (!e.target.checked) {
            setCheckedObj([]);
            setExistingData([]);
            dataBanner.forEach((item: any, idx: number) => {
                const datas: any = `checkbox${item.id}`;
                form.setValue(datas, false);
            });
        }
    };

    const checkTrue: string[] = [];
    const handleSingleCheckBox = (e: any, name: any, value: any) => {
        form.setValue(name, e.target.checked);
        const checkBox: any = { ...form.watch() };
        checkBoxKeys.forEach((item: any) => {
            if (checkBox[item] === true) {
                checkTrue.push(item);
            }
        });
        setCheckedObj(checkTrue);
        if (e.target.checked) {
            setExistingData([...existingData, value]);
        }
        if (!e.target.checked) {
            form.setValue('checkedAll', false);
            if (existingData.length > 0) {
                const filter = existingData.filter((item: any) => {
                    return value.id !== item.id;
                });
                setExistingData(filter);
            } else {
                setExistingData([]);
            }
        }
        setRouteId(value.id);
    };

    const getBanner = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: 'banners?search='
            });
            if (response.status === 200) {
                const dataFetch = response.data.data;
                setDatabanner(dataFetch);
                setData(dataFetch);
                setListTable(dataFetch);
                const { dataLink } = response.data;
                const resData = data.map((item: any) => {
                    return item.link;
                });
                setListLink(resData);
                setFilteredData(dataFetch);
                setRow('5');
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsLoading(false);
    };

    const handleRemoveData = async () => {
        setLoadingRemove(true);
        try {
            let idsError: any = [];
            const deleteDatas = existingData.map(async (item: any) => {
                const response = await fetchAPI({
                    endpoint: `banners/${item.id}`,
                    method: 'DELETE'
                });

                if (response.status !== 200) {
                    idsError = [...idsError, item.id];
                }
            });

            await Promise.all(deleteDatas);

            if (idsError.length > 0) {
                setLoadingRemove(false);
                return notify(`Delete banner with id: ${idsError.join()} Failed!`, 'error');
            }

            setCheckedObj([]);
            setExistingData([]);
            form.setValue('checkedAll', false);
            await getBanner();
            setOpenRemove(false);
            setOpenDialogSuccess(true);
            filteredData.forEach((item: any) => {
                const datas: any = `checkbox${item.id}`;
                form.setValue(datas, false);
            });
            setLoadingRemove(false);
            return notify('Successfully deleted banner');
        } catch (err: any) {
            setLoadingRemove(false);
            return notify(err.message, 'error');
        }
    };

    React.useEffect(() => {
        getBanner();
    }, []);

    React.useEffect(() => {
        setPages(Math.round(filteredData.length / Number(row)));
    }, [pages, row]);

    React.useEffect(() => {
        dataBanner.forEach((item: any, idx: number) => {
            const name: any = `checkbox${item.id}`;
            checkBoxKeys.push(name);
        });
        if (checkedObj.length > 0 || form.watch('checkedAll')) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [checkBoxKeys, form.watch('checkedAll')]);

    const handleDataSearch = (keyword: any) => {
        setQuery(keyword);
    };

    // if (isLoading) {
    //     return <LoadingExchangeRates />;
    // }
    const handleReset = () => {
        form.setValue('dummyData', data);
        form.setValue('page', 1);
        setDatabanner(data);
    };

    const sorting = (arr: any[], type: 'asc' | 'desc') => {
        const res = arr.sort((a: any, b: any) => {
            const first: any = new Date(a.created_at);
            const second: any = new Date(b.created_at);
            if (type === 'asc') {
                return first - second;
            }
            return second - first;
        });
        return res;
    };

    const handleFilter = (value: 'all' | 'latest' | 'oldest') => {
        const selectId = form.watch('select');

        if (selectId === '') {
            if (value === 'latest') {
                const res = sorting(dataBanner, 'asc');
                form.setValue('dummyData', res);
                setDatabanner(res);
            } else if (value === 'oldest') {
                const res = sorting(dataBanner, 'desc');
                form.setValue('dummyData', res);
                setDatabanner(res);
            } else {
                form.setValue('dummyData', data);
                setDatabanner(data);
            }
            form.setValue('page', 1);
        } else {
            const valueSelect: string = data.filter((item: any) => item.id === selectId)[0]?.link;

            const filterData = listTable.filter(
                (item: any) => item.link !== '' && item?.link?.toLowerCase()?.includes(valueSelect?.toLocaleLowerCase())
            );

            if (value === 'latest') {
                const res = sorting(filterData, 'asc');
                form.setValue('dummyData', res);
                setDatabanner(res);
            } else if (value === 'oldest') {
                const res = sorting(filterData, 'desc');
                form.setValue('dummyData', res);
                setDatabanner(res);
            } else {
                form.setValue('dummyData', filterData);
                setDatabanner(filterData);
            }
            form.setValue('page', 1);
        }
        setFilteredData(filteredData);
        setOpenFilter(false);
    };

    return (
        <Box component='section'>
            <Dialog
                open={openRemove}
                onClose={() => setOpenRemove(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle sx={{ m: 1, display: 'flex', justifyContent: 'center' }} id='alert-dialog-title'>
                    Are you sure remove this banner ?
                </DialogTitle>
                <DialogContent sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DialogContentText id='alert-dialog-description'>{checkedObj.length} items selected</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ m: 1, justifyContent: 'center' }}>
                    {loadingRemove ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <CustomButton title='REMOVE' height='47px' onClick={handleRemoveData} />
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
            <TitleCard
                handleSearch={(keyword: any) => handleDataSearch(keyword)}
                onConfirm={(value: boolean) => handleDialog(value)}
                title='Banner'
                subtitle='Addtional description if required'
                isSearchExist
                placeholderSeacrhText='Search by tittle, images, etc.'
                href='/banner/add-banner'
            />
            {checked && (
                <Box sx={{ mx: 1, my: 3, padding: 2, background: '#F4F1FF' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'black', fontWeight: 500, fontSize: '14px' }}>
                            {checkedObj.length} items selected
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            {checkedObj.length === 1 && (
                                <ButtonBase
                                    onClick={() => {
                                        router.push(`/banner/${routeId}`);
                                    }}
                                    sx={{ color: '#A54CE5', m: 1 }}
                                >
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
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
                                        Images
                                    </TableCell>
                                    <TableCell
                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                        align='center'
                                    >
                                        Description
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0',
                                            fontWeight: 'bold'
                                        }}
                                        align='center'
                                    >
                                        Show to
                                    </TableCell>
                                    <TableCell
                                        sx={{
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
                                                    onChange={handleCheckBoxAll}
                                                    checked={form.watch('checkedAll')}
                                                    disabled={filteredData.length === 0}
                                                />
                                            }
                                            label='Action'
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataBanner.length > 0 &&
                                    dataBanner // eslint-disable-next-line consistent-return, array-callback-return
                                        .filter((post: any) => {
                                            if (query === '') {
                                                return post;
                                            }
                                            if (
                                                post.id.toString().toLowerCase().includes(query.toLowerCase()) ||
                                                post?.image_url?.toLowerCase()?.includes(query.toLowerCase()) ||
                                                post?.link?.toLowerCase()?.includes(query.toLowerCase()) ||
                                                post.title.toLowerCase().includes(query.toLowerCase())
                                            ) {
                                                return post;
                                            }
                                        })
                                        .map((item: any, index: number) => {
                                            const check: any = `checkbox${item.id}`;
                                            const startIndex = currentPage * Number(row) - Number(row);
                                            const endIndex = startIndex + Number(row);
                                            // return filteredData.slice(startIndex, endIndex);
                                            return (
                                                index >= startIndex &&
                                                index < endIndex && (
                                                    <TableRow key={item.id}>
                                                        <TableCell align='center' sx={{ width: '5%' }}>
                                                            {index + 1}
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
                                                            {item.image_url}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                            align='center'
                                                        >
                                                            {item.desc}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                            align='center'
                                                        >
                                                            {item.link}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                            align='center'
                                                        >
                                                            <Box sx={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
                                                                <Box
                                                                    sx={
                                                                        item.is_active === 'Yes'
                                                                            ? {
                                                                                  backgroundColor: '#A54CE5',
                                                                                  borderRadius: '64px',
                                                                                  width: '33px',
                                                                                  height: '20px'
                                                                              }
                                                                            : {
                                                                                  backgroundColor: '#D32F2F',
                                                                                  borderRadius: '64px',
                                                                                  width: '33px',
                                                                                  height: '20px'
                                                                              }
                                                                    }
                                                                >
                                                                    {item.is_active ? 'Yes' : 'No'}
                                                                </Box>
                                                            </Box>
                                                        </TableCell>

                                                        <TableCell align='center' sx={{ width: '10%', fontWeight: 'bold' }}>
                                                            <CheckboxController
                                                                form={form}
                                                                name={`checkbox${item.id}`}
                                                                checked={!!form.watch(check)}
                                                                onChange={(e: any) => handleSingleCheckBox(e, `checkbox${item.id}`, item)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )
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
                            defaultValue={dataBanner?.length.toString()}
                            onChange={handleViewRow}
                        >
                            {[...Array(dataBanner?.length)].map((item: any, idx: number) => (
                                <MenuItem key={idx} value={idx + 1}>
                                    {idx + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography>
                        1-{row} of {dataBanner?.length}
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
            {/* <Dialog
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
                            marginBottom: '24px'
                        }}
                    >
                        <TextField id='outlined-select-currency' select label='Show to' value={menu} onChange={handleChange}>
                            {dataBanner.map((option: any) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.link}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                        <Typography sx={{ color: 'rgba(0, 0, 0, 0.6);', fontWeight: 500, fontSize: '16px' }}>Is Active</Typography>
                        <PurpleSwitch defaultChecked />
                    </Box>
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
            </Dialog> */}
            <Box position='absolute' top='236px' left='601px'>
                <DialogFilter
                    open={openFilter}
                    setOpen={setOpenFilter}
                    form={form}
                    nameSelect='select'
                    dataSelect={data.filter((item: any) => item.link !== '')}
                    handleFilter={(value) => handleFilter(value)}
                    handleReset={handleReset}
                />
            </Box>
            <DialogSuccess title='Successfully Banner' open={openDialogSucces} setOpen={setOpenDialogSuccess} />
        </Box>
    );
};

export default Banner;
