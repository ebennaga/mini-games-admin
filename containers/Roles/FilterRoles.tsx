/* eslint-disable no-unused-vars */
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InputSelect from 'components/Input/InputSelect';
import InputSwitch from 'components/Input/InputSwitch';

interface FilterRolesProps {
    form: any;
    nameSelect: string;
    nameActive: string;
    dataSelect: any;
}

const FilterRoles: React.FC<FilterRolesProps> = ({ form, nameSelect, nameActive, dataSelect }) => {
    return (
        <Box
            sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                minWidth: '375px',
                boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
                borderRadius: '4px',
                padding: '24px'
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography component='h3' fontSize='16px' fontWeight={400}>
                    Filter
                </Typography>
                <IconButton>
                    <CloseIcon />
                </IconButton>
            </Box>
            <form>
                <Box>
                    <InputSelect form={form} name={nameSelect} dataSelect={dataSelect} title='Role Code' placeholder='Select Category' />
                </Box>
                <Box>
                    <Typography component='h3' fontSize='16px' fontWeight={400}>
                        Is Active
                    </Typography>
                    <InputSwitch form={form} name={nameActive} />
                </Box>
            </form>
        </Box>
    );
};

export default FilterRoles;
