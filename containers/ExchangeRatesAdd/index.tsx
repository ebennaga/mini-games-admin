import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import InputExchangeRates from 'components/Input/InputExchangeRates';

const ExchangeRatesAdd = () => {
    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ ml: -25, height: 80 }} component={Paper}>
                <Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ fontSize: '24px' }}>Add Exchange Rates</Typography>
                        <Typography sx={{ fontSize: '14px' }}>Additional description if required</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ml: -25, mt: 4 }}>
                <InputExchangeRates />
            </Box>
        </Container>
    );
};

export default ExchangeRatesAdd;
