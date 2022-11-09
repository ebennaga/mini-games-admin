import React from 'react';
import { Box, Dialog, Typography, ButtonBase } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface DialogFailedProps {
    title: string;
    subTitle: string;
    open: boolean;
    setOpen: any;
}

const DialogFailed: React.FC<DialogFailedProps> = ({ title, subTitle, open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{ '& .MuiPaper-root': { padding: '21px 25px', width: '80%', display: 'flex', flexDirection: 'column' } }}
        >
            <Box color='#D32F2F' display='flex' alignItems='center' gap='13px' mb='24px'>
                <ErrorOutlineOutlinedIcon />
                <Typography component='h3' fontSize='20px' fontWeight={600}>
                    {title}
                </Typography>
            </Box>
            <Typography component='p' fontSize='16px' sx={{ color: '#949494', mb: '22px' }}>
                {subTitle}
            </Typography>
            <ButtonBase
                onClick={handleClose}
                sx={{ color: '#A54CE5', fontSize: '14px', fontWeight: 600, width: 'fit-content', alignSelf: 'flex-end' }}
            >
                CLOSE
            </ButtonBase>
        </Dialog>
    );
};

export default DialogFailed;
