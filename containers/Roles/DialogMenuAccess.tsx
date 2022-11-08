import React from 'react';
import { Dialog, Typography, FormGroup, FormControlLabel, Checkbox, Box, ButtonBase } from '@mui/material';

interface DialogMenuAccessProps {
    onUpdate: any;
    open: boolean;
    setOpen: any;
    currentRoles: string;
    listAccess: any;
    form: any;
    name: string;
}

const DialogMenuAccess: React.FC<DialogMenuAccessProps> = ({ onUpdate, open, setOpen, currentRoles, listAccess, form, name }) => {
    const [dataAccesss, setDataAccess] = React.useState<Array<any>>([...listAccess]);
    const handleChange = (data: any) => {
        let stateData = { ...data };
        if (stateData.isChecked) {
            stateData = { ...stateData, isChecked: false };
        } else {
            stateData = { ...stateData, isChecked: true };
        }
        let filterData = dataAccesss.filter((item: any) => item.id !== data.id);
        filterData = [...filterData, stateData];
        filterData.sort((a: any, b: any) => a.id - b.id);
        setDataAccess(filterData);
        form.setValue(name, filterData);
    };

    return (
        <Dialog open={open} sx={{ '& .MuiPaper-root': { padding: '31px 33px', width: '551px' } }}>
            <form onSubmit={form.handleSubmit(onUpdate)}>
                <Typography component='h2' fontWeight={400} fontSize='24px'>
                    Menu Access
                </Typography>
                <Typography component='p' fontWeight={400} fontSize='14px' sx={{ color: '#949494' }}>
                    {currentRoles}
                </Typography>
                <FormGroup
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridTemplateRows: 'repeat(4, 1fr)',
                        gridColumnGap: '30px',
                        gridRowGap: '5px',
                        mt: '35px'
                    }}
                >
                    {dataAccesss.map((item: any) => {
                        return (
                            <FormControlLabel
                                key={item.id}
                                control={<Checkbox checked={item.isChecked} onChange={() => handleChange(item)} />}
                                label={item.name}
                            />
                        );
                    })}
                </FormGroup>
                <Box display='flex' gap='28px' mt='25px'>
                    <ButtonBase
                        type='submit'
                        sx={{ bgcolor: '#A54CE5', color: '#fff', borderRadius: '4px', width: '-webkit-fill-available', p: '10px' }}
                    >
                        UPDATE
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => setOpen(false)}
                        sx={{
                            color: '#A54CE5',
                            border: '1px solid #A54CE5',
                            borderRadius: '4px',
                            width: '-webkit-fill-available',
                            p: '10px'
                        }}
                    >
                        CANCEL
                    </ButtonBase>
                </Box>
            </form>
        </Dialog>
    );
};

export default DialogMenuAccess;
