/* eslint-disable no-unused-vars */
import React from 'react';
import { Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import numberFormat from 'helpers/numberFormat';
import { Controller, useFieldArray } from 'react-hook-form';

interface TableAddTournamentProps {
    valueTable: any;
    data: any;
    formTable: any;
    fieldArray: any;
}

const TableAddTournament: React.FC<TableAddTournamentProps> = ({ valueTable, data, formTable, fieldArray }) => {
    const [dataTable, setDataTable] = React.useState<any>(null);
    const [isChange, setIsChange] = React.useState(false);
    React.useEffect(() => {
        if (data) {
            setDataTable(data[0].data);
        }
    }, [data]);

    React.useEffect(() => {
        if (valueTable === 1 || valueTable === 2 || valueTable === 3) {
            const filterData = data.filter((item: any) => {
                return item.id === valueTable;
            });
            setDataTable(filterData[0]?.data);
        }
    }, [valueTable, dataTable]);

    return (
        <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
            <Table sx={{ width: '100%' }} aria-label='simple table'>
                <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                    <TableRow>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Position Start</TableCell>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Position End</TableCell>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Count Player</TableCell>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Point Prizes</TableCell>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Point Prizes / Player</TableCell>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Coint Prizes</TableCell>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>Coint Prizes / Player</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: 'white' }}>
                    {fieldArray.fields?.length > 0 &&
                        fieldArray.fields?.map((item: any, index: number) => {
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
                                            onChange={(e: any) => formTable.setValue(`tableData[${index}].positionStart`, e.target.value)}
                                            disableUnderline
                                            type='number'
                                            defaultValue={formTable.watch(`tableData[${index}].positionStart`)}
                                            {...formTable.register(`tableData[${index}].positionStart`)}
                                        />
                                    </TableCell>
                                    <TableCell
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
                                    </TableCell>
                                    <TableCell
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
                                    </TableCell>
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
                                            defaultValue={formTable.watch(`tableData[${index}].pointPrizes`)}
                                            {...formTable.register(`tableData[${index}].pointPrizes`)}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        <Input
                                            onChange={(e: any) =>
                                                formTable.setValue(`tableData[${index}].playerPointPrizes`, e.target.value)
                                            }
                                            disableUnderline
                                            type='number'
                                            defaultValue={formTable.watch(`tableData[${index}].playerPointPrizes`)}
                                            {...formTable.register(`tableData[${index}].playerPointPrizes`)}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        <Input
                                            onChange={(e: any) => formTable.setValue(`tableData[${index}].cointPrizes`, e.target.value)}
                                            disableUnderline
                                            type='number'
                                            defaultValue={formTable.watch(`tableData[${index}].cointPrizes`)}
                                            {...formTable.register(`tableData[${index}].cointPrizes`)}
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        <Input
                                            onChange={(e: any) =>
                                                formTable.setValue(`tableData[${index}].playerCointPrizes`, e.target.value)
                                            }
                                            disableUnderline
                                            type='number'
                                            defaultValue={formTable.watch(`tableData[${index}].playerCointPrizes`)}
                                            {...formTable.register(`tableData[${index}].playerCointPrizes`)}
                                        />
                                    </TableCell>
                                    {/* <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>{item.playerPointPrizes}</TableCell> */}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableAddTournament;
