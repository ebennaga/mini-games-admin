import React from 'react';
import { Dialog, ButtonBase, Box, Typography } from '@mui/material';

interface DialogConfirmationProps {
    title: string;
    subTitle: string;
    handleConfirm: any;
    open: boolean;
    setOpen: any;
    textConfirmButton: string;
    textCancelButton: string;
}

const DialogConfirmation: React.FC<DialogConfirmationProps> = ({
    title,
    subTitle,
    handleConfirm,
    open,
    setOpen,
    textCancelButton,
    textConfirmButton
}) => {
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} sx={{ '& .MuiPaper-root': { padding: '42px 30px', textAlign: 'center' } }}>
            <Box>
                <Typography component='h2' fontSize='24px' fontWeight={400} sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                    {title}
                </Typography>
                <Typography component='p' fontSize='16px' fontWeight={400} sx={{ color: '#949494', pt: '27px', pb: '46px' }}>
                    {subTitle}
                </Typography>
                <Box display='flex' justifyContent='space-between' gap='27px'>
                    <ButtonBase
                        onClick={handleConfirm}
                        sx={{ bgcolor: '#A54CE5', borderRadius: '4px', width: '201px', color: '#fff', padding: '11.5px' }}
                    >
                        {textConfirmButton}
                    </ButtonBase>
                    <ButtonBase
                        onClick={handleCancel}
                        sx={{ border: '1px solid #A54CE5', borderRadius: '4px', width: '201px', color: '#A54CE5', padding: '11.5px' }}
                    >
                        {textCancelButton}
                    </ButtonBase>
                </Box>
            </Box>
        </Dialog>
    );
};

export default DialogConfirmation;
