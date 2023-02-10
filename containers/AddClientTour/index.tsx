/* eslint-disable no-unused-vars */
import {
    Box,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ButtonBase,
    TextField,
    Input,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import React from 'react';
import TitleCard from 'components/Layout/TitleCard';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useForm } from 'react-hook-form';
import InputUpload from 'components/Input/InputUpload';
import { useRouter } from 'next/router';
import CustomButton from 'components/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import PlaceIcon from '@mui/icons-material/Place';
import InputDate from 'components/Input/InputDate';
import { getCurrentDate } from 'utils/date';
import InputLocation from 'components/Input/Input';
import DialogMap from 'components/Dialog/DialogMap';
import useAPICaller from 'hooks/useAPICaller';
import convertBase64 from 'helpers/convertBase64';
import useNotify from 'hooks/useNotify';

const dummyData = [
    { id: 1, showTo: 1, player: 2, pointPrize: 10000, prizePlayer: 10000 },
    { id: 2, showTo: 3, player: 2, pointPrize: 15000, prizePlayer: 7500 },
    { id: 4, showTo: 10, player: 6, pointPrize: 3000, prizePlayer: 500 },
    { id: 11, showTo: 50, player: 40, pointPrize: 2000, prizePlayer: 50 }
];
const AddClientTour = () => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            type: '1',
            title: '',
            games: '1',
            mode: '1',
            image: '',
            fee: '0',
            poolPrize: '0',
            startDate: '',
            endDate: '',
            maxDate: getCurrentDate(),
            startTime: '',
            endTime: '',
            detailLocation: '',
            address: 'Intermark, Rawa Mekar Jaya, Serpong, Tangerang Selatan, Banten, Indonesia',
            lat: -6.30943345,
            long: 106.6893430616688,
            company: '0'
        }
    });

    const { fetchAPI } = useAPICaller();
    const rules = { required: true };
    const router = useRouter();
    const [prizeData, setPrizeData] = React.useState<any>(dummyData);
    const [selectCompanies, setSelectCompanies] = React.useState<any>([]);
    const [roles, setRoles] = React.useState<any>([]);
    const [prizePool, setPrizePool] = React.useState<number>(0);
    const [openDialogMap, setOpenDialogMap] = React.useState<boolean>(false);
    const [isCompFilled, setIsCompFilled] = React.useState<boolean>(false);
    const [table, setTable] = React.useState<any>([]);
    const [selectTournament, setSelectTournament] = React.useState<any>([]);
    const [isError, setIsError] = React.useState<boolean>(false);
    const [companies, setCompanies] = React.useState<any>([]);
    const [isRolesFilled, setIsRolesFilled] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
    const [value, setValue] = React.useState('0');
    const [tableObj, setTableObj] = React.useState<any>({
        max_pos: '',
        point: '',
        coin: ''
    });

    const notify = useNotify();

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

    const handleAddRow = () => {
        if (tableObj.max_pos) {
            setTable([...table, tableObj]);
            setTableObj({
                max_pos: '',
                point: '',
                coin: ''
            });
        }
    };

    const handleDeleteRow = () => {
        if (table.length > 0) {
            const deleting = table.slice(0, table.length - 1);
            setTable(deleting);
        }
    };

    const handleAddCompany = (event: any) => {
        const isDuplicate: any = companies.includes(event.target.value);
        form.setValue('company', event.target.value);
        if (!isDuplicate) {
            const dataCompanies = selectCompanies.filter((item: any) => event.target.value === item.id);
            setCompanies([...companies, ...dataCompanies]);
        }
    };

    const handleTable = (event: any) => {
        setValue(event.target.value as string);
    };

    const fetchPrizesInfos = async () => {
        try {
            const result = await fetchAPI({
                endpoint: '/tournaments/prize-infos',
                method: 'GET'
            });

            if (result?.status === 200) {
                const dataPrize = result?.data.data;
                const filterPrizesInfo = dataPrize.filter((item: any) => {
                    return item.prize_infos.length > 0;
                });

                setSelectTournament(filterPrizesInfo);

                setPrizeData(dataPrize);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchPrizesInfos();
        getDataCompany();
    }, []);

    React.useEffect(() => {
        const point = table.map((item: any) => {
            return item.point;
        });
        if (table.length > 0) {
            const totalPrizes = point?.reduce((total: any, num: any) => {
                return Number(total) + Number(num);
            });
            setPrizePool(totalPrizes);
        } else {
            setPrizePool(0);
        }
    }, [table]);

    const handleSubmitData = async (data: any) => {
        setLoadingSubmit(true);
        try {
            const imgBase64 = await convertBase64(data.image);
            const body = {
                game_id: data.games,
                name: data.title,
                tournament_image: imgBase64,
                start_time: new Date(`${data.startDate} ${data.startTime}`).toISOString(),
                end_time: new Date(`${data.endDate} ${data.endTime}`).toISOString(),
                entry_coin: data.fee,
                prize_infos: table,
                company_id: data.company
            };

            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/tournaments',
                data: body
            });
            if (response?.status === 200) {
                setIsLoading(false);
                notify('Create tournament success!');
                router.push('/tournament/client-tournament');
                setTable([]);
                form.reset();
            } else {
                notify(response.data.message, 'error');
            }
        } catch (error: any) {
            notify(error.message, 'error');
        }
        setLoadingSubmit(false);
    };

    React.useEffect(() => {
        if (companies.length <= 0) {
            form.setValue('company', '0');
            return setIsCompFilled(false);
        }

        setIsCompFilled(true);
        return setIsRolesFilled(true);
    }, [companies, roles]);

    return (
        <Box component='section'>
            <TitleCard title='Create Client Tournament' subtitle='Addtional description if required' isSearchExist={false} />
            <form onSubmit={form.handleSubmit(handleSubmitData)}>
                <Box sx={{ my: 3, mx: 2, width: '40%' }}>
                    <InputWithLabel
                        label='Tournament Title'
                        name='title'
                        type='text'
                        form={form}
                        labelField='Title'
                        placeHolder='Max 100 Character'
                        isSelectType={false}
                        isMultiline={false}
                        rules={rules}
                        isRequired
                    />
                    <InputUpload isRequired label='Tournament Image' name='image' form={form} rules={rules} />
                    <Box
                        sx={{
                            mt: 2,
                            width: '100%',
                            display: 'flex',
                            justifyContent: '',
                            alignItems: 'center'
                        }}
                    >
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
                        <Box sx={{ width: '69%' }}>
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
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Location</Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '70%', my: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    position: 'relative',
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    padding: '15px 10px',
                                    borderRadius: '4px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        position: 'absolute',
                                        top: '-9px',
                                        background: '#fff',
                                        paddingX: '5px'
                                    }}
                                >
                                    Pin Point Location
                                </Typography>
                                <Box display='flex' gap={1}>
                                    <PlaceIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                                    <Typography sx={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.9)' }}>
                                        {form.watch('address')?.slice(0, 15)}...
                                    </Typography>
                                </Box>
                                <ButtonBase
                                    onClick={() => setOpenDialogMap(true)}
                                    sx={{ color: '#A54CE5', fontSize: '16px', borderBottom: '1px solid #A54CE5', alignSelf: 'flex-end' }}
                                >
                                    Change
                                </ButtonBase>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <InputLocation
                                    form={form}
                                    name='detailLocation'
                                    label='Detail Location'
                                    placeholder='Input detail location'
                                    isColor
                                    isTextArea
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Duration</Typography>
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
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <InputDate rules={{ required: true }} label='Start Date' type='date' form={form} name='startDate' />
                                <InputDate rules={{ required: true }} label='End Date' type='date' form={form} name='endDate' />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <InputDate rules={{ required: true }} label='Start Time' type='time' form={form} name='startTime' />
                                <InputDate rules={{ required: true }} label='End Time' type='time' form={form} name='endTime' />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Tournament Type'
                            name='type'
                            type='text'
                            form={form}
                            labelField='Type'
                            placeHolder='Select Type'
                            isSelectType
                            listSelect={[
                                { id: '1', name: 'Accumulatuion' },
                                { id: '2', name: 'High Score' }
                            ]}
                            isMultiline={false}
                            rules={rules}
                            isRequired
                        />
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Games'
                            name='games'
                            type='text'
                            form={form}
                            labelField='Games'
                            placeHolder='Select Games'
                            isSelectType
                            listSelect={[{ id: '1', name: 'Games 1' }]}
                            isMultiline={false}
                            rules={rules}
                            isRequired
                        />
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Tournament Mode'
                            name='mode'
                            type='text'
                            form={form}
                            labelField='Mode'
                            placeHolder='Select Mode'
                            isSelectType
                            listSelect={[{ id: '1', name: 'Mode 1' }]}
                            isMultiline={false}
                            rules={rules}
                            isRequired
                        />
                    </Box>
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Tournament Fee'
                            name='fee'
                            type='text'
                            form={form}
                            placeHolder='Fee Amount'
                            labelField='Fee'
                            isSelectType={false}
                            isMultiline={false}
                            rules={rules}
                            isRequired
                        />
                    </Box>
                    <Box sx={{ display: 'flex', aligItem: 'center', gap: '25px', ml: 2.5, my: '30px' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '25%'
                            }}
                        >
                            <Box>
                                <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    Prize Table
                                </Typography>

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
                            <Typography sx={{ fontWeight: 'bold' }}>:</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', aligItem: 'center', gap: '10px', width: '75%' }}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                    Copy Table
                                </InputLabel>
                                <Select
                                    sx={{
                                        color: value === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black'
                                    }}
                                    placeholder='Games'
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={value}
                                    label='Copy Table'
                                    onChange={handleTable}
                                >
                                    <MenuItem value='0' disabled>
                                        Select Tournament
                                    </MenuItem>
                                    {selectTournament.map((item: any, index: any) => {
                                        return (
                                            <MenuItem
                                                onClick={() => {
                                                    const res = item.prize_infos.map((i: any) => {
                                                        return { max_pos: i.max_pos, point: i.point, coin: i.coin };
                                                    });
                                                    setTable(res);
                                                }}
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <ButtonBase
                                onClick={() => {
                                    setTable([]);
                                    setValue('0');
                                }}
                                sx={{
                                    width: '20%',
                                    borderRadius: '5px',
                                    background: '#A54CE5',
                                    padding: '10px',
                                    color: 'white'
                                    // fontWeight: 600
                                }}
                            >
                                <Typography sx={{ fontSize: '12px' }}>RESET</Typography>
                            </ButtonBase>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px', justifyContent: 'end', alignItems: 'flex-end' }}>
                        <Box sx={{ width: '70%' }}>
                            <TableContainer sx={{ border: '1px solid #F0F0F0' }}>
                                <Table sx={{ width: '100%' }}>
                                    <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                                        <TableRow>
                                            <TableCell align='center' sx={{ width: '5%', fontWeight: 'bold' }}>
                                                Position
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderLeft: '1px solid #E0E0E0',
                                                    borderRight: '1px solid #E0E0E0',
                                                    fontWeight: 'bold'
                                                }}
                                                align='center'
                                            >
                                                Point Prizes
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderLeft: '1px solid #E0E0E0',
                                                    borderRight: '1px solid #E0E0E0',
                                                    fontWeight: 'bold'
                                                }}
                                                align='center'
                                            >
                                                Coin Prizes
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            sx={{
                                                '& .MuiInputBase-input': { textAlign: 'center' },
                                                '& .MuiTableCell-root': { padding: '8px !important', textAlign: 'center' }
                                            }}
                                        >
                                            <TableCell sx={{ width: '5%', fontWeight: 'bold' }}>
                                                <Input
                                                    sx={{ textAlign: 'center' }}
                                                    placeholder='Input here'
                                                    onChange={(e: any) => {
                                                        setTableObj({ ...tableObj, max_pos: Number(e.target.value) });
                                                    }}
                                                    disableUnderline
                                                    type='number'
                                                    // defaultValue={tableObj.max_pos}
                                                    value={tableObj.max_pos}
                                                />
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: '5%',
                                                    fontWeight: 'bold',
                                                    borderLeft: '1px solid #E0E0E0',
                                                    borderRight: '1px solid #E0E0E0'
                                                }}
                                            >
                                                <Input
                                                    placeholder='Input here'
                                                    onChange={(e: any) => {
                                                        setTableObj({ ...tableObj, point: Number(e.target.value) });
                                                    }}
                                                    disableUnderline
                                                    type='number'
                                                    // defaultValue={tableObj.point}
                                                    value={tableObj.point}
                                                />
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    width: '5%',
                                                    fontWeight: 'bold',
                                                    borderLeft: '1px solid #E0E0E0',
                                                    borderRight: '1px solid #E0E0E0'
                                                }}
                                            >
                                                <Input
                                                    placeholder='Input here'
                                                    onChange={(e: any) => {
                                                        setTableObj({ ...tableObj, coin: Number(e.target.value) });
                                                    }}
                                                    disableUnderline
                                                    type='number'
                                                    // defaultValue={tableObj.coin}
                                                    value={tableObj.coin}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        {table.map((item: any, idx: number) => {
                                            return (
                                                <TableRow key={idx}>
                                                    <TableCell sx={{ width: '5%' }} align='center'>
                                                        {item.max_pos}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.point}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.coin}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ width: '70%' }}>
                            <Box sx={{ marginTop: '14px', display: 'flex', justifyContent: 'end', alignItems: 'flex-end', gap: 1 }}>
                                <ButtonBase
                                    onClick={handleDeleteRow}
                                    sx={{
                                        border: '1px solid #A54CE5',
                                        color: '#A54CE5',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        backgroundColor: 'white',
                                        fontWeight: 500,
                                        fontSize: '15px'
                                    }}
                                >
                                    <RemoveIcon sx={{ mr: 1 }} />
                                    DELETE
                                </ButtonBase>
                                <ButtonBase
                                    onClick={handleAddRow}
                                    sx={{
                                        border: '1px solid #A54CE5',
                                        py: '10px',
                                        px: '14px',
                                        borderRadius: '4px',
                                        backgroundColor: '#A54CE5',
                                        fontWeight: 500,
                                        color: 'white',
                                        fontSize: '15px'
                                    }}
                                >
                                    <AddIcon sx={{ mr: 1 }} />
                                    ADD
                                </ButtonBase>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Box>
                                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Total Pool Prize</Typography>
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
                            <TextField fullWidth label='Prize Pool' value={prizePool} />
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', my: 3, mx: 5, gap: 3 }}>
                    <CustomButton type='submit' isLoading={loadingSubmit} />
                    {!loadingSubmit && (
                        <CustomButton
                            onClick={() => router.back()}
                            title='Cancel'
                            border='1px solid #A54CE5'
                            backgroundColor='white'
                            color='#A54CE5'
                        />
                    )}
                </Box>
            </form>
            <DialogMap open={openDialogMap} setOpen={setOpenDialogMap} form={form} nameAddress='address' nameLat='lat' nameLong='long' />
        </Box>
    );
};

export default AddClientTour;
