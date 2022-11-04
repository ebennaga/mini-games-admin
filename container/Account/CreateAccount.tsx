import { MenuItem, Box, Typography, Paper, FormControl, Select, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import CustomButton from 'components/Button';
import InputWithLabel from 'components/Input/InputWithLabel';
import React from 'react';

interface CreateAccountProps {
    setCreateAcc: any;
    createAcc: boolean;
    form: any;
    addRole: any;
    handleAddRole: any;
    activeRole?: any;
    handleAddSetActive?: any;
    handleAddSetNotActive?: any;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
    setCreateAcc,
    createAcc,
    form,
    addRole,
    handleAddRole,
    activeRole,
    handleAddSetActive,
    handleAddSetNotActive
}) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ padding: '40px 25px', height: '100vh' }}>
                <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Add Account</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                        Additional description if required
                    </Typography>
                </Paper>
                <form>
                    <Box sx={{ mt: '30px', width: '30%' }}>
                        <InputWithLabel
                            foucused
                            placeholder='Max 100 Character'
                            name='name'
                            form={form}
                            label='Name'
                            type='text'
                            rules={{ required: true, maxLength: 100 }}
                        />
                    </Box>
                    <Box sx={{ mt: '30px', width: '30%' }}>
                        <InputWithLabel
                            foucused
                            placeholder='Max 100 Character'
                            name='email'
                            form={form}
                            label='Email'
                            type='email'
                            rules={{ required: true, maxLength: 100 }}
                        />
                    </Box>
                    <Box sx={{ mt: '30px', width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Role</Typography>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '70%' }}>
                            <FormControl fullWidth>
                                <InputLabel color='secondary' sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                    Role Code
                                </InputLabel>
                                <Select
                                    sx={{ color: addRole === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                    placeholder='Select Category'
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={addRole}
                                    label='Role Code'
                                    onChange={handleAddRole}
                                    color='secondary'
                                >
                                    <MenuItem value='0' disabled>
                                        Select Category
                                    </MenuItem>
                                    <MenuItem value='1'>Super Admin</MenuItem>
                                    <MenuItem value='2'>Admin</MenuItem>
                                    <MenuItem value='3'>Content Writer</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{ my: '30px', width: '30%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Is Active</Typography>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                                <FormControlLabel
                                    sx={{ color: 'black', fontWeight: 800 }}
                                    value={activeRole}
                                    control={<Checkbox color='secondary' />}
                                    label='Yes'
                                    labelPlacement='end'
                                    checked={form.watch('activeRole')}
                                    onChange={handleAddSetActive}
                                />
                            </Box>
                            <Box>
                                <FormControlLabel
                                    sx={{ color: 'black', fontWeight: 800 }}
                                    value={!activeRole}
                                    control={<Checkbox color='secondary' />}
                                    label='No'
                                    labelPlacement='end'
                                    checked={!form.watch('activeRole')}
                                    onChange={handleAddSetNotActive}
                                />
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Box>
            <Box
                sx={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    mt: '20px',
                    position: 'absolute',
                    bottom: '0px',
                    padding: '40px',
                    width: '100%'
                }}
            >
                <CustomButton onClick={() => {}} padding='10px' width='193px' height='59px' title='Submit' backgroundColor='#A54CE5' />
                <CustomButton
                    onClick={() => {
                        setCreateAcc(!createAcc);
                    }}
                    padding='10px'
                    width='193px'
                    height='59px'
                    title='cancel'
                    backgroundColor='white'
                    color='#A54CE5'
                    border='1px solid #A54CE5'
                />
            </Box>
        </Box>
    );
};

export default CreateAccount;
