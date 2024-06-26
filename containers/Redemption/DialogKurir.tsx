/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, TextField, MenuItem } from '@mui/material';
import CustomButton from 'components/Button';

interface DialogKurirProps {
    open: boolean;
    data: any;
    // eslint-disable-next-line no-unused-vars
    handleOpenDialog: (status: boolean) => void;

    nameCourier: string;
    form: any;
}
// const listKurir = [
//     { value: 1, label: 'J&T' },
//     { value: 2, label: 'SICEPAT' },
//     { value: 3, label: 'ANTERAJA' },
//     { value: 4, label: 'JNE' }
// ];
const DialogKurir: React.FC<DialogKurirProps> = ({ open, handleOpenDialog, data, nameCourier, form }) => {
    return (
        <Dialog
            open={open}
            onClose={() => handleOpenDialog(false)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ m: 2, p: 0, display: 'flex', justifyContent: 'start' }} id='alert-dialog-title'>
                <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 400 }}>Input Kurir</Typography>
                    <Typography sx={{ color: '#949494', fontSize: '14px', fontWeight: 400 }}>Kurir</Typography>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ m: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
                <TextField required fullWidth label='Kurir' sx={{ my: 1 }} select>
                    {data?.map((option: any) => (
                        <MenuItem onClick={() => form.setValue(nameCourier, option.id)} key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions sx={{ m: 2, p: 0 }}>
                <CustomButton title='CONFIRM' height='47px' type='submit' onClick={() => handleOpenDialog(false)} />
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

export default DialogKurir;
