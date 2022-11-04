import React from 'react';
import { Dialog, Typography, Box, ButtonBase } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

interface DialogSuccessProps {
    title: string;
    open: boolean;
    setOpen: any;
}

const DialogSuccess: React.FC<DialogSuccessProps> = ({ title, open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} sx={{ '& .MuiPaper-root': { padding: '42px 30px', textAlign: 'center' } }}>
            <Box>
                <Typography component='h2' fontSize='24px' fontWeight={400}>
                    {title}
                </Typography>
                <CheckCircle sx={{ width: '80px', height: '80px', color: '#A54CE5', my: '20px' }} />
                <ButtonBase
                    onClick={handleClose}
                    sx={{ bgcolor: '#A54CE5', borderRadius: '4px', width: '100%', color: '#fff', padding: '11.5px' }}
                >
                    Back
                </ButtonBase>
            </Box>
        </Dialog>
    );
};

export default DialogSuccess;
