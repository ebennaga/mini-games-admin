import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel } from '@mui/material';
import CheckboxController from 'components/Checkbox';
import dateFormat from 'helpers/dateFormat';

interface TournamentTableProps {
    data: any;
    form: any;
    handleChangeCheckboxAll: any;
    remove: any;
    handleChangeChekcbox: any;
    currentPage: any;
}

const TornamentTable: React.FC<TournamentTableProps> = ({
    currentPage,
    data,
    form,
    handleChangeCheckboxAll,
    remove,
    handleChangeChekcbox
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
                            Blogs Title
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Posted by
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Posted date
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Image
                        </TableCell>
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='left'
                        >
                            Description
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
                            const check: any = `checkbox${item.id}`;
                            const datas: any = {
                                id: item.id,
                                title: item.title,
                                postedBy: item.created_by.username,
                                postedDate: dateFormat(new Date(item.created_at)),
                                image: item.image,
                                description: item.description
                            };
                            return (
                                <TableRow key={item.id}>
                                    <TableCell align='center' sx={{ width: '5%' }}>
                                        {currentPage === 1 ? idx + 1 : currentPage > 1 && idx + 1 + (currentPage - 1) * 10}.
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.title}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.created_by.username}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {dateFormat(new Date(item.created_at))}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.image_url}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }} align='left'>
                                        {item.description}
                                    </TableCell>
                                    <TableCell align='center' sx={{ width: '6%', fontWeight: 'bold' }}>
                                        <CheckboxController
                                            form={form}
                                            name={`checkbox${item.id}`}
                                            checked={!!form.watch(check)}
                                            onChange={(e: any) => handleChangeChekcbox(e, `checkbox${item.id}`, item.id, datas)}
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
