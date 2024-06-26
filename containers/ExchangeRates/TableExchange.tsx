import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import BadgeCard from 'components/BadgeCard';
import React from 'react';

interface TableExchangeProps {
    name: string;
    form: any;
    nameIdxAppears: string;
}

const TableExchange: React.FC<TableExchangeProps> = ({ name, form, nameIdxAppears }) => {
    const [dataTable, setDataTable] = React.useState<Array<any>>([...form.watch(name)]);
    const [isAllChecked, setIsAllChecked] = React.useState<boolean>(false);

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
            if (item.coin === data.coin) {
                const filter = newArr.filter((itm: any) => itm.coin !== data.coin);
                if (isChecked) {
                    newArr = [...filter, { ...data, isAction: true }];
                } else {
                    newArr = [...filter, { ...data, isAction: false }];
                    setIsAllChecked(false);
                }
            }

            if (index === dataTable.length - 1) {
                newArr.sort((a: any, b: any) => a.coin - b.coin);
                setDataTable([...newArr]);
                form.setValue(name, [...newArr]);
            }
        });
    };

    React.useEffect(() => {
        setDataTable(form.watch(name));
    }, [form.watch(name)]);

    return (
        <TableContainer>
            <Table aria-label='table participant'>
                <TableHead>
                    <TableRow sx={{ borderTop: '1px solid rgba(0,0,0,0.2)', bgcolor: '#F0F0F0' }}>
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
                            No.
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '10%' }}>
                            Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '23%' }}>
                            Coins
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '23%' }}>
                            Bonus Coins
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '33%' }}>
                            IDR
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '6%' }}>
                            Is Active
                        </TableCell>
                        <TableCell
                            align='center'
                            sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '10%' }}
                        >
                            <FormControl sx={{ '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' } }}>
                                <FormControlLabel
                                    control={<Checkbox checked={!!isAllChecked} onChange={(e) => handleCheckAll(e)} />}
                                    label='Action'
                                />
                            </FormControl>
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
                                        <Typography component='span'>{index + 1}.</Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '23%' }}
                                    >
                                        <Typography component='span'>{item?.name}</Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '23%' }}
                                    >
                                        <Typography component='span'>{item?.coin}</Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '23%' }}
                                    >
                                        <Typography component='span'>{item?.bonus}</Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '33%' }}
                                    >
                                        <Typography component='span'>
                                            Rp. {new Intl.NumberFormat('id-id').format(item?.price)},00
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '6%' }}
                                    >
                                        <Typography component='span'>{item?.is_active}</Typography>
                                        <BadgeCard
                                            bgcolor={item?.is_active ? '#A54CE5' : '#D32F2F'}
                                            text={item?.is_active ? 'yes' : 'no'}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '10%' }}
                                    >
                                        <FormControl
                                            sx={{
                                                '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' }
                                            }}
                                        >
                                            <Checkbox checked={!!item.isAction} onChange={(e) => handleCheck(e, item)} />
                                        </FormControl>
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

export default TableExchange;
