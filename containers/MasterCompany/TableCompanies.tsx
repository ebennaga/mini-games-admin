import { Box, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CheckboxController from 'components/Checkbox';
import React from 'react';

interface TableCompaniesProps {
    data: any;
    form: any;
    handleChangeCheckboxAll: any;
    remove: any;
    handleChangeCheckbox: any;
    currentPage: any;
}
const TableCompanies: React.FC<TableCompaniesProps> = ({
    currentPage,
    data,
    form,
    handleChangeCheckboxAll,
    remove,
    handleChangeCheckbox
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
                            Company Code
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Company Name
                        </TableCell>
                        <TableCell
                            sx={{
                                width: '8%',
                                borderLeft: '1px solid #E0E0E0',
                                borderRight: '1px solid #E0E0E0',
                                fontWeight: 'bold'
                            }}
                            align='center'
                        >
                            Is Active
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
                        data.map((item: any, idx: number) => {
                            const check: any = `checkbox${
                                currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10
                            }`;
                            return (
                                <TableRow key={item.id}>
                                    <TableCell align='center' sx={{ width: '5%' }}>
                                        {currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10}.
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.code}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            width: '5%',
                                            borderLeft: '1px solid #E0E0E0',
                                            borderRight: '1px solid #E0E0E0'
                                        }}
                                        align='center'
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: '70%',
                                                    backgroundColor: item.is_active ? '#A54CE5' : 'red',
                                                    padding: '2px',
                                                    borderRadius: '10px',
                                                    color: 'white'
                                                }}
                                            >
                                                <Typography>{item.is_active ? 'Yes' : 'No'}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                        <CheckboxController
                                            form={form}
                                            name={`checkbox${
                                                currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10
                                            }`}
                                            checked={!!form.watch(check)}
                                            onChange={(e: any) =>
                                                handleChangeCheckbox(
                                                    e,
                                                    `checkbox${
                                                        currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10
                                                    }`,
                                                    Number(
                                                        // currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10
                                                        item.id
                                                    )
                                                )
                                            }
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

export default TableCompanies;
