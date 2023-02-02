/* eslint-disable no-unused-vars */
import React from 'react';
import { Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import numberFormat from 'helpers/numberFormat';
import { Controller, useFieldArray } from 'react-hook-form';

interface TableAddTournamentProps {
    valueTable: any;
    data: any;
    formTable: any;
    fieldArray: any;
    table: any;
    setTable: any;
}

const TableAddTournament: React.FC<TableAddTournamentProps> = ({ setTable, table, valueTable, data, formTable, fieldArray }) => {
    const [dataTable, setDataTable] = React.useState<any>([]);
    const [isChange, setIsChange] = React.useState(false);

    // React.useEffect(() => {
    //     if (data) {
    //         setDataTable(data[0].data);
    //     }
    // }, [data]);

    // React.useEffect(() => {
    // formTable.setValue('tableData', [{ max_pos: '', pointPrizes: '', coinPrizes: '' }]);
    // }, []);

    React.useEffect(() => {
        if (valueTable !== '0') {
            const temp = [...data];
            const filterData = temp.filter((item: any) => {
                return item.id === valueTable;
            });
            setTable(filterData[0]?.prize_infos);
            table?.forEach((item: any, idx: number) => {
                formTable.setValue(`tableData[${idx + 1}].max_pos`, item.max_pos);
                formTable.setValue(`tableData[${idx + 1}].pointPrizes`, item.point);
                formTable.setValue(`tableData[${idx + 1}].coinPrizes`, item.coin);
            });
        }
    }, [valueTable]);

    return (
        <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
            <Table sx={{ width: '100%' }} aria-label='simple table'>
                <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                    <TableRow>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Position</TableCell>
                        {/* <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Position End</TableCell>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Count Player</TableCell> */}
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Point Prizes</TableCell>
                        {/* <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Point Prizes / Player</TableCell> */}
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Coin Prizes</TableCell>
                        {/* <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Coint Prizes / Player</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: 'white' }}>
                    {fieldArray.fields?.map((item: any, index: number) => {
                        return (
                            <TableRow key={index + 1}>
                                <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>
                                    {/* <Controller
                                            control={formTable.control}
                                            name={`tableData[${index}].positionStart`}
                                            render={({ field: { onChange, value } }) => (
                                                <Input onChange={onChange} defaultValue={value} disableUnderline type='text' />
                                            )}
                                        /> */}

                                    <Input
                                        onChange={(e: any) => formTable.setValue(`tableData[${index}].max_pos`, e.target.value)}
                                        disableUnderline
                                        type='number'
                                        defaultValue={formTable.watch(`tableData[${index}].max_pos`)}
                                        {...formTable.register(`tableData[${index}].max_pos`)}
                                    />
                                </TableCell>
                                {/* <TableCell
                                    sx={{
                                        width: '5%',
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0'
                                    }}
                                >
                                    <Input
                                        onChange={(e: any) => formTable.setValue(`tableData[${index}].positionEnd`, e.target.value)}
                                        disableUnderline
                                        type='number'
                                        defaultValue={formTable.watch(`tableData[${index}].positionEnd`)}
                                        {...formTable.register(`tableData[${index}].positionEnd`)}
                                    />
                                </TableCell> */}
                                {/* <TableCell
                                    sx={{
                                        width: '5%',
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0'
                                    }}
                                >
                                    <Input
                                        onChange={(e: any) => formTable.setValue(`tableData[${index}].countPlayer`, e.target.value)}
                                        disableUnderline
                                        type='number'
                                        defaultValue={formTable.watch(`tableData[${index}].countPlayer`)}
                                        {...formTable.register(`tableData[${index}].countPlayer`)}
                                    />
                                </TableCell> */}
                                <TableCell
                                    sx={{
                                        width: '5%',
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0'
                                    }}
                                >
                                    {/* <Controller
                                            control={formTable.control}
                                            name={`tableData[${index}].pointPrizes`}
                                            render={({ field: { onChange, value } }) => (
                                                <Input onChange={onChange} value={value} disableUnderline type='text' />
                                            )}
                                        /> */}

                                    <Input
                                        onChange={(e: any) => formTable.setValue(`tableData[${index}].pointPrizes`, e.target.value)}
                                        disableUnderline
                                        type='number'
                                        defaultValue={formTable.watch(`tableData[${index}].point`)}
                                        {...formTable.register(`tableData[${index}].point`)}
                                    />
                                </TableCell>
                                {/* <TableCell
                                    sx={{
                                        width: '5%',
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0'
                                    }}
                                >
                                    <Input
                                        onChange={(e: any) => formTable.setValue(`tableData[${index}].playerPointPrizes`, e.target.value)}
                                        disableUnderline
                                        type='number'
                                        defaultValue={formTable.watch(`tableData[${index}].playerPointPrizes`)}
                                        {...formTable.register(`tableData[${index}].playerPointPrizes`)}
                                    />
                                </TableCell> */}
                                <TableCell
                                    sx={{
                                        width: '5%',
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0'
                                    }}
                                >
                                    <Input
                                        onChange={(e: any) => formTable.setValue(`tableData[${index}].coin`, e.target.value)}
                                        disableUnderline
                                        type='number'
                                        defaultValue={formTable.watch(`tableData[${index}].coin`)}
                                        {...formTable.register(`tableData[${index}].coin`)}
                                    />
                                </TableCell>
                                {/* <TableCell
                                    sx={{
                                        width: '5%',
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0'
                                    }}
                                >
                                    <Input
                                        onChange={(e: any) => formTable.setValue(`tableData[${index}].playerCointPrizes`, e.target.value)}
                                        disableUnderline
                                        type='number'
                                        defaultValue={formTable.watch(`tableData[${index}].playerCointPrizes`)}
                                        {...formTable.register(`tableData[${index}].playerCointPrizes`)}
                                    />
                                </TableCell> */}
                                {/* <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>{item.playerPointPrizes}</TableCell> */}
                            </TableRow>
                        );
                    })}
                    {table?.map((item: any, index: number) => {
                        return (
                            <TableRow key={index + 1}>
                                <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>
                                    <Typography>{item.max_pos}</Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '5%',
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0'
                                    }}
                                >
                                    <Typography>{item.point}</Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '5%',
                                        fontWeight: 'bold',
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0'
                                    }}
                                >
                                    <Typography> {item.coin}</Typography>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableAddTournament;
