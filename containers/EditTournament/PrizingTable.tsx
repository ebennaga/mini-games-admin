import { Box, ButtonBase, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { memo } from 'react';
import { Remove, Add } from '@mui/icons-material';

interface PrizingTableProps {
    valueTable: string;
    data: any[];
    table: any[];
    // eslint-disable-next-line no-unused-vars
    setTable: (arr: any[]) => void;
}

const PrizingTable: React.FC<PrizingTableProps> = ({ valueTable, data, table, setTable }) => {
    const [newData, setNewData] = React.useState<any>({
        max_pos: '',
        point: '',
        coin: ''
    });

    React.useEffect(() => {
        if (valueTable !== '0') {
            const temp = [...data];
            const filterData = temp.filter((item: any) => {
                return item.id === valueTable;
            });
            setTable(filterData[0]?.prize_infos);
        }
    }, [valueTable]);

    const handleChange = (index: number, key: 'max_pos' | 'point' | 'coin', value: string) => {
        const response = table.map((item: any, idx: number) => {
            if (index === idx) {
                const itm = item;
                itm[key] = Number(value);
                return itm;
            }
            return item;
        });
        setTable(response);
    };

    const handleSetData = (key: 'max_pos' | 'point' | 'coin', value: string) => {
        const result = newData;
        newData[key] = Number(value);
        setNewData(result);
    };

    const handleAddRow = () => {
        setTable([...table, newData]);
        setNewData({
            max_pos: '',
            point: '',
            coin: ''
        });
        ['maxPos', 'point', 'coin'].forEach((item: string) => {
            const input: any = document.getElementById(item);
            input.value = '';
        });
    };

    const handleDeleteRow = () => {
        const res = table.slice(0, -1);
        setTable(res);
    };

    return (
        <>
            <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
                <Table sx={{ width: '100%' }}>
                    <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Position</TableCell>
                            <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Point Prizes</TableCell>
                            <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Coin Prizes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.map((item: any, index: number) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell sx={{ width: '5%', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                                        <Input
                                            onChange={(e: any) => handleChange(index, 'max_pos', e.target.value)}
                                            defaultValue={item?.max_pos}
                                            disableUnderline
                                            type='number'
                                        />
                                    </TableCell>
                                    <TableCell sx={{ width: '5%', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                                        <Input
                                            onChange={(e: any) => handleChange(index, 'point', e.target.value)}
                                            defaultValue={item?.point}
                                            disableUnderline
                                            type='number'
                                        />
                                    </TableCell>
                                    <TableCell sx={{ width: '5%' }}>
                                        <Input
                                            onChange={(e: any) => handleChange(index, 'coin', e.target.value)}
                                            defaultValue={item?.coin}
                                            disableUnderline
                                            type='number'
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <TableCell sx={{ width: '5%', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                                <Input
                                    id='maxPos'
                                    onChange={(e: any) => handleSetData('max_pos', e.target.value)}
                                    placeholder='Input Value'
                                    disableUnderline
                                    type='number'
                                />
                            </TableCell>
                            <TableCell sx={{ width: '5%', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                                <Input
                                    id='point'
                                    onChange={(e: any) => handleSetData('point', e.target.value)}
                                    placeholder='Input Value'
                                    disableUnderline
                                    type='number'
                                />
                            </TableCell>
                            <TableCell sx={{ width: '5%' }}>
                                <Input
                                    id='coin'
                                    onChange={(e: any) => handleSetData('coin', e.target.value)}
                                    placeholder='Input Value'
                                    disableUnderline
                                    type='number'
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    mt: '20px',
                    display: 'flex',
                    float: 'right',
                    gap: '15px',
                    alignSelf: 'flex-end',
                    fontWeight: 700
                }}
            >
                <ButtonBase
                    onClick={handleAddRow}
                    sx={{
                        backgroundColor: '#A54CE5',
                        padding: '14px 19px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'white',
                        borderRadius: '5px',
                        gap: '10px'
                    }}
                >
                    <Add />
                    <Typography sx={{ fontWeight: 600 }}>ADD</Typography>
                </ButtonBase>
                <ButtonBase
                    onClick={handleDeleteRow}
                    sx={{
                        backgroundColor: 'white',
                        padding: '14px 19px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#A54CE5',
                        borderRadius: '5px',
                        border: '1px solid #A54CE5',
                        gap: '10px'
                    }}
                >
                    <Remove />
                    <Typography sx={{ fontWeight: 600 }}>DELETE</Typography>
                </ButtonBase>
            </Box>
        </>
    );
};

export default memo(PrizingTable);
