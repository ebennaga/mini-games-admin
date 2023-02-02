import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, Typography } from '@mui/material';
import CheckboxController from 'components/Checkbox';
import dateFormat from 'helpers/dateFormat';
import numberFormat from 'helpers/numberFormat';
// import CustomButton from 'components/Button';

interface TournamentTableProps {
    data: any;
    form: any;
    handleChangeCheckboxAll: any;
    remove: any;
    handleChangeChekcbox: any;
    // setOpenDialogTour: any;
    // openDialogTour: any;
    // setLeaderboards: any;
    currentPage: any;
}

const TornamentTable: React.FC<TournamentTableProps> = ({
    // setOpenDialogTour,
    data,
    form,
    handleChangeCheckboxAll,
    remove,
    handleChangeChekcbox,
    // openDialogTour,
    // setLeaderboards,
    currentPage
}) => {
    return (
        <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
            <Table sx={{ width: '100%' }} aria-label='simple table'>
                <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                    <TableRow>
                        <TableCell align='center' sx={{ width: '5%', fontWeight: 'bold' }}>
                            No.
                        </TableCell>
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
                            Start Date
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Start Time
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            End Date
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            End Time
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
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='center'
                        >
                            Leaderboard
                        </TableCell>
                        <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                            <FormControlLabel
                                control={
                                    <CheckboxController
                                        name='action'
                                        form={form}
                                        onChange={handleChangeCheckboxAll}
                                        checked={form.watch('checkAll')}
                                        disabled={remove.length < 0}
                                    />
                                }
                                label='Action'
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 &&
                        data.map((item: any, idx: number) => {
                            const check: any = `checkbox${idx + 1}`;
                            const options: any = { hour: '2-digit', minute: '2-digit', hour12: false };
                            const startTime = new Date(item.start_time).toLocaleString(undefined, options);
                            const endTime = new Date(item.end_time).toLocaleString(undefined, options);
                            return (
                                <TableRow key={item.id}>
                                    <TableCell align='center' sx={{ width: '5%' }}>
                                        {currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10}.
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.name}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {dateFormat(new Date(item.start_time))}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {startTime}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {dateFormat(new Date(item.end_time))}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {endTime}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.game.name}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.entry_coin} Coins
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {numberFormat(item.total_points)}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='center'>
                                        <Typography
                                            // onClick={() => {
                                            //     setOpenDialogTour(!openDialogTour);
                                            //     setLeaderboards(item);
                                            // }}
                                            sx={{ color: '#A54CE5', textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer' }}
                                        >
                                            View Leaderboard
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                        <CheckboxController
                                            form={form}
                                            name={`checkbox${item.id}`}
                                            checked={!!form.watch(check)}
                                            onChange={(e: any) => handleChangeChekcbox(e, `checkbox${idx + 1}`, item.id)}
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
