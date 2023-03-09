import React from 'react';
import { Box, Table, TableBody, TableContainer, TableCell, TableRow, TableHead } from '@mui/material';
import TabPanel from 'components/TabPanel';
import Pagination from './Pagination';

interface TabPanelCompleteProps {
    value: any;
    index: any;
    goToNextPage: any;
    goToPrevPage: any;
    getPaginatedData: any;
    data: any;
    row: any;
    handleViewRow: any;
}

const TabPanelComplete: React.FC<TabPanelCompleteProps> = ({
    value,
    index,
    goToNextPage,
    goToPrevPage,
    getPaginatedData,
    data,
    row,
    handleViewRow
}) => {
    const dateOption: any = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    return (
        <TabPanel value={value} index={index}>
            <Box sx={{ mt: '20px' }}>
                <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
                    <Table sx={{ width: '100%' }}>
                        <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                            <TableRow>
                                <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>No.</TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='center'
                                >
                                    Nickname
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='center'
                                >
                                    Product Name
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='center'
                                >
                                    No. Order
                                </TableCell>
                                <TableCell
                                    sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                    align='center'
                                >
                                    Redeem Time
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Process Time
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Completed Time
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Kurir
                                </TableCell>

                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    No. Resi
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getPaginatedData().length > 0 &&
                                getPaginatedData().map((item: any, idx: number) => {
                                    let styles: any = {};
                                    if (item.status === 'pending') {
                                        styles = { backgroundColor: '#FF4566', borderRadius: '64px', px: 1 };
                                    } else if (item.status === 'processed') {
                                        styles = { backgroundColor: '#0288D1', borderRadius: '64px', px: 1 };
                                    } else if (item.status === 'delivered') {
                                        styles = { backgroundColor: '#A54CE5', borderRadius: '64px', px: 1 };
                                    } else if (item.status === 'completed') {
                                        styles = { backgroundColor: '#56CF54', borderRadius: '64px', px: 1 };
                                    }
                                    return (
                                        <TableRow key={idx + 1}>
                                            <TableCell align='center' sx={{ width: '5%' }}>
                                                {idx + 1}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                {item.user.username}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                {item.redemption_product.name}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                {item.order_code}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                {new Date(item.created_at).toLocaleString('id', dateOption).replace('.', ':')}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                {item.processed_at}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                {item.completed_at}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                <Box sx={{ color: 'white' }}>
                                                    <Box sx={styles}>{item.status}</Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                {item.delivery.courier?.name}
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                {item.delivery.resi_no}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    row={row}
                    handleViewRow={handleViewRow}
                    data={data}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPrevPage}
                />
            </Box>
        </TabPanel>
    );
};

export default TabPanelComplete;
