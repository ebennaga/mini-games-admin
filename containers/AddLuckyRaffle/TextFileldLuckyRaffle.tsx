import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Input from 'components/Input/Input';

interface TextFileldLuckyRaffleProps {
    form: any;
    name: string;
    placeholder: string;
    rules: any;
    labelInput: string;
    label: string;
    type: 'number' | 'text';
    startAddorment?: React.ReactElement;
}

const TextFileldLuckyRaffle: React.FC<TextFileldLuckyRaffleProps> = ({
    form,
    name,
    placeholder,
    rules,
    labelInput,
    label,
    type,
    startAddorment
}) => {
    return (
        <Grid container>
            <Grid item container xs={12} lg={5} spacing='24px'>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography component='h3' sx={{ fontSize: '16px', fontWeight: 600, color: 'rgba(0, 0, 0, 0.6)' }}>
                            {label}
                        </Typography>
                        <Typography component='p' sx={{ fontSize: '12px', color: '#666666' }}>
                            *Field Required
                        </Typography>
                    </Box>
                    <Typography component='span'>:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Input
                        type={type}
                        form={form}
                        name={name}
                        placeholder={placeholder}
                        rules={rules}
                        label={labelInput}
                        startAdornment={startAddorment || null}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TextFileldLuckyRaffle;
