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
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    InputLabel,
    InputAdornment,
    MenuItem,
    TextField,
    OutlinedInput,
    TableContainer,
    TableBody,
    Table,
    TableRow,
    TableCell,
    SelectChangeEvent,
    Select,
    TableHead,
    Switch
} from '@mui/material';
import TitleCard from 'components/Layout/TitleCard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from 'components/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import CheckboxController from 'components/Checkbox';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import { useRouter } from 'next/router';
import { alpha, styled } from '@mui/material/styles';
// const dummyData = [
//     {
//         id: '1',
//         code: 'PC0001',
//         name: 'Mousepad Logitech',
//         category: 'Accessories',
//         uom: 'Pcs',
//         qty: '5',
//         img1: 'https://drivegoogle/image acc_001-2022.Jpeg',
//         img2: 'https://drivegoogle/image acc_002-2022.Jpeg',
//         img3: 'https://drivegoogle/image acc_003-2022.Jpeg',
//         isActive: 'No'
//     },
//     {
//         id: '2',
//         code: 'PC0002',
//         name: 'Mousepad Logitech',
//         category: 'Accessories',
//         uom: 'Pcs',
//         qty: '5',
//         img1: 'https://drivegoogle/image acc_001-2022.Jpeg',
//         img2: 'https://drivegoogle/image acc_002-2022.Jpeg',
//         img3: 'https://drivegoogle/image acc_003-2022.Jpeg',
//         is_active: 'Yes'
//     }
// ];

