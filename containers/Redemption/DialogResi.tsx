import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, TextField } from '@mui/material';
import CustomButton from 'components/Button';

interface DialogResiProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    handleOpenDialog: (status: boolean) => void;
}
const DialogResi: React.FC<DialogResiProps> = ({ open, handleOpenDialog }) => {
    return (
        <Dialog
            open={open}
            onClose={() => handleOpenDialog(false)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ m: 2, p: 0, display: 'flex', justifyContent: 'start' }} id='alert-dialog-title'>
                <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 400 }}>Input Resi</Typography>
                    <Typography sx={{ color: '#949494', fontSize: '14px', fontWeight: 400 }}>Nomor Resi</Typography>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ m: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
                <TextField required fullWidth label='No. Resi' placeholder='Nomor Resi' type='text' sx={{ my: 1 }} />
            </DialogContent>
            <DialogActions sx={{ m: 2, p: 0 }}>
                <CustomButton title='CONFIRM' height='47px' type='submit' />
                <CustomButton
                    title='CANCEL'
                    backgroundColor='white'
                    color='#A54CE5'
                    border='1px solid #A54CE5'
                    height='47px'
                    onClick={() => handleOpenDialog(false)}
                />
            </DialogActions>
        </Dialog>
    );
};

export default DialogResi;
