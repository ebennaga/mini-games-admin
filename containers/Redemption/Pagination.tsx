import React from 'react';
import { Box, Typography, FormControl, Select, MenuItem, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationProps {
    row: any;
    data: any;
    handleViewRow: any;
    goToPreviousPage: any;
    goToNextPage: any;
}
const Pagination: React.FC<PaginationProps> = ({ row, data, handleViewRow, goToPreviousPage, goToNextPage }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', fontSize: '12px', fontWeight: 400 }}>
            <Typography>Rows per page</Typography>
            <FormControl>
                <Select
                    sx={{
                        boxShadow: 'none',
                        '.MuiOutlinedInput-notchedOutline': { border: 0 },
                        '& .Mui-focused': { border: 0 }
                    }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={row}
                    defaultValue={data.length.toString()}
                    onChange={handleViewRow}
                >
                    {[...Array(data.length)].map((item: any, idx: number) => (
                        <MenuItem key={idx} value={idx + 1}>
                            {idx + 1}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography>
                1-{row} of {data.length}
            </Typography>
            <Box sx={{ display: 'flex' }}>
                <IconButton onClick={goToPreviousPage}>
                    <ArrowBackIosIcon sx={{ cursor: 'pointer', mx: 3 }} />
                </IconButton>
                <IconButton onClick={goToNextPage}>
                    <ArrowForwardIosIcon sx={{ cursor: 'pointer' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Pagination;
