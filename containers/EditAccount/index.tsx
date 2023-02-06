/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { Close } from '@mui/icons-material';
import {
    MenuItem,
    Box,
    Typography,
    Paper,
    FormControl,
    Select,
    InputLabel,
    FormControlLabel,
    Checkbox,
    Skeleton,
    FormHelperText
} from '@mui/material';
import CustomButton from 'components/Button';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import RadioButton from 'components/Radio/RadioV2';

interface CreateAccountProps {}

const CreateAccount: React.FC<CreateAccountProps> = () => {
    const data = {
        id: 1,
        name: 'Owi-kun',
        email: 'test@abc.com',
        access: ['Admin', 'Content Creator'],
        isActive: true
    };

    const form = useForm({
        mode: 'all',
        defaultValues: {
            name: '',
            email: '',
            role: '0',
            roles: '',
            activeRole: true
        }
    });
    const { fetchAPI } = useAPICaller();
    const notify = useNotify();
    const router = useRouter();
    const [roles, setRoles] = React.useState<any>([]);
    const [selectRoles, setSelectRoles] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoading1, setIsLoading1] = React.useState(false);
    const [isFilled, setIsFilled] = React.useState(false);
    const [isRequired, setIsRequired] = React.useState(false);
    const [dataAccount, setDataAccount] = React.useState<any>({});

    const fetchRoles = async () => {
        try {
            const result = await fetchAPI({
                method: 'GET',
                endpoint: 'roles'
            });

            if (result.status === 200) {
                setSelectRoles(result.data.data);
            } else {
                notify(result.message, 'error');
            }
        } catch (err: any) {
            notify(err.message, 'error');
        }
    };

    const fetchDetailAccount = async () => {
        setIsLoading(true);
        try {
            await fetchRoles();
            const result = await fetchAPI({
                method: 'GET',
                endpoint: `accounts/${router.query.id}`
            });

            if (result.status === 200) {
                const dataFetch = result.data.data;
                form.setValue('name', result.data.data.name);
                form.setValue('email', result.data.data.email);
                setDataAccount(dataFetch);
                form.setValue('activeRole', result.data.data.is_active);

                if (dataFetch.role_id && dataFetch.role_id.length === 1) {
                    form.setValue('role', dataFetch.role_id);
                    setRoles([`${dataFetch.role_id}`]);
                }
                if (dataFetch.role_id && dataFetch.role_id.length > 1) {
                    form.setValue('role', dataFetch.role_id.split(',')[0]);
                    setRoles(dataFetch.role_id.split(','));
                }
            }
            setIsLoading(false);
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const handleAddRole = (event: any) => {
        const isDuplicate: any = roles.includes(event.target.value);
        form.setValue('role', event.target.value);
        if (!isDuplicate) {
            setRoles([...roles, event.target.value as string]);
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

    const handleAddSetActive = (event: any) => {
        form.setValue('activeRole', event.target.checked);
    };

    const handleAddSetNotActive = (event: any) => {
        form.setValue('activeRole', !form.watch('activeRole'));
    };

    React.useEffect(() => {
        fetchDetailAccount();
    }, []);

    const handleSubmitData = async () => {
        const d = form.watch();
        if (isFilled) {
            setIsLoading1(true);
            const { email, name, role_id } = dataAccount;
            const { name: nameInput, email: emailInput, roles: rolesInput, role } = d;
            const resRoles = roles.join(',');

            let resData: any = {};

            resData = emailInput && email !== emailInput ? { ...resData, email: emailInput } : resData;
            resData = name && name !== nameInput ? { ...resData, name: nameInput } : resData;
            resData = roles && resRoles !== role_id ? { ...resData, role_ids: resRoles } : resData;

            try {
                if (Object.keys(resData).length > 0) {
                    const result = await fetchAPI({
                        endpoint: `accounts/${router.query.id}`,
                        method: 'PUT',
                        data: resData
                    });

                    if (result.status === 200) {
                        notify(result.data.message, 'success');

                        setIsLoading1(false);
                        setRoles([]);
                        setIsFilled(false);
                        setIsRequired(false);
                    }
                } else {
                    notify(`data doesn't changed`);
                }
            } catch (error: any) {
                notify(error.message, 'error');
                setIsLoading1(false);
            }
            setIsLoading1(false);
        } else {
            setIsRequired(true);
        }
    };

    React.useEffect(() => {
        if (roles.length > 0) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [roles, isFilled]);

    return (
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ padding: '40px 25px', height: '100vh' }}>
                    <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                        <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Edit Account</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                            Additional description if required
                        </Typography>
                    </Paper>

                    <Box sx={{ mt: '45px', width: '40%' }}>
                        <InputWithLabel
                            isRequired
                            isLoading={isLoading}
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
                            isLoading={isLoading}
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
                                {isLoading ? (
                                    <Skeleton sx={{ height: '90px', mt: '-20px', mb: '-20px' }} />
                                ) : (
                                    <>
                                        <InputLabel
                                            color='secondary'
                                            sx={{ fontWeight: 'bold', color: !isFilled && isRequired ? 'red' : '' }}
                                            id='demo-simple-select-label'
                                        >
                                            Role Code
                                        </InputLabel>
                                        <Select
                                            error={!isFilled && isRequired}
                                            sx={{ color: form.watch('role') === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                            placeholder='Select Roles'
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            value={form.watch('role')}
                                            label='Role Code'
                                            onChange={handleAddRole}
                                            color='secondary'
                                        >
                                            <MenuItem value='0' disabled>
                                                Select Roles
                                            </MenuItem>
                                            {selectRoles.length > 0 &&
                                                selectRoles.map((item: any) => {
                                                    return (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            {item.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Select>
                                    </>
                                )}
                                {!isFilled && isRequired && <FormHelperText sx={{ color: 'red' }}>Role is Required</FormHelperText>}
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
                                    const filter = selectRoles.length > 0 && selectRoles.filter((itm: any) => itm.id === item)[0];

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
                                            <Typography>
                                                {/* {item === '1' ? 'Admin' : item === '2' ? 'Marketing' : 'Content Writer'} */}
                                                {filter?.name}
                                            </Typography>
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
                                name='isActive'
                                handleChange={handleAddSetActive}
                                rules={{ required: true }}
                                checked={form.watch('activeRole')}
                                label='Yes'
                            />
                            <RadioButton
                                form={form}
                                name='isActive'
                                handleChange={handleAddSetNotActive}
                                rules={{ required: true }}
                                checked={!form.watch('activeRole')}
                                label='No'
                            />
                        </Box>
                    </Box>
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
                        isLoading={isLoading1}
                        onClick={handleSubmitData}
                        type='submit'
                        padding='10px'
                        width='193px'
                        height='59px'
                        title='UPDATE'
                        backgroundColor='#A54CE5'
                    />
                    <CustomButton
                        onClick={() => {
                            // setCreateAcc(!createAcc);
                            router.push('/account');
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
        </form>
    );
};

export default CreateAccount;
