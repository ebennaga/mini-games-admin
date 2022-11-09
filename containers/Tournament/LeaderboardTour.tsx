/* eslint-disable no-unsafe-optional-chaining */
import { Close } from '@mui/icons-material';
import {
    Box,
    Dialog,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    SelectChangeEvent
} from '@mui/material';
import Pagination from 'components/PaginationCard/Pagination';
import numberFormat from 'helpers/numberFormat';
import React, { useState, useEffect } from 'react';

interface LeaderboardDialogProps {
    open: boolean;
    setOpenDialog: any;
    item: any;
}

const LeaderboardDialog: React.FC<LeaderboardDialogProps> = ({ open = true, setOpenDialog, item }) => {
    const data: any[] = item?.leaderboard;
    const [row, setRow] = useState('7');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(1);

    const getPaginatedData = () => {
        const startIndex = currentPage * Number(row) - Number(row);
        const endIndex = startIndex + Number(row);
        return data?.slice(startIndex, endIndex);
    };

    const goToNextPage = () => {
        if (currentPage !== pages) {
            setCurrentPage((page) => page + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((page) => page - 1);
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRow(event.target.value as string);
    };

    useEffect(() => {
        setPages(Math.ceil(data?.length / Number(row)));
    }, [pages, row]);
    return (
        <Dialog fullWidth open={open} onClose={setOpenDialog}>
            <Box sx={{ padding: '20px' }}>
                <Paper sx={{ width: '100%', height: '80px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>{item?.title}</Typography>
                        <Close
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                setOpenDialog(!open);
                            }}
                        />
                    </Box>
                    <Typography sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400 }}>Leaderboard</Typography>
                </Paper>
                <TableContainer sx={{ border: '1px solid #F0F0F0', mt: '20px' }}>
                    <Table sx={{ width: '100%' }} aria-label='simple table'>
                        <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                            <TableRow>
                                <TableCell align='center' sx={{ width: '5%', fontWeight: 'bold' }}>
                                    Rank
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='left'
                                >
                                    Avatar
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='left'
                                >
                                    Username
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='left'
                                >
                                    Scores
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='left'
                                >
                                    Points
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getPaginatedData()?.length > 0 &&
                                getPaginatedData().map((i: any) => {
                                    return (
                                        <TableRow key={i.rank}>
                                            <TableCell align='center' sx={{ width: '5%' }}>
                                                {i.rank}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='left'
                                            >
                                                <img src={i.avatar} alt='avatar' loading='lazy' />
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='left'
                                            >
                                                {i.username}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='left'
                                            >
                                                {numberFormat(i.scores)}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='left'
                                            >
                                                {numberFormat(i.points)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: '20px' }}>
                    <Pagination
                        isDialog
                        row={row}
                        handleChange={handleChange}
                        remove={data}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </Box>
            </Box>
        </Dialog>
    );
};

export default LeaderboardDialog;
