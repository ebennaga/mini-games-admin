import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel } from '@mui/material';
import CheckboxController from 'components/Checkbox';
import dateFormat from 'helpers/dateFormat';
import numberFormat from 'helpers/numberFormat';

interface TournamentTableProps {
    data: any;
    form: any;
    handleChangeCheckboxAll: any;
    remove: any;
    handleChangeChekcbox: any;
}

const TornamentTable: React.FC<TournamentTableProps> = ({ data, form, handleChangeCheckboxAll, remove, handleChangeChekcbox }) => {
    return (
        <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
            <Table sx={{ width: '100%' }} aria-label='simple table'>
                <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                    <TableRow>
                        <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>No.</TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Title
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Start
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            End
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Games
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Registration Fee
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Total Prizes
                        </TableCell>
                        <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                            <FormControlLabel
                                control={
                                    <CheckboxController
                                        name='action'
                                        form={form}
                                        onChange={handleChangeCheckboxAll}
                                        checked={form.watch('checkAll')}
                                        disabled={remove.length === 0}
                                    />
                                }
                                label='Action'
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 &&
                        data.map((item: any) => {
                            const check: any = `checkbox${item.id}`;
                            return (
                                <TableRow key={item.id}>
                                    <TableCell sx={{ width: '5%' }}>{item.id}</TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.title}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {dateFormat(item.start)}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {dateFormat(item.end)}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.games}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.registration} Coins
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {numberFormat(item.totalPrizes)}
                                    </TableCell>
                                    <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                        <CheckboxController
                                            form={form}
                                            name={`checkbox${item.id}`}
                                            checked={!!form.watch(check)}
                                            onChange={(e: any) => handleChangeChekcbox(e, `checkbox${item.id}`, item.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TornamentTable;
