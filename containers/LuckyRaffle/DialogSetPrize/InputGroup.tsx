import { Box, ButtonBase, Grid, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import InputSelect from 'components/Input/InputSelect';

interface InputGroupProps {
    form: any;
    namePrize: string;
    nameQty: string;
    dataPrize: any[];
    dataQty: any[];
    title: string;
    subTitle: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ form, namePrize, nameQty, dataPrize, dataQty, title, subTitle }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '14.7px' }}>
                <Box>
                    <Typography component='h3' sx={{ fontSize: '24px', fontWeight: 400, mb: '8px' }}>
                        {title}
                    </Typography>
                    <Typography component='h4' sx={{ fontSize: '14px', fontWeight: 400, color: '#949494' }}>
                        {subTitle}
                    </Typography>
                </Box>
                <ButtonBase
                    sx={{
                        background: '#A54CE5',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '8px',
                        padding: '13.5px 27px',
                        display: 'flex',
                        gap: '12px'
                    }}
                >
                    <DeleteIcon />
                    <span>DELETE</span>
                </ButtonBase>
            </Box>
            <Grid container spacing='15px' sx={{ mt: '19px' }}>
                <Grid item xs={7}>
                    <InputSelect form={form} name={namePrize} dataSelect={dataPrize} title='Set Prize' placeholder='Select Prize' />
                </Grid>
                <Grid item xs={5}>
                    <InputSelect form={form} name={nameQty} dataSelect={dataQty} title='Quantity' placeholder='Select Quantity' />
                </Grid>
            </Grid>
        </Box>
    );
};

export default InputGroup;
