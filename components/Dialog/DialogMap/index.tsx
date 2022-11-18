/* eslint-disable no-unused-vars */
import React from 'react';
import { Dialog, Box, Typography, ButtonBase } from '@mui/material';
import Map from './Map';

interface DialogMapProps {
    nameAddress: string;
    nameLat: string;
    nameLong: string;
    form: any;
    setOpen: any;
    open: boolean;
}

const DialogMap: React.FC<DialogMapProps> = ({ nameAddress, nameLat, nameLong, form, setOpen, open }) => {
    const [isSetAddress, setIsSetAddress] = React.useState<boolean>(false);
    const [dataMap, setDataMap] = React.useState({
        latitude: form.watch(nameLat),
        longitude: form.watch(nameLong),
        label: form.watch(nameAddress)
    });

    return (
        <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiPaper-root': { width: '100%', padding: '37px 60px' } }}>
            <Typography component='h2' fontSize='24px' fontWeight={400}>
                Determine your pinpoint point
            </Typography>
            <Typography component='p' fontSize='14px' sx={{ color: '#949494' }}>
                Location
            </Typography>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                boxShadow='0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'
                height='fit-content'
                mt={2}
                borderRadius='4px'
            >
                <Box>
                    <Map
                        nameAddress={nameAddress}
                        nameLat={nameLat}
                        nameLong={nameLong}
                        form={form}
                        isSetAddress={isSetAddress}
                        setIsSetAddress={setIsSetAddress}
                        dataMap={dataMap}
                        setDataMap={setDataMap}
                    />
                </Box>
                <Box padding='10px 16px'>
                    <Typography component='h2' fontSize='24px' fontWeight={400}>
                        {dataMap.label.split(',')[0]}
                    </Typography>
                    <Typography component='p' fontSize='14px' sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                        {dataMap.label
                            .split(', ')
                            .slice(1, form.watch(nameAddress).length - 1)
                            .join(', ')}
                    </Typography>
                </Box>
            </Box>
            <Box padding='10px 10px' border='1px solid rgba(0, 0, 0, 0.14)' mt='16px' borderRadius='4px'>
                <Typography component='h2' fontSize='16px' fontWeight={500}>
                    The location name doesn`t match your address?
                </Typography>
                <Typography component='p' fontSize='14px' sx={{ color: '#666666', mt: 1 }}>
                    Relax, you will fill in the address later. Make sure the pinpoint is appropriate first
                </Typography>
            </Box>
            <Box display='flex' gap='10px' mt='16px'>
                <ButtonBase
                    onClick={() => {
                        setIsSetAddress(true);
                        setOpen(false);
                    }}
                    sx={{
                        background: '#A54CE5',
                        fontWeight: 600,
                        width: '100%',
                        borderRadius: '4px',
                        padding: '13px',
                        color: '#ffF'
                    }}
                >
                    SET ADDRESS
                </ButtonBase>
                <ButtonBase
                    onClick={() => setOpen(false)}
                    sx={{
                        border: '1px solid #A54CE5',
                        fontWeight: 600,
                        width: '100%',
                        borderRadius: '4px',
                        padding: '13px',
                        color: '#A54CE5'
                    }}
                >
                    CANCEL
                </ButtonBase>
            </Box>
        </Dialog>
    );
};

export default DialogMap;
