import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface BadgeSelectedProps {
    total: number;
    onEdit?: any;
    handleOpenDeleteDialog: any;
}

const BadgeSelected: React.FC<BadgeSelectedProps> = ({ total, onEdit, handleOpenDeleteDialog }) => {
    return (
        <Box
            sx={{
                color: 'rgba(0, 0, 0, 0.87)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 16px',
                background: '#F4F1FF',
                my: '15px'
            }}
        >
            <Typography component='h4' fontSize='14px'>
                {total} items selected
            </Typography>
            <Box>
                {total === 1 && onEdit && (
                    <IconButton onClick={onEdit} sx={{ fontSize: '13px', color: '#A54CE5' }}>
                        <EditIcon sx={{ mr: '10.24px' }} /> EDIT
                    </IconButton>
                )}
                <IconButton onClick={handleOpenDeleteDialog} sx={{ fontSize: '13px', color: '#A54CE5' }}>
                    <DeleteIcon sx={{ mr: '10.24px' }} /> REMOVE
                </IconButton>
            </Box>
        </Box>
    );
};

export default BadgeSelected;
