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
                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '25%' }}>
                            Coins
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '15%' }}>
                            IDR
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '20%' }}>
                            Effective Date
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
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '25%' }}
                                    >
                                        <Typography component='span'>{item?.coin}</Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '15%' }}
                                    >
                                        <Typography component='span'>{item?.price}</Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '20%' }}
                                    >
                                        <Typography component='span'>{item?.effective_until_at}</Typography>
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
