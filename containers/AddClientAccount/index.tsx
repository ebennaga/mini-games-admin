/* eslint-disable no-unused-vars */
import { Close } from '@mui/icons-material';
import { MenuItem, Box, Typography, Paper, FormControl, Select, InputLabel } from '@mui/material';
import CustomButton from 'components/Button';
import InputWithLabel from 'components/Input/InputWithLabel';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import RadioButton from 'components/Radio/RadioV2';
import { useSelector } from 'react-redux';

interface CreateClientAccountProps {}

const CreateClientAccount: React.FC<CreateClientAccountProps> = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            name: '',
            email: '',
            roles: '0',
            company: '0',
            is_active: true
        }
    });
    const [accessArr, setAccessArr] = React.useState<string[]>([]);
    const [roles, setRoles] = React.useState<any>([]);
    const [companies, setCompanies] = React.useState<any>([]);
    const [selectCompanies, setSelectCompanies] = React.useState<any>([]);
    const [selectRoles, setSelectRoles] = React.useState<any>([]);
    const [isCompFilled, setIsCompFilled] = React.useState<boolean>(false);
    const [isRolesFilled, setIsRolesFilled] = React.useState<boolean>(false);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const userState = useSelector((state: any) => state.webpage?.user?.user);

    const getDataCompany = async () => {
        setIsLoading(true);
        try {
            const result = await fetchAPI({
                method: 'GET',
                endpoint: `companies/`
            });

            if (result.status === 200) {
                const dataCompanies = result.data.data;
                setSelectCompanies(dataCompanies);
                setIsLoading(false);
            }
        } catch (err: any) {
            notify(err.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const getDataRoles = async () => {
        setIsLoading(true);
        try {
            const result = await fetchAPI({
                method: 'GET',
                endpoint: `roles/`
            });

            if (result.status === 200) {
                const dataResults = result.data.data;

                setSelectRoles(dataResults);
                setIsLoading(false);
            }
        } catch (err: any) {
            notify(err.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const handlePOSTSubmit = async () => {
        if (isCompFilled && isRolesFilled) {
            setIsError(false);
            try {
                const response = await fetchAPI({
                    method: 'POST',
                    endpoint: `/accounts`,
                    data: {
                        id: Math.floor(Math.random() * 300 + 1),
                        email: form.watch('email'),
                        name: form.watch('name'),
                        role_ids: form.watch('roles'),
                        company: form.watch('company'),
                        is_active: form.watch('is_active')
                    }
                });
                if (response.status === 200) {
                    notify(response.data.message, 'success');
                }
            } catch (error: any) {
                notify(error.message, 'error');
            }
        } else {
            setIsError(true);
        }
    };

    const handleAddRole = (event: any) => {
        const isDuplicate: any = roles.includes(event.target.value);
        form.setValue('roles', event.target.value);
        if (!isDuplicate) {
            const dataRoles = selectRoles.filter((item: any) => event.target.value === item.id);
            // setRoles([...roles, ...dataRoles]);
            setRoles([...roles, event.target.value as string]);
        }
    };

    const handleAddCompany = (event: any) => {
        const isDuplicate: any = companies.includes(event.target.value);
        form.setValue('company', event.target.value);
        if (!isDuplicate) {
            const dataCompanies = selectCompanies.filter((item: any) => event.target.value === item.id);
            setCompanies([...companies, ...dataCompanies]);
            // setCompanies([...companies, event.target.value as string]);
        }
    };

    const handleDeletedRoles = (item: any) => {
        if (roles.length > 0) {
            const deleted = roles.filter((i: any) => {
                return item !== i;
            });
            setRoles(deleted);
        }
    };

    const handleDeletedCompanies = (item: any) => {
        if (companies.length > 0) {
            const deleted = companies.filter((i: any) => {
                return item !== i.id;
            });
            setCompanies(deleted);
        }
    };

    const handleSelectAccess = (event: any) => {
        const isDuplicate: any = roles.includes(event.target.value);
        // form.setValue('dataAccess', event.target.value);
        if (!isDuplicate) {
            setAccessArr([...accessArr, event.target.value as string]);
        }
    };

    const handleDeletedAccess = (item: any) => {
        if (accessArr.length > 0) {
            const deleted = accessArr.filter((i: any) => {
                return item !== i;
            });
            setAccessArr(deleted);
        }
    };

    const handleAddSetActive = (event: any) => {
        form.setValue('is_active', event.target.checked);
    };

    const handleAddSetNotActive = (event: any) => {
        form.setValue('is_active', !form.watch('is_active'));
    };
    React.useEffect(() => {
        getDataCompany();
        getDataRoles();
    }, []);
    React.useEffect(() => {
        if (companies.length <= 0 && roles.length <= 0) {
            form.setValue('roles', '0');
            form.setValue('company', '0');
            setIsCompFilled(false);
            return setIsRolesFilled(false);
        }

        setIsCompFilled(true);
        return setIsRolesFilled(true);
    }, [companies, roles]);

    React.useEffect(() => {
        if (isCompFilled && isRolesFilled) {
            setIsError(false);
        }
    }, [isCompFilled, isRolesFilled]);
    // console.log('roles', roles);

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ padding: '40px 25px' }}>
                <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Add Client Account</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                        Additional description if required
                    </Typography>
                </Paper>
                <form onSubmit={form.handleSubmit(handlePOSTSubmit)}>
                    <Box sx={{ mt: '45px', width: '40%' }}>
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
                    <Box sx={{ mt: '45px', width: '40%' }}>
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
                    <Box sx={{ mt: '45px', width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Company Name</Typography>
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
                                <InputLabel color='secondary' sx={{ fontWeight: 'bold' }} id='simple-select-company'>
                                    Company
                                </InputLabel>
                                <Select
                                    sx={{ color: form.watch('company') === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                    placeholder='Select Company'
                                    labelId='simple-select-company'
                                    id='simple-select'
                                    value={form.watch('company')}
                                    label='Company'
                                    onChange={handleAddCompany}
                                    color='secondary'
                                    error={isError}
                                >
                                    <MenuItem value='0' disabled>
                                        Select Company
                                    </MenuItem>
                                    {/* <MenuItem value='Starduck'>Starduck</MenuItem>
                                    <MenuItem value='J.OC'>J.OC</MenuItem>
                                    <MenuItem value='Mc Dono'>Mc Dono</MenuItem> */}
                                    {selectCompanies.map((item: any, index: any) => {
                                        return (
                                            <MenuItem value={item.id} key={index}>
                                                {item.code} {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '40%',
                            height: '',
                            padding: '10px',
                            mt: roles.length > 0 ? '20px' : '0px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ width: '30%' }} />
                        <Box sx={{ width: '70%', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                            {companies.length > 0 &&
                                companies.map((item: any, idx: number) => {
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
                                            <Typography>{item.name}</Typography>
                                            <Box sx={{ borderRadius: '100%', backgroundColor: '#A54CE5', height: '20px' }}>
                                                <Close
                                                    fontSize='small'
                                                    sx={{ color: 'white', cursor: 'pointer' }}
                                                    onClick={() => handleDeletedCompanies(item.id)}
                                                />
                                            </Box>
                                        </Box>
                                    );
                                })}
                            {companies.length <= 0 && isError && (
                                <Typography sx={{ color: 'red', fontSize: '11px' }}>Companies field is required!</Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ mt: '45px', width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                    sx={{ color: form.watch('roles') === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                    placeholder='Select Roles'
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={form.watch('roles')}
                                    label='Role Code'
                                    onChange={handleAddRole}
                                    color='secondary'
                                    error={isError}
                                >
                                    <MenuItem value='0' disabled>
                                        Select Roles
                                    </MenuItem>
                                    {/* <MenuItem value='Admin'>Admin</MenuItem>
                                    <MenuItem value='Marketing'>Marketing</MenuItem>
                                    <MenuItem value='Content Writer'>Content Writer</MenuItem> */}
                                    {selectRoles.map((item: any, index: any) => {
                                        return (
                                            <MenuItem value={item.code} key={index}>
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '40%',
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
                            {roles.length <= 0 && isError && (
                                <Typography sx={{ color: 'red', fontSize: '11px' }}>Roles field is required!</Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ mt: '35px', width: '35%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <Box sx={{ width: '35%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
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
                        <Box sx={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <RadioButton
                                form={form}
                                name='is_active'
                                handleChange={handleAddSetActive}
                                rules={{ required: true }}
                                checked={form.watch('is_active')}
                                label='Yes'
                            />
                            <RadioButton
                                form={form}
                                name='is_active'
                                handleChange={handleAddSetNotActive}
                                rules={{ required: true }}
                                checked={!form.watch('is_active')}
                                label='No'
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center',
                            mt: '20px',
                            // position: 'absolute',
                            bottom: '0px',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            // padding: '40px',
                            width: '100%'
                        }}
                    >
                        <CustomButton
                            // type='submit'
                            type='submit'
                            // onClick={submitHandler}
                            padding='10px'
                            width='193px'
                            height='59px'
                            title='Submit'
                            backgroundColor='#A54CE5'
                        />
                        <CustomButton
                            onClick={() => {
                                // setCreateAcc(!createAcc);
                                router.push('/client-account');
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
                </form>
            </Box>
        </Box>
    );
};

export default CreateClientAccount;
