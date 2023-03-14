import { Box, ButtonBase, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InputSelect from 'components/Input/InputSelect';
import InputSwitch from 'components/Input/InputSwitch';

interface FilterRolesProps {
    form: any;
    nameSelect: string;
    nameActive: string;
    dataSelect: any;
    open: boolean;
    setOpen: any;
    onFilter: () => void;
    onReset: () => void;
}

const FilterRoles: React.FC<FilterRolesProps> = ({ form, nameSelect, nameActive, dataSelect, open, setOpen, onFilter, onReset }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                display: open ? 'block' : 'none',
                bgcolor: '#fff',
                color: 'rgba(0, 0, 0, 0.6)',
                minWidth: '375px',
                boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
                borderRadius: '4px',
                padding: '24px'
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='space-between' mb='15px'>
                <Typography component='h3' fontSize='16px' fontWeight={600}>
                    Filter
                </Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <form>
                <Box>
                    <InputSelect form={form} name={nameSelect} dataSelect={dataSelect} title='Role Name' placeholder='Select Category' />
                </Box>
                <Box display='flex' alignItems='center' my='15px'>
                    <Typography component='h3' fontSize='16px' fontWeight={600}>
                        Is Active
                    </Typography>
                    <InputSwitch form={form} name={nameActive} />
                </Box>
                <Box display='flex' justifyContent='space-between' gap='11px'>
                    <ButtonBase
                        onClick={onFilter}
                        sx={{ bgcolor: '#A54CE5', width: '-webkit-fill-available', borderRadius: '4px', padding: '8px', color: '#fff' }}
                    >
                        FILTER
                    </ButtonBase>
                    <ButtonBase
                        onClick={onReset}
                        sx={{
                            border: '1px solid #A54CE5',
                            width: '-webkit-fill-available',
                            borderRadius: '4px',
                            padding: '8px',
                            color: '#A54CE5'
                        }}
                    >
                        RESET
                    </ButtonBase>
                </Box>
            </form>
        </Box>
    );
};

export default FilterRoles;