const ProductPrizes = () => {
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
    const [openRemove, setOpenRemove] = React.useState(false);
    const [openFilter, setOpenFilter] = React.useState(false);
    const [categoryValue, setCategoryValue] = React.useState('1');
    const [query, setQuery] = React.useState('');
    const [row, setRow] = React.useState('0');
    const [filteredData, setFilteredData] = React.useState<any>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [checked, setIsChecked] = React.useState(false);
    const [checkedObj, setCheckedObj] = React.useState<string[]>([]);
    const checkBoxKeys: string[] = [];
    const [removeData, setRemoveData] = React.useState<any>([]);
    const [categoryList, setCategoryList] = React.useState<any>([]);
    const [filteredShow, setFilteredShow] = React.useState<any>({});
    const [value, setValue] = React.useState('all');
    const [checkedSwitch, setCheckedSwitch] = React.useState(true);
    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const router = useRouter();
    const form = useForm({
        mode: 'all',
        defaultValues: {
            action: false,
            code: '',
            name: '',
            category: '',
            uom: '',
            qty: '',
            image_url_1: '',
            image_url_2: '',
            image_url_3: '',
            is_active: false,
            checkedAll: false
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryValue(event.target.value);
    };
    const handleDialog = (x: boolean) => {
        setOpenFilter(x);
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
    const handleCheckBoxAll = (e: any) => {
        const temp: any[] = [];
        form.setValue('checkedAll', e.target.checked);
        if (e.target.checked) {
            filteredData.forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, e.target.checked);
                temp.push(item);
            });
            setRemoveData(temp);
            setCheckedObj(checkBoxKeys);
        } else if (!e.target.checked) {
            setCheckedObj([]);
            setRemoveData([]);
            filteredData.forEach((item: any, idx: number) => {
                const datas: any = `checkbox${idx + 1}`;
                form.setValue(datas, false);
            });
        }
    };

    const handleViewRow = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    const checkTrue: string[] = [];
    const handleSingleCheckBox = (e: any, name: any, id: number) => {
        form.setValue(name, e.target.checked);
        const checkBox: any = { ...form.watch() };
        checkBoxKeys.forEach((item: any) => {
            if (checkBox[item] === true) {
                checkTrue.push(item);
            }
        });
        if (checkTrue.length === filteredData.length) {
            form.setValue('checkedAll', true);
        } else {
            form.setValue('checkedAll', false);
        }
        setCheckedObj(checkTrue);

        if (e.target.checked) {
            const found = filteredData.find((element: any) => {
                return element.id === id;
            });
            setRemoveData([...removeData, found]);
        }

        if (!e.target.checked) {
            if (removeData.length > 0) {
                const filter = removeData.filter((item: any) => {
                    return id !== item;
                });
                setRemoveData(filter);
            } else {
                setRemoveData([]);
            }
        }
    };

    // const handleRemoveData = () => {
    //     const res = filteredData.filter((item: any) => !removeData.includes(item));
    //     setCheckedObj([]);
    //     setFilteredData(res);
    //     setRemoveData([]);
    //     setOpenRemove(false);
    //     setRow(res.length);
    //     form.setValue('checkedAll', false);
    //     filteredData.forEach((item: any, idx: number) => {
    //         const datas: any = `checkbox${idx + 1}`;
    //         form.setValue(datas, false);
    //     });
    // };
    const handleEditData = () => {
        router.push(`/settings/product-prizes/${removeData[0].id}/`);
    };
    const handleRemoveData = async () => {
        // setOpenDialogConfirm(false);
        // setTotalChecked(0);
        try {
            const response = await fetchAPI({
                endpoint: `/product-prizes/${router.query.id}`,
                method: 'DELETE'
            });
            if (response.status === 200) {
                notify(response.data.message, 'success');
                const res = filteredData.filter((item: any) => !removeData.includes(item));
                setRemoveData([]);
                setCheckedObj([]);
                setRow(res.length);
                form.setValue('checkedAll', false);
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }

        setOpenRemove(false);
    };

    const handleDataSearch = (keyword: any) => {
        setQuery(keyword);
    };
    const handleFetchData = async () => {
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: '/product-prizes'
            });
            if (response?.status === 200) {
                const products = response.data?.data;
                setFilteredData(products);
                setRow(products.length.toString());
                notify(response?.data.message, 'success');
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
    };
    React.useEffect(() => {
        handleFetchData();
        // setFilteredData(dummyData);
    }, []);
    React.useEffect(() => {
        setPages(Math.round(filteredData.length / Number(row)));
    }, [pages, row]);

    React.useEffect(() => {
        // console.log(filteredData.length);
        [...Array(filteredData.length)].forEach((item: any, idx: number) => {
            checkBoxKeys.push(`checkbox${idx + 1}`);
        });
        if (checkedObj.length > 0 || form.watch('checkedAll')) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [checkBoxKeys, form.watch('checkedAll')]);
    const resetButton = () => {
        setCategoryValue('1');
        setFilteredShow({});
        (document.getElementById('range') as HTMLInputElement).value = '';
    };
    React.useEffect(() => {
        const cat = filteredData.map((i: any) => i.category);

        const catDone = filteredData.filter(({ category }: any, index: number) => !cat.includes(category, index + 1));
        setCategoryList(catDone);
    }, [filteredData]);
    const handleSubmit = () => {
        const qty = (document.getElementById('range') as HTMLInputElement).value;
        const choosedCat = categoryList[parseInt(categoryValue, 10) - 1].category;
        setFilteredShow({ qty, choosedCat, value });
        setOpenFilter(false);
    };
    React.useEffect(() => {
        // eslint-disable-next-line array-callback-return, consistent-return
        const update = filteredData.filter((item: any) => {
            if (item.category === filteredShow.choosedCat && item.is_active === checkedSwitch) {
                return item;
            }
            // jika sudah ada data qty
            // if (item.qty === filteredShow.qty && item.category === filteredShow.choosedCat && item.is_active === checkedSwitch) {
            //     return item;
            // }
        });
        setFilteredData(update);
    }, [filteredShow]);
    return (
        <Box component='section'>
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
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <RadioGroup
                                value={value}
                                onChange={handleChangeRadio}
                                row
                                aria-labelledby='demo-row-radio-buttons-group-label'
                                name='row-radio-buttons-group'
                            >
                                <FormControlLabel
                                    sx={{ mr: 1 }}
                                    value='all'
                                    control={
                                        <Radio
                                            id='all'
                                            name='type'
                                            value='all'
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
                                            name='type'
                                            value='latest'
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
                                            name='type'
                                            value='oldest'
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
                            <InputLabel htmlFor='outlined-adornment-search'>Range Qty</InputLabel>
                            <OutlinedInput
                                id='range'
                                required
                                startAdornment={<InputAdornment position='start' />}
                                label='Range Qty'
                                placeholder='Fill Amount'
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id='outlined-select-currency'
                                select
                                label='Product Category'
                                value={categoryValue}
                                onChange={handleChange}
                            >
                                {categoryList.map((option: any, index: number) => (
                                    <MenuItem key={index + 1} value={index + 1}>
                                        {option.category}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                            <Typography sx={{ color: 'rgba(0, 0, 0, 0.6);', fontWeight: 500, fontSize: '16px' }}>Is Active</Typography>
                            <PurpleSwitch
                                checked={checkedSwitch}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckedSwitch(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, mb: 3, mt: 2 }}>
                            <ButtonBase
                                type='submit'
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
                                onClick={resetButton}
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
                    </form>
                </DialogContent>
            </Dialog>
            <TitleCard
                handleSearch={(keyword: any) => handleDataSearch(keyword)}
                onConfirm={(x: boolean) => handleDialog(x)}
                title='Product Prizes'
                subtitle='Addtional description if required'
                isSearchExist
                placeholderSeacrhText='Search by name, category, etc'
                href='/add-prize'
            />
            {checked && (
                <Box sx={{ mx: 1, my: 3, padding: 2, background: '#F4F1FF' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'black', fontWeight: 500, fontSize: '14px' }}>
                            {checkedObj.length} items selected
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            {checkedObj.length === 1 && (
                                <ButtonBase sx={{ color: '#A54CE5', m: 1 }} onClick={handleEditData}>
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
                <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
                    <Table sx={{ width: '100%' }}>
                        <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                            <TableRow>
                                <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>No.</TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='center'
                                >
                                    Product Code
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='center'
                                >
                                    Product Name
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='center'
                                >
                                    Product Category
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    UOM
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Qty
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Image 1
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Image 2
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Image 3
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Expired Date
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
                            {getPaginatedData().length > 0 &&
                                getPaginatedData()
                                    // eslint-disable-next-line consistent-return, array-callback-return
                                    .filter((post: any) => {
                                        // if (post.category === filteredShow.choosedCat) {
                                        //     console.log('msk');
                                        //     return post;
                                        // }
                                        if (query === '') {
                                            return post;
                                        }

                                        if (
                                            post.id.toString().toLowerCase().includes(query.toLowerCase()) ||
                                            post.code.toLowerCase().includes(query.toLowerCase()) ||
                                            post.name.toLowerCase().includes(query.toLowerCase()) ||
                                            post.category.toLowerCase().includes(query.toLowerCase()) ||
                                            post.uom.toLowerCase().includes(query.toLowerCase())
                                        ) {
                                            return post;
                                        }
                                    })
                                    .map((item: any, idx: number) => {
                                        const check: any = `checkbox${idx + 1}`;
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell align='center' sx={{ width: '5%' }}>
                                                    {item.id}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.code}
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
                                                    {item.category}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.uom}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.qty}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.image_url_1}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.image_url_2}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.image_url_3}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    {item.expired_at}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                    align='center'
                                                >
                                                    <Box sx={{ color: 'white' }}>
                                                        <Box
                                                            sx={
                                                                item.is_active === true
                                                                    ? { backgroundColor: '#A54CE5', borderRadius: '64px' }
                                                                    : { backgroundColor: '#D32F2F', borderRadius: '64px' }
                                                            }
                                                        >
                                                            {item.is_active.toString()}
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                                    <CheckboxController
                                                        form={form}
                                                        name={`checkbox${item.id}`}
                                                        checked={!!form.watch(check)}
                                                        onChange={(e: any) => handleSingleCheckBox(e, `checkbox${idx + 1}`, item.id)}
                                                    />
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
                            defaultValue={filteredData.length.toString()}
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
                        1-{row} of {filteredData.length}
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
    );
};

export default ProductPrizes;
