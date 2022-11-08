import {
    Box,
    ButtonBase,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import BadgeCard from 'components/BadgeCard';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface TableRolesProps {
    form: any;
    name: string;
    nameIdxAppears: string;
}

const TableRoles: React.FC<TableRolesProps> = ({ form, name, nameIdxAppears }) => {
    const [dataTable, setDataTable] = React.useState<Array<any>>(form.watch(name));
    const [isAllChecked, setIsAllChecked] = React.useState<boolean>(false);
    const [showMore, setShowMore] = React.useState<any>({ isOpen: false, id: null });

    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        let resArr: any = [];
        if (isChecked) {
            dataTable.forEach((item: any) => {
                const resObj = { ...item, isAction: true };
                resArr = [...resArr, resObj];
            });
            setIsAllChecked(true);
        } else {
            dataTable.forEach((item: any) => {
                const resObj = { ...item, isAction: false };
                resArr = [...resArr, resObj];
            });
            setIsAllChecked(false);
        }
        setDataTable([...resArr]);
        form.setValue(name, [...resArr]);
    };

    const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
        const isChecked = e.target.checked;

        let newArr: any = [...dataTable];
        dataTable.forEach((item: any, index: number) => {
            if (item.id === data.id) {
                const filter = newArr.filter((itm: any) => itm.id !== data.id);
                if (isChecked) {
                    newArr = [...filter, { ...data, isAction: true }];
                } else {
                    newArr = [...filter, { ...data, isAction: false }];
                    setIsAllChecked(false);
                }
            }

            if (index === dataTable.length - 1) {
                newArr.sort((a: any, b: any) => a.id - b.id);
                setDataTable([...newArr]);
                form.setValue(name, [...newArr]);
            }
        });
    };

    const handleMore = (id: any) => {
        setShowMore({ isOpen: !showMore.isOpen, id });
    };

    return (
        <TableContainer>
            <Table aria-label='table roles'>
                <TableHead>
                    <TableRow sx={{ bgcolor: '#F0F0F0', borderTop: '1px solid rgba(0,0,0,0.2)' }}>
                        <TableCell
                            align='center'
                            sx={{
                                fontWeight: 600,
                                fontSize: '16px',
                                borderRight: '1px solid rgba(0,0,0,0.2)',
                                borderLeft: '1px solid rgba(0,0,0,0.2)',
                                width: '5%'
                            }}
                        >
                            No.
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '28%' }}>
                            Role Code
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '28%' }}>
                            Role Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '19%' }}>
                            Description
                        </TableCell>
                        <TableCell
                            align='center'
                            sx={{ fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '6%' }}
                        >
                            Is Active
                        </TableCell>
                        <TableCell
                            align='center'
                            sx={{ fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '6%' }}
                        >
                            <FormControl sx={{ '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' } }}>
                                <FormControlLabel
                                    control={<Checkbox checked={!!isAllChecked} onChange={(e) => handleCheckAll(e)} />}
                                    label='Action'
                                    sx={{ '& .MuiTypography-root': { fontWeight: 600 } }}
                                />
                            </FormControl>
                        </TableCell>
                        <TableCell
                            align='center'
                            sx={{ fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '8%' }}
                        >
                            More
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataTable.map((item: any, index: number) => {
                        const idxAppears = form.watch(nameIdxAppears);
                        return (
                            index >= idxAppears.startIndex &&
                            index <= idxAppears.endIndex && (
                                <TableRow key={item.id}>
                                    <TableCell
                                        align='center'
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            borderRight: '1px solid rgba(0,0,0,0.2)',
                                            borderLeft: '1px solid rgba(0,0,0,0.2)',
                                            width: '5%'
                                        }}
                                    >
                                        {index + 1}
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '28%' }}
                                    >
                                        {item.roleCode}
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '28%' }}
                                    >
                                        {item.roleName}
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '19%' }}
                                    >
                                        {item.description}
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '6%' }}
                                    >
                                        {item.isActive ? (
                                            <BadgeCard bgcolor='#A54CE5' text='Yes' />
                                        ) : (
                                            <BadgeCard bgcolor='#D32F2F' text='No' />
                                        )}
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '6%' }}
                                    >
                                        <FormControl
                                            sx={{
                                                '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' }
                                            }}
                                        >
                                            <Checkbox checked={!!item.isAction} onChange={(e) => handleCheck(e, item)} />
                                            {/* <Checkbox /> */}
                                        </FormControl>
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            position: 'relative',
                                            borderRight: '1px solid rgba(0,0,0,0.2)',
                                            width: '8%'
                                        }}
                                    >
                                        <IconButton onClick={() => handleMore(item.id)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        {showMore.isOpen && showMore.id === item.id && (
                                            <Box
                                                padding='9px 10px'
                                                bgcolor='#fff'
                                                position='absolute'
                                                zIndex={2}
                                                left='-120px'
                                                top='16px'
                                                borderRadius='4px'
                                                boxShadow='0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)'
                                            >
                                                <ButtonBase
                                                    sx={{ padding: '6px 14px', borderRadius: '4px', bgcolor: '#A54CE5', color: '#fff' }}
                                                >
                                                    MENU ACCESS
                                                </ButtonBase>
                                            </Box>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableRoles;
