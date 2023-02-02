import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, Typography, FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

interface PaginationProps {
    row: any;
    handleChange: any;
    remove: any;
    goToPreviousPage: any;
    goToNextPage: any;
}

const Pagination: React.FC<PaginationProps> = ({ row, handleChange, remove, goToNextPage, goToPreviousPage }) => {
    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: '10px' }}>
            <Box />
            <Box
                sx={{
                    display: 'flex',
                    width: '20%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                    <Typography>Rows per page</Typography>
                    <Box>
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
                                onChange={handleChange}
                            >
                                {[...Array(remove.length)].map((item: any, idx: number) => (
                                    <MenuItem key={idx} value={idx + 1}>
                                        {idx + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex' }}>
                    <Typography>
                        1-{row} of {remove.length}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '15%', justifyContent: 'space-between' }}>
                    <ArrowBackIos onClick={goToPreviousPage} sx={{ cursor: 'pointer' }} />
                    <ArrowForwardIos onClick={goToNextPage} sx={{ cursor: 'pointer' }} />
                </Box>
            </Box>
        </Box>
    );
};

export default Pagination;
