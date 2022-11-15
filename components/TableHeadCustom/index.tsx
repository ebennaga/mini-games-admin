import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

interface TableGridProps {
    titleCell: any;
}

const TableHeadCustom: React.FC<TableGridProps> = ({ titleCell }) => {
    return (
        <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
            <TableRow>
                <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>No.</TableCell>
                {titleCell.map((item: any) => {
                    return (
                        <TableCell
                            sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', fontWeight: 'bold' }}
                            align='center'
                        >
                            {item}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

export default TableHeadCustom;
