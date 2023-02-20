import React, { useRef } from 'react';
import { Button, Dialog, Box, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import ReactToPrint from 'react-to-print';

type ButtonProps = React.HTMLProps<HTMLButtonElement>;

interface DialogBarcodeProps {
    open: boolean;
    setOpen: any;
    printHandler: any;
    form: any;
}

const ComponentToPrint = React.forwardRef<HTMLButtonElement, ButtonProps>((props: any, ref: any) => {
    return <div ref={ref}>{props.children}</div>;
});

const DialogBarcode: React.FC<DialogBarcodeProps> = ({ open, printHandler, setOpen, form }) => {
    const componentRef: any = useRef();
    return (
        <Dialog
            open={open}
            sx={{
                '& .MuiPaper-root': { width: '100%', padding: '37px 60px' }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <ComponentToPrint ref={componentRef}>
                    <Box
                        sx={{
                            padding: '50px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <QRCode value={form.watch('pin')} />
                        <Box
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.14)',
                                padding: '15px',
                                my: '20px',
                                width: '100%',
                                height: '109px',
                                borderRadius: '4px'
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold', mb: '10px' }}>This QR Generated</Typography>
                            <Typography>for player join to tournament without pin code</Typography>
                        </Box>
                    </Box>
                </ComponentToPrint>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
                    <ReactToPrint
                        content={() => componentRef.current}
                        trigger={() => {
                            // console.log('clicked');
                            return (
                                <Button
                                    sx={{ width: '50%', background: '#A54CE5' }}
                                    onClick={printHandler}
                                    variant='contained'
                                    color='secondary'
                                >
                                    Print
                                </Button>
                            );
                        }}
                    />

                    <Button sx={{ width: '50%' }} onClick={() => setOpen(!open)} variant='outlined' color='secondary'>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default DialogBarcode;
