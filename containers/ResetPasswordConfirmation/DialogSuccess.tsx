import React from 'react';
import { Box, Typography, Dialog } from '@mui/material';
import CustomButton from 'components/Button';
import { CheckCircle } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface DialogSuccessProps {
    open: any;
    setOpen: any;
}

const DialogSuccess: React.FC<DialogSuccessProps> = ({ open = true, setOpen }) => {
    const router = useRouter();
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
                    <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Sucess Reset Password</Typography>
                </Box>
                <CheckCircle sx={{ width: '80px', height: '80px', color: '#A54CE5', my: '20px' }} />
                <Box
                    sx={{
                        gap: '10px',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'space-between',
                        width: '100%'
                    }}
                >
                    <CustomButton
                        title='BACK TO SIGN IN'
                        width='100%'
                        onClick={() => {
                            router.push('/sign-in');
                        }}
                    />
                </Box>
            </Box>
        </Dialog>
    );
};

export default DialogSuccess;
