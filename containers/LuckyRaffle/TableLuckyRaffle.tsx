/* eslint-disable no-unused-vars */
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

interface TableLuckyRaffleProps {
    form: any;
    name: string;
    nameIdxAppears: string;
}

const TableLuckyRaffle: React.FC<TableLuckyRaffleProps> = ({ form, name, nameIdxAppears }) => {
    const [isAllChecked, setIsAllChecked] = React.useState<boolean>(false);
    const [dataTable, setDataTable] = React.useState<Array<any>>(form.watch(name));
    const [indexMore, setIndexMore] = React.useState<number>(0);

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

    // Update data table if form is changed
    React.useEffect(() => {
        setDataTable(form.watch(name));
    }, [form.watch(name)]);

    const handleMore = (id: number) => {
        if (id !== indexMore) {
            setIndexMore(id);
        } else {
            setIndexMore(0);
        }
    };

    return (
        <TableContainer sx={{ overflow: 'unset' }}>
            <Table aria-label='table player account'>
                <TableHead>
                    <TableRow
                        sx={{
                            bgcolor: '#F0F0F0',
                            borderTop: '1px solid rgba(0,0,0,0.2)',
                            '& .MuiTableCell-root': { fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }
                        }}
                    >
                        <TableCell sx={{ borderLeft: '1px solid rgba(0,0,0,0.2)', width: '4%' }}>No.</TableCell>
                        <TableCell sx={{ width: '35%' }}>Raffle Name</TableCell>
                        <TableCell sx={{ width: '28%' }}>Total Pool</TableCell>
                        <TableCell sx={{ width: '14%' }}>Ticket Price / Point</TableCell>
                        <TableCell sx={{ width: '7%' }}>Is Active</TableCell>
                        {/* <TableCell sx={{ width: '8%' }}>Action</TableCell> */}
                        <TableCell
                            align='center'
                            sx={{ fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '7%' }}
                        >
                            <FormControl sx={{ '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' } }}>
                                <FormControlLabel
                                    control={<Checkbox checked={!!isAllChecked} onChange={(e) => handleCheckAll(e)} />}
                                    label='Action'
                                    sx={{ '& .MuiTypography-root': { fontWeight: 600 } }}
                                />
                            </FormControl>
                        </TableCell>
                        <TableCell sx={{ width: '5%' }}>More</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {dataTable.map((item: any, index: number) => {
                        const idxAppears = form.watch(nameIdxAppears);
                        return (
                            index >= idxAppears.startIndex &&
                            index <= idxAppears.endIndex && (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '& .MuiTableCell-root': {
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            borderRight: '1px solid rgba(0,0,0,0.2)'
                                        }
                                    }}
                                >
                                    <TableCell sx={{ borderLeft: '1px solid rgba(0,0,0,0.2)', width: '4%' }}>{index + 1}</TableCell>
                                    <TableCell sx={{ width: '6%' }}>{item.name}</TableCell>
                                    <TableCell sx={{ width: '15%' }}>{item.totalPool}</TableCell>
                                    <TableCell sx={{ width: '15%' }}>{item.ticket}</TableCell>
                                    <TableCell sx={{ width: '7%' }}>
                                        {item.isActive ? (
                                            <BadgeCard bgcolor='#A54CE5' text='Open' />
                                        ) : (
                                            <BadgeCard bgcolor='#D32F2F' text='Close' />
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ width: '8%' }}>
                                        <FormControl
                                            sx={{
                                                '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' }
                                            }}
                                        >
                                            {/* <Checkbox /> */}
                                            <Checkbox checked={!!item.isAction} onChange={(e) => handleCheck(e, item)} />
                                        </FormControl>
                                    </TableCell>

                                    <TableCell sx={{ width: '13%' }}>
                                        <Box sx={{ position: 'relative' }}>
                                            <IconButton onClick={() => handleMore(item.id)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            {item?.id === indexMore && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        left: '-500%',
                                                        // top: '50%',
                                                        bottom: '-100%',
                                                        width: '188px',
                                                        height: 'fit-content',
                                                        borderRadius: '4px',
                                                        boxShadow:
                                                            '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '12px',
                                                        padding: '12px',
                                                        zIndex: '10',
                                                        background: '#fff'
                                                    }}
                                                >
                                                    <ButtonBase
                                                        sx={{
                                                            background: '#A54CE5',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#fff',
                                                            padding: '6px 14px',
                                                            borderRadius: '4px'
                                                        }}
                                                    >
                                                        SET PRIZES
                                                    </ButtonBase>
                                                    <ButtonBase
                                                        sx={{
                                                            background: '#A54CE5',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#fff',
                                                            padding: '6px 14px',
                                                            borderRadius: '4px'
                                                        }}
                                                    >
                                                        VIEW PARTICIPANT
                                                    </ButtonBase>
                                                    <ButtonBase
                                                        sx={{
                                                            background: '#A54CE5',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#fff',
                                                            padding: '6px 14px',
                                                            borderRadius: '4px'
                                                        }}
                                                    >
                                                        VIEW RESULT
                                                    </ButtonBase>
                                                </Box>
                                            )}
                                        </Box>
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

export default TableLuckyRaffle;
