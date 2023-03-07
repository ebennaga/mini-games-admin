/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Table, TableBody, TableContainer, TableCell, TableRow, TableHead, Link, ButtonBase } from '@mui/material';
import TabPanel from 'components/TabPanel';
import CustomButton from 'components/Button';
import Pagination from './Pagination';
import DialogResi from './DialogResi';
import DialogKurir from './DialogKurir';

interface TabPanelProcessProps {
    value: any;
    index: any;
    goToNextPage: any;
    goToPrevPage: any;
    getPaginatedData: any;
    data: any;
    row: any;
    handleViewRow: any;
    onClick?: any;
    dataCourier?: any;
    nameCourier: string;
    resiNo: string;
    form: any;
}

const TabPanelProcess: React.FC<TabPanelProcessProps> = ({
    value,
    index,
    goToNextPage,
    goToPrevPage,
    getPaginatedData,
    data,
    row,
    handleViewRow,
    onClick,
    dataCourier,
    nameCourier,
    resiNo,
    form
}) => {
    console.log({ data: getPaginatedData() });
    const [openDialogKurir, setOpenDialogKurir] = React.useState(false);
    const [openDialogResi, setOpenDialogResi] = React.useState(false);

    const handleDialogKurir = (status: boolean) => {
        setOpenDialogKurir(status);
    };
    const handleDialogResi = (status: boolean) => {
        setOpenDialogResi(status);
    };

    return (
        <TabPanel value={value} index={index}>
            <DialogKurir
                open={openDialogKurir}
                handleOpenDialog={(status: boolean) => handleDialogKurir(status)}
                data={dataCourier}
                nameCourier={nameCourier}
                form={form}
            />
            <DialogResi
                open={openDialogResi}
                handleOpenDialog={(status: boolean) => handleDialogResi(status)}
                resiNo={resiNo}
                form={form}
            />
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
                                <TableCell
                                    sx={{
                                        borderLeft: '1px solid #E0E0E0',
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 'bold'
                                    }}
                                    align='center'
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getPaginatedData().length > 0 &&
                                getPaginatedData().map((item: any, idx: number) => {
                                    const styles: any = { backgroundColor: '#0288D1', borderRadius: '64px', px: 1 };
                                    // if (item.status === 'pending') {
                                    //     styles = { backgroundColor: '#FF4566', borderRadius: '64px', px: 1 };
                                    // } else if (item.status === 'processed') {
                                    //     styles = { backgroundColor: '#0288D1', borderRadius: '64px', px: 1 };
                                    // } else if (item.status === 'delivered') {
                                    //     styles = { backgroundColor: '#A54CE5', borderRadius: '64px', px: 1 };
                                    // } else if (item.status === 'completed') {
                                    //     styles = { backgroundColor: '#56CF54', borderRadius: '64px', px: 1 };
                                    // }
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
                                                {new Date(item.created_at).toLocaleString('id')}
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
                                                <ButtonBase onClick={() => handleDialogKurir(true)}>
                                                    <Link sx={{ color: '#A54CE5', cursor: 'pointer' }}>Input Kurir</Link>
                                                </ButtonBase>
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                <ButtonBase onClick={() => handleDialogResi(true)}>
                                                    <Link sx={{ color: '#A54CE5', cursor: 'pointer' }}>Input Resi</Link>
                                                </ButtonBase>
                                            </TableCell>
                                            <TableCell
                                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                align='center'
                                            >
                                                <CustomButton
                                                    title='DELIVERED'
                                                    height='42px'
                                                    width='114px'
                                                    fontSize='15px'
                                                    onClick={() => onClick(item)}
                                                />
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

export default TabPanelProcess;
