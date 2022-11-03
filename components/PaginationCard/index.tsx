import React from 'react';
import { Box, Typography, FormControl, Select, MenuItem, IconButton, SelectChangeEvent } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationCardProps {
    handleSelectRow: any;
    totalItem: number;
    handlePrev: any;
    handleNext: any;
}

const PaginationCard: React.FC<PaginationCardProps> = ({ handleSelectRow, totalItem, handlePrev, handleNext }) => {
    const [row, setRow] = React.useState<any>(5);

    const handleRow = (e: SelectChangeEvent) => {
        setRow(e.target.value);
        handleSelectRow();
    };

    const totalPage = Math.ceil(totalItem / row);

    return (
        <Box sx={{ float: 'right', mt: 2 }}>
            <Typography component='span' fontSize='12px' fontWeight={400} sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                Rows per page:
            </Typography>
            <FormControl
                sx={{
                    mt: '2px',
                    ml: '3px',
                    '& .MuiInputBase-root::before': { border: 'none' },
                    '& .MuiInputBase-root::after': { border: 'none' }
                }}
            >
                <Select
                    variant='standard'
                    labelId='selectPage'
                    value={row}
                    onChange={handleRow}
                    sx={{ '& .MuiSelect-select': { padding: '0 19px 0 0 !important', fontSize: '12px' } }}
                >
                    {[...Array(15)].map((_item: any, index: number) => {
                        const value = index + 1;
                        return (
                            <MenuItem key={value} value={value} sx={{ padding: '0 29px 0 0' }}>
                                {value}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Typography component='span' fontSize='12px' fontWeight={400} px='33px'>
                1-{totalPage} of {totalItem}
            </Typography>
            <IconButton onClick={handlePrev}>
                <ArrowBackIosIcon sx={{ fontSize: '12px' }} />
            </IconButton>
            <IconButton onClick={handleNext}>
                <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
            </IconButton>
        </Box>
    );
};

export default PaginationCard;
