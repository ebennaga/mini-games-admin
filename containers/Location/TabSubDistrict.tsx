import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TabPanel from './TabPanel';
import Pagination from './Pagination';

interface TabSubDistrictProps {
    value: any;
    index: number;
    row: any;
    handleChange: any;
    remove: any;
    goToPreviousPage: any;
    goToNextPage: any;
    data: any;
}

const TabSubDistrict: React.FC<TabSubDistrictProps> = ({
    data,
    value,
    index,
    row,
    handleChange,
    remove,
    goToNextPage,
    goToPreviousPage
}) => {
    return (
        <TabPanel value={value} index={index}>
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
                                Province Code
                            </TableCell>
                            <TableCell
                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                align='left'
                            >
                                Province
                            </TableCell>
                            <TableCell
                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                align='left'
                            >
                                City Code
                            </TableCell>
                            <TableCell
                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                align='left'
                            >
                                City
                            </TableCell>
                            <TableCell
                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                align='left'
                            >
                                District Code
                            </TableCell>
                            <TableCell
                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                align='left'
                            >
                                District
                            </TableCell>
                            <TableCell
                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                align='left'
                            >
                                Sub District Code
                            </TableCell>
                            <TableCell
                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                align='left'
                            >
                                Sub District
                            </TableCell>
                            <TableCell
                                sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                                align='left'
                            >
                                Postal Code
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 &&
                            data.map((item: any) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell align='center' sx={{ width: '5%' }}>
                                            {item.id}.
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.provinceCode}
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.province}
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.cityCode}
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.city}
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.districtCode}
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.district}
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.subDistrictCode}
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.subDistrict}
                                        </TableCell>
                                        <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                            {item.postalCode}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                goToPreviousPage={goToPreviousPage}
                row={row}
                handleChange={handleChange}
                remove={remove}
                goToNextPage={goToNextPage}
            />
        </TabPanel>
    );
};

export default TabSubDistrict;
