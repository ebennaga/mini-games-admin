import React from 'react';
import { Box, Typography, Dialog } from '@mui/material';
import CustomButton from 'components/Button';
import { CheckCircle } from '@mui/icons-material';

interface DeleteAccDialogProps {
    open: any;
    setOpen: any;
    qty: any;
    handleDelete: any;
    onDelete: boolean;
    setOnDelete: any;
    setIsChecked: any;
    form: any;
}

const DeleteAccDialog: React.FC<DeleteAccDialogProps> = ({
    setIsChecked,
    setOnDelete,
    onDelete,
    handleDelete,
    open,
    setOpen,
    qty,
    form
}) => {
    // const [onDelete, setOnDelete] = React.useState(false);
    return (
        <Dialog open={open} onClose={setOpen}>
            <Box
                sx={{
                    width: '475px',
                    height: '255px',
                    padding: '25px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
                        {onDelete ? 'Sucess Remove Account' : 'Are you sure remove this account?'}
                    </Typography>
                </Box>
                {!onDelete ? (
                    <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>{qty} selected item</Typography>
                    </Box>
                ) : (
                    <CheckCircle sx={{ width: '80px', height: '80px', color: '#A54CE5', my: '20px' }} />
                )}
                <Box
                    sx={{
                        gap: '10px',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'space-between',
                        width: '100%'
                    }}
                >
                    {onDelete ? (
                        <CustomButton
                            onClick={() => {
                                setOpen(!open);
                                setIsChecked(false);
                                form.setValue('checkAll', false);
                                setTimeout(() => {
                                    setOnDelete(!onDelete);
                                }, 2000);
                            }}
                            title='Back'
                            width='100%'
                        />
                    ) : (
                        <>
                            <CustomButton title='Remove' onClick={handleDelete} />
                            <CustomButton
                                onClick={() => setOpen(!open)}
                                title='Cancel'
                                border='1px solid #A54CE5'
                                backgroundColor='white'
                                color='#A54CE5'
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Dialog>
    );
};

export default DeleteAccDialog;
