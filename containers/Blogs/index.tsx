/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Paper, ButtonBase, FormControl, MenuItem } from '@mui/material';
import InputSearch from 'components/Input/InputSearch';
import { useForm } from 'react-hook-form';
import { FilterList, Delete, ArrowBackIos, ArrowForwardIos, Edit } from '@mui/icons-material';
import CustomButton from 'components/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getCurrentDate } from 'utils/date';
import DeleteAccDialog from 'containers/Account/DeleteAccDialog';
import CreateBlogs from './CreateBlogs';
import BlogsTable from './BlogsTable';
import FilterDrop from './FilterDrop';
import { dummy } from './dummy';

const BlogsContainer = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            isActive: false,
            name: '',
            email: '',
            role: '0',
            acc: 'OWIKUN',
            activeRole: true,
            checkAll: false,
            startDate: new Date().toISOString().slice(0, 10) || '',
            endDate: new Date().toISOString().slice(0, 10) || '',
            maxDate: getCurrentDate(),
            image: ''
        }
    });

    const [openFilter, setOpenFilter] = React.useState(false);
    const [createBlogs, setCreateBlogs] = React.useState(false);
    const [role, setRole] = React.useState('0');
    const [selectedValue, setSelectedValue] = React.useState('all');
    const [checked, setIsChecked] = React.useState(false);
    const [checkedObj, setCheckedObj] = React.useState<string[]>([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [remove, setRemove] = React.useState<any>([]);
    const [row, setRow] = React.useState(dummy.length);
    const [deleted, setDeleted] = React.useState<number[]>([]);
    const [pages, setPages] = React.useState(1);
    const [onDelete, setOnDelete] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editData, setEditData] = React.useState(null);
    const checkBoxKeys: string[] = [];
    const checkTrue: string[] = [];

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        return remove.slice(startIndex, endIndex);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    const handleFiter = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
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

    const handleChangeCheckbox = (e: any, name: any, id: number, data: any) => {
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
        setEditData(data);
    };

    React.useEffect(() => {
        setRemove(dummy);
    }, []);

    React.useEffect(() => {
        setPages(Math.ceil(remove.length / Number(row)));
    }, [pages, row]);

    React.useEffect(() => {
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
        if (input.startDate) {
            form.setValue('maxDate', input.startDate);
        }
        if (input.endDate) {
            form.setValue('maxDate', input.endDate);
        }
    }, [form.watch('startDate'), form.watch('endDate')]);

    console.log(isEditing);

    return (
        <Box sx={{ width: '100%' }}>
            {createBlogs ? (
                <CreateBlogs
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setCreateBlog={setCreateBlogs}
                    createBlog={createBlogs}
                    form={form}
                    datas={editData}
                />
            ) : (
                <Box sx={{ padding: '35px 25px' }}>
                    <Paper sx={{ width: '100%', height: '170px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                        <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Blogs</Typography>
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
                                <InputSearch placeholder='Search by posted,date, etc.' name='search' label='Search' form={form} />
                                <FilterList
                                    onClick={() => {
                                        setOpenFilter(!openFilter);
                                    }}
                                    sx={{ cursor: 'pointer' }}
                                />
                            </Box>
                            <CustomButton
                                onClick={() => {
                                    setCreateBlogs(!createBlogs);
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
                            <FilterDrop
                                selectedValue={selectedValue}
                                form={form}
                                setOpenFilter={setOpenFilter}
                                openFilter={openFilter}
                                handleChangeRadio={handleChangeRadio}
                                role={role}
                                handleFiter={handleFiter}
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
                            <Box sx={{ width: '13%', display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '20px' }}>
                                {checkedObj.length === 1 && !form.watch('checkAll') && (
                                    <ButtonBase
                                        onClick={() => {
                                            setCreateBlogs(!createBlogs);
                                            setIsEditing(true);
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
                        <BlogsTable
                            data={getPaginatedData()}
                            form={form}
                            handleChangeCheckboxAll={handleChangeCheckboxAll}
                            remove={remove}
                            handleChangeChekcbox={handleChangeCheckbox}
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
                titleDialog='Are you sure remove this blog?'
            />
        </Box>
    );
};

export default BlogsContainer;
