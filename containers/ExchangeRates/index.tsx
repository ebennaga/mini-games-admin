import React from 'react';
import { Container, Box, Typography, ButtonBase, Paper } from '@mui/material';
import Search from 'components/Search';
import { useForm } from 'react-hook-form';
import TableExchange from 'components/Table/TableExchange';

const ExchangeRates = () => {
    const handleSearch = async () => {
        console.log('done');
    };
    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: ''
        }
    });
    return (
        <Container sx={{ mt: 12 }}>
            <Box sx={{ ml: -25, height: 120 }} component={Paper}>
                <Box>
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ fontSize: '24px' }}>Exchange Rates</Typography>
                        <Typography sx={{ fontSize: '14px' }}>Additional description if required</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center', ml: 2, direction: 'row' }}>
                        <Search name='search' form={form} placeholder='search by coins' onSubmit={handleSearch} />
                        <ButtonBase
                            sx={{
                                width: '121px',
                                height: '36px',
                                backgroundColor: '#A54CE5',
                                borderRadius: '4px',
                                mr: 1,
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)'
                            }}
                        >
                            <Typography sx={{ fontSize: '14px', color: '#ffffff' }}>Create New</Typography>
                        </ButtonBase>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ml: -25, mt: 3 }} component={Paper}>
                <TableExchange />
            </Box>
        </Container>
    );
};

export default ExchangeRates;
