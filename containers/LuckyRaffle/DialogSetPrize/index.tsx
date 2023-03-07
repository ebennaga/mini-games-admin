import { Box, Dialog, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InputGroup from './InputGroup';

interface DialogSetPrizeProps {
    form: any;
    prize1: string;
    prize2: string;
    prize3: string;
    prize4: string;
    qty1: string;
    qty2: string;
    qty3: string;
    qty4: string;
}

// eslint-disable-next-line no-unused-vars
const DialogSetPrize: React.FC<DialogSetPrizeProps> = ({ form, prize1, prize2, prize3, prize4, qty1, qty2, qty3, qty4 }) => {
    const dataSelect = [
        { id: 1, title: 'emas 2 gram' },
        { id: 2, title: 'emas 1 gram' },
        { id: 3, title: 'emas 0.5 gram' },
        { id: 4, title: '100 pointz' }
    ];
    return (
        <Dialog
            open
            maxWidth='lg'
            sx={{
                '.MuiPaper-root': {
                    width: '50%',
                    padding: '20px 45px'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                    padding: '16px'
                }}
            >
                <Box>
                    <Typography component='h3' sx={{ fontSize: '24px', fontWeight: 400, mb: '8px' }}>
                        Set Prize
                    </Typography>
                    <Typography component='h4' sx={{ fontSize: '14px', fontWeight: 400, color: '#949494' }}>
                        Set Prize Pool
                    </Typography>
                </Box>
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </Box>
            <form>
                <InputGroup
                    form={form}
                    namePrize={prize1}
                    nameQty={qty1}
                    dataPrize={dataSelect}
                    dataQty={dataSelect}
                    title='Set Prize 1'
                    subTitle='Lorem ipsum'
                />
            </form>
        </Dialog>
    );
};

export default DialogSetPrize;
