import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, Typography, FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

interface PaginationProps {
    row: any;
    handleChange: any;
    remove: any;
    goToPreviousPage: any;
    goToNextPage: any;
    isDialog?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ isDialog = false, row, handleChange, remove, goToNextPage, goToPreviousPage }) => {
    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Box />
            <Box
                sx={{
                    display: 'flex',
                    width: isDialog ? '60%' : '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '11px' }}>Rows per page</Typography>
                    <Box>
                        <FormControl>
                            <Select
                                sx={{
                                    fontSize: '11px',
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
                    <Typography sx={{ fontSize: '11px' }}>
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
