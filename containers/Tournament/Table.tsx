/* eslint-disable no-unused-vars */
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import numberFormat from 'helpers/numberFormat';

interface TableAddTournamentProps {
    value: any;
    data: any;
}

const TableAddTournament: React.FC<TableAddTournamentProps> = ({ value, data }) => {
    const [dataTable, setDataTable] = React.useState<any>(null);

    React.useEffect(() => {
        if (data) {
            setDataTable(data[0].data);
        }
    }, [data]);

    React.useEffect(() => {
        if (value === 1 || value === 2 || value === 3) {
            const filterData = data.filter((item: any) => {
                return item.id === value;
            });
            setDataTable(filterData[0]?.data);
        }
    }, [value, dataTable]);

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
                    {dataTable?.length > 0 &&
                        dataTable?.map((item: any) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>1</TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        {item.positionStart}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        {numberFormat(item.positionEnd)}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        {numberFormat(item.pointPrizes)}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        {numberFormat(item.playerPointPrizes)}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        {numberFormat(item.cointPrizes)}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            fontWeight: 'bold',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                    >
                                        {numberFormat(item.playerCointPrizes)}
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
