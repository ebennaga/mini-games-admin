/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Close } from '@mui/icons-material';
import { MenuItem, Box, Typography, Paper, FormControl, Select, InputLabel, Skeleton } from '@mui/material';
import CustomButton from 'components/Button';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import RadioButton from 'components/Radio/RadioV2';

interface EditClientAccountProps {}

const EditClientAccount: React.FC<EditClientAccountProps> = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            name: '',
            email: '',
            role: '0',
            roles: [],
            activeRole: false,
            company: '',
            companies: []
        }
    });
    const router = useRouter();

    const [roles, setRoles] = React.useState<any>([...form.watch('roles')]);
    const [companies, setCompanies] = React.useState<any>([]);
    const [isCompFilled, setIsCompFilled] = React.useState<boolean>(false);
    const [isRolesFilled, setIsRolesFilled] = React.useState<boolean>(false);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [dataRoles, setDataRoles] = React.useState<Array<any>>([]);
    const [dataCompanies, setDataCompanies] = React.useState<Array<any>>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = React.useState<boolean>(false);
    const [dataAccount, setDataAccount] = React.useState<any>({});
    // const valueRoles = dataRoles.filter((item: any) => item.id === form.watch('role'))[0]?.id;
    const valueCompany = dataCompanies.filter((item: any) => item.id === form.watch('company'))[0]?.id;
    // console.log('response', roles, valueRoles);
    // console.log('response2', dataCompanies, valueCompany);

    const { fetchAPI } = useAPICaller();
    const notify = useNotify();

    // FETCH COMPANIES
    const fetchDataCompanies = async () => {
        const response = await fetchAPI({
            method: 'GET',
            endpoint: 'companies'
        });
        if (response.status === 200) {
            const result = response.data.data;
            setDataCompanies(result);
        }
    };

    // FETCH ROLES
    const fetchDataRoles = async () => {
        const response = await fetchAPI({
            method: 'GET',
            endpoint: 'roles'
        });
        if (response.status === 200) {
            setDataRoles(response.data.data);
            return response.data.data;
        }
        return false;
    };

    // START FETCH DETAIL ACCOUNT
    const fetchDataClient = async () => {
        setIsLoading(true);
        try {
            await fetchDataCompanies();
            const resultRoles = await fetchDataRoles();
            const response = await fetchAPI({
                method: 'GET',
                endpoint: `accounts/${router.query.id}`
            });

            if (response.status === 200) {
                const { name, company, email, is_active: isActive, role_id: roleId } = response.data.data;
                const resCompanies: any = [company.name];

                // filling form & state value
                form.setValue('name', name);
                form.setValue('email', email);
                form.setValue('activeRole', isActive);
                form.setValue('companies', resCompanies);
                form.setValue('company', company.id as string);
                setCompanies(resCompanies);
                setDataAccount(response.data.data);

                if (resultRoles) {
                    // change roleId to array
                    const arrRoleId = roleId ? roleId.split(',') : [];

                    arrRoleId.map((item: string) => {
                        resultRoles.map((itm: any) => {
                            if (item === itm.id) {
                                const itmId = itm.id;
                                setRoles([...roles, itm.name]);

                                // filling form roles value
                                const formRoles: any = form.watch('roles');
                                const isDuplicate = formRoles.includes(itmId);
                                if (!isDuplicate) {
                                    const formRolesResult: any = [...formRoles, itm.id];
                                    form.setValue('roles', formRolesResult);
                                }
                            }
                        });
                    });
                }
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
        setIsLoading(false);
    };

    React.useEffect(() => {
        fetchDataClient();
    }, []);
    // END FETCH DETAIL ACCOUNT

    // Event update account
    const submitHandler = async () => {
        const d = form.watch();
        setLoadingUpdate(true);
        // const { name, email, roles: rolesBody, company } = form.watch();
        if (isCompFilled && isRolesFilled) {
            const { name, email, role_id, company } = dataAccount;
            const { name: nameInput, email: emailInput, roles: rolesInput, company: companyInput } = d;
            const resRoles = rolesInput.join(',');

            let resData: any = {};

            resData = emailInput && email !== emailInput ? { ...resData, email: emailInput } : resData;
            resData = name && name !== nameInput ? { ...resData, name: nameInput } : resData;
            resData = rolesInput.length > 0 && resRoles !== role_id ? { ...resData, role_ids: resRoles } : resData;
            resData = companyInput && company.id !== companyInput ? { ...resData, company_id: companyInput } : resData;

            setIsError(false);
            try {
                if (Object.keys(resData).length > 0) {
                    const response = await fetchAPI({
                        method: 'PUT',
                        endpoint: `accounts/${router.query.id}`,
                        data: resData
                    });

                    if (response.status === 200) {
                        notify(response.data.message, 'success');
                        // router.push('/client-account');
                    }
                } else {
                    notify(`data doesn't changed`);
                }
            } catch (error: any) {
                notify(error.message, 'error');
            }
        } else {
            setIsError(true);
        }
        setLoadingUpdate(false);
    };

    // Event Select Role
    const handleAddRole = (event: any) => {
        const { value } = event.target;
        form.setValue('role', value);
        // filter dataRoles to obtain name
        const valueFiltered = dataRoles.filter((item: any) => item.id === value)[0].name;

        // checking value already exist in state roles
        const isDuplicateState: any = roles.includes(valueFiltered);
        // conditional value doesnt exist
        if (!isDuplicateState) {
            setRoles([...roles, valueFiltered]);
        }

        // checking valueFiltered already exist
        const isDuplicateForm: any = roles.includes(valueFiltered);
        // conditional valueFiltered dosnt exist
        if (!isDuplicateForm) {
            const formRoles = form.watch('roles');
            const resultValueForm: any = [...formRoles, value];
            form.setValue('roles', resultValueForm);
        }
    };

    // Event Select Company
    const handleAddCompany = (event: any) => {
        form.setValue('company', event.target.value);
        // filter dataCompanies to obtain name
        const valueBadge = dataCompanies.filter((item: any) => item.id === event.target.value)[0].name;
        setCompanies([valueBadge]);
    };

    // Event Delete Roles
    const handleDeletedRoles = (item: any) => {
        // Delete role in state roles
        if (roles.length > 0) {
            const deleted = roles.filter((i: any) => {
                return item !== i;
            });
            setRoles(deleted);
        }

        // Delete role in form
        const formValue = form.watch('roles');
        if (formValue.length > 1) {
            const getId = dataRoles.filter((value: any) => value.name === item)[0].id;
            const resultValue = formValue.filter((value: any) => value !== getId);
            form.setValue('roles', resultValue);
        }
    };

    const handleDeletedCompanies = (item: any) => {
        if (companies.length > 0) {
            const deleted = companies.filter((i: any) => {
                return item !== i;
            });
            setCompanies(deleted);
        }
    };

    const handleAddSetActive = (event: any) => {
        form.setValue('activeRole', event.target.checked);
    };

    const handleAddSetNotActive = () => {
        form.setValue('activeRole', !form.watch('activeRole'));
    };

    React.useEffect(() => {
        if (companies.length <= 0 && roles.length <= 0) {
            form.setValue('role', '0');
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

    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{ padding: '40px 25px', height: '100vh' }}>
                <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Edit Client Account</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                        Additional description if required
                    </Typography>
                </Paper>
                <form>
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
                            isLoading={isLoading}
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
                            isLoading={isLoading}
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
                            {isLoading ? (
                                <Skeleton sx={{ height: '90px' }} />
                            ) : (
                                <FormControl fullWidth>
                                    <InputLabel color='secondary' sx={{ fontWeight: 'bold' }} id='simple-select-company'>
                                        Company
                                    </InputLabel>
                                    <Select
                                        sx={{ color: form.watch('company') === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                        placeholder='Select Company'
                                        labelId='simple-select-company'
                                        id='simple-select'
                                        // value={form.watch('company')}
                                        value={valueCompany}
                                        label='Company'
                                        onChange={handleAddCompany}
                                        color='secondary'
                                        error={isError}
                                    >
                                        <MenuItem value='0' disabled>
                                            Select Company
                                        </MenuItem>
                                        {dataCompanies.length > 0 &&
                                            dataCompanies.map((item: any) => (
                                                <MenuItem value={item.id} key={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            )}
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
                                            <Typography>{item}</Typography>
                                            <Box sx={{ borderRadius: '100%', backgroundColor: '#A54CE5', height: '20px' }}>
                                                <Close
                                                    fontSize='small'
                                                    sx={{ color: 'white', cursor: 'pointer', display: 'none' }}
                                                    onClick={() => handleDeletedCompanies(item)}
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
                                {isLoading ? (
                                    <Skeleton sx={{ height: '90px' }} />
                                ) : (
                                    <Select
                                        sx={{ color: form.watch('role') === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
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
                                        {dataRoles.length > 0 &&
                                            dataRoles.map((item: any) => (
                                                <MenuItem value={item.id} key={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                )}
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
                            {roles?.length > 0 &&
                                roles?.map((item: any, idx: number) => {
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
                                name='activeRole'
                                handleChange={handleAddSetActive}
                                rules={{ required: true }}
                                checked={form.watch('activeRole')}
                                label='Yes'
                            />
                            <RadioButton
                                form={form}
                                name='activeRole'
                                handleChange={handleAddSetNotActive}
                                rules={{ required: true }}
                                checked={!form.watch('activeRole')}
                                label='No'
                            />
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
                <CustomButton
                    type='submit'
                    onClick={submitHandler}
                    padding='10px'
                    width='193px'
                    height='59px'
                    title='Submit'
                    backgroundColor='#A54CE5'
                    isLoading={loadingUpdate}
                />
                {!loadingUpdate && (
                    <CustomButton
                        onClick={() => {
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
                )}
            </Box>
        </Box>
    );
};

export default EditClientAccount;
