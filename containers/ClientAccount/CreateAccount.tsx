import { Close } from '@mui/icons-material';
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
    roles: any;
    setRoles: any;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
    setCreateAcc,
    createAcc,
    form,
    addRole,
    handleAddRole,
    activeRole,
    handleAddSetActive,
    handleAddSetNotActive,
    roles,
    setRoles
}) => {
    // const [accessArr, setAccessArr] = React.useState<string[]>([]);

    const handleDeletedRoles = (item: any) => {
        if (roles.length > 0) {
            const deleted = roles.filter((i: any) => {
                return item !== i;
            });
            setRoles(deleted);
        }
    };

    // const handleSelectAccess = (event: any) => {
    //     const isDuplicate: any = roles.includes(event.target.value);
    //     form.setValue('access', event.target.value);
    //     if (!isDuplicate) {
    //         setAccessArr([...accessArr, event.target.value as string]);
    //     }
    // };

    // const handleDeletedAccess = (item: any) => {
    //     if (accessArr.length > 0) {
    //         const deleted = accessArr.filter((i: any) => {
    //             return item !== i;
    //         });
    //         setAccessArr(deleted);
    //     }
    // };

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
                    <Box sx={{ mt: '45px', width: '30%' }}>
                        <InputWithLabel
                            isRequired
                            foucused
                            labelField='Name'
                            placeHolder='Max 100 Character'
                            name='name'
                            form={form}
                            label='Name'
                            type='text'
                            rules={{ required: true, maxLength: 100 }}
                        />
                    </Box>
                    <Box sx={{ mt: '45px', width: '30%' }}>
                        <InputWithLabel
                            isRequired
                            labelField='Email'
                            foucused
                            placeHolder='Max 100 Character'
                            name='email'
                            form={form}
                            label='Email'
                            type='email'
                            rules={{ required: true, maxLength: 100 }}
                        />
                    </Box>
                    <Box sx={{ mt: '45px', width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Role</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        fontSize: '12px',
                                        position: 'relative',
                                        bottom: '-10px'
                                    }}
                                >
                                    *Field Required
                                </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '70%' }}>
                            <FormControl fullWidth>
                                <InputLabel color='secondary' sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                    Role Code
                                </InputLabel>
                                <Select
                                    sx={{ color: addRole === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                    placeholder='Select Roles'
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={addRole}
                                    label='Role Code'
                                    onChange={handleAddRole}
                                    color='secondary'
                                >
                                    <MenuItem value='0' disabled>
                                        Select Roles
                                    </MenuItem>
                                    <MenuItem value='Admin'>Admin</MenuItem>
                                    <MenuItem value='Marketing'>Marketing</MenuItem>
                                    <MenuItem value='Content Writer'>Content Writer</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '30%',
                            height: '',
                            padding: '10px',
                            mt: roles.length > 0 ? '20px' : '0px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ width: '30%' }} />
                        <Box sx={{ width: '70%', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                            {roles.length > 0 &&
                                roles.map((item: any, idx: number) => {
                                    return (
                                        <Box
                                            key={idx}
                                            sx={{
                                                backgroundColor: 'rgba(165, 76, 229, 0.04)',
                                                padding: '5px 10px',
                                                // width: '40%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderRadius: '20px',
                                                gap: '5px'
                                            }}
                                        >
                                            <Typography>{item}</Typography>
                                            <Box sx={{ borderRadius: '100%', backgroundColor: '#A54CE5', height: '20px' }}>
                                                <Close
                                                    fontSize='small'
                                                    sx={{ color: 'white', cursor: 'pointer' }}
                                                    onClick={() => handleDeletedRoles(item)}
                                                />
                                            </Box>
                                        </Box>
                                    );
                                })}
                        </Box>
                    </Box>
                    {/* <Box sx={{ mt: '35px', width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Data Access</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        fontSize: '12px',
                                        position: 'relative',
                                        bottom: '-10px'
                                    }}
                                >
                                    *Field Required
                                </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '70%' }}>
                            <FormControl fullWidth>
                                <InputLabel color='secondary' sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                    Access
                                </InputLabel>
                                <Select
                                    sx={{ color: addRole === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                    placeholder='Select Roles'
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={form.watch('access')}
                                    label='Access'
                                    onChange={handleSelectAccess}
                                    color='secondary'
                                >
                                    <MenuItem value='0' disabled>
                                        Client Access
                                    </MenuItem>
                                    <MenuItem value='Starbucks Lt2'>Starbucks Lt2</MenuItem>
                                    <MenuItem value='Texas Tourney'>Texas Tourney</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '30%',
                            height: '',
                            padding: '10px',
                            mt: accessArr.length > 0 ? '20px' : '0px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ width: '30%' }} />
                        <Box sx={{ width: '70%', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                            {accessArr.length > 0 &&
                                accessArr.map((item: any, idx: number) => {
                                    return (
                                        <Box
                                            key={idx}
                                            sx={{
                                                backgroundColor: 'rgba(165, 76, 229, 0.04)',
                                                padding: '5px 10px',
                                                // width: '40%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderRadius: '20px',
                                                gap: '5px'
                                            }}
                                        >
                                            <Typography>{item}</Typography>
                                            <Box sx={{ borderRadius: '100%', backgroundColor: '#A54CE5', height: '20px' }}>
                                                <Close
                                                    fontSize='small'
                                                    sx={{ color: 'white', cursor: 'pointer' }}
                                                    onClick={() => handleDeletedAccess(item)}
                                                />
                                            </Box>
                                        </Box>
                                    );
                                })}
                        </Box>
                    </Box> */}
                    <Box sx={{ mt: '35px', width: '30%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Is Active</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        fontSize: '12px',
                                        position: 'relative',
                                        bottom: '-10px'
                                    }}
                                >
                                    *Field Required
                                </Typography>
                            </Box>
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
