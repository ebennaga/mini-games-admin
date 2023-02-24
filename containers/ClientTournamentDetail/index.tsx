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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    Button
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
import { getCurrentDate, getCurrentTime } from 'utils/date';
import InputCustom from 'components/Input/Input';
import DialogMap from 'components/Dialog/DialogMap';
import useAPICaller from 'hooks/useAPICaller';
import useNotify from 'hooks/useNotify';
import convertBase64 from 'helpers/convertBase64';

const dummyData = [
    { id: 1, showTo: 1, player: 2, pointPrize: 10000, prizePlayer: 10000 },
    { id: 2, showTo: 3, player: 2, pointPrize: 15000, prizePlayer: 7500 },
    { id: 4, showTo: 10, player: 6, pointPrize: 3000, prizePlayer: 500 },
    { id: 11, showTo: 50, player: 40, pointPrize: 2000, prizePlayer: 50 }
];
const DetailClientTour = () => {
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            title: '',
            games: '1',
            mode: '1',
            img: '',
            fee: '',
            prizeTable: '',
            poolPrize: '',
            startDate: new Date().toJSON().slice(0, 10) || '',
            endDate: new Date().toJSON().slice(0, 10) || '',
            maxDate: getCurrentDate(),
            startTime: getCurrentTime(),
            endTime: getCurrentTime(),
            detailLocation: '',
            address: 'Intermark, Rawa Mekar Jaya, Serpong, Tangerang Selatan, Banten, Indonesia',
            lat: -6.30943345,
            long: 106.6893430616688
        }
    });

    const rules = { required: true };
    const router = useRouter();
    const notify = useNotify();
    const { fetchAPI } = useAPICaller();
    const [prizeData, setPrizeData] = React.useState<any>(dummyData);
    const [prizePool, setPrizePool] = React.useState(0);
    const [openDialogMap, setOpenDialogMap] = React.useState<boolean>(false);
    const [table, setTable] = React.useState<any>([]);
    const [value, setValue] = React.useState('0');
    const [selectTournament, setSelectTournament] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
    const [tableObj, setTableObj] = React.useState<any>({
        max_pos: 0,
        point: 0,
        coin: 0
    });

    // const [detailData, setDetailData] = React.useState<any>(null);

    const GEOCODE_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=';

    const reverseCoordinate = async (latlang: any) => {
        const data = await (await fetch(`${GEOCODE_URL}${latlang.long},${latlang.lat}`)).json();
        return data;
    };

    const handleTable = (event: any) => {
        setValue(event.target.value as string);
    };

    const handleAddRow = () => {
        if (tableObj.max_pos) {
            setTable([...table, tableObj]);
            setTableObj({
                max_pos: 0,
                point: 0,
                coin: 0
            });
        }
    };

    const handleDeleteRow = () => {
        if (table.length > 0) {
            const deleting = table.slice(0, table.length - 1);
            setTable(deleting);
        }
    };

    const getTime = (data: any) => {
        const time = new Date(data);
        const hour = time.getHours();
        const minute = time.getMinutes();
        const result = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
        return result;
    };

    const getDetailClientTournament = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI({
                method: 'GET',
                endpoint: `tournaments/${router.query.id}`
            });

            if (response.status === 200) {
                const result = response.data.data;
                const startTime: any = await getTime(result.start_time);
                const endTime: any = await getTime(result.end_time);
                const latLong: any = {
                    long: result.longitude,
                    lat: result.latitude
                };
                const address: any = await reverseCoordinate(latLong);
                form.setValue('address', address.address.Match_addr);
                form.setValue('endTime', endTime);
                form.setValue('startTime', startTime);
                form.setValue('startDate', new Date(result.start_time).toJSON().slice(0, 10));
                form.setValue('endDate', new Date(result.end_time).toJSON().slice(0, 10));
                form.setValue('lat', result.latitude);
                form.setValue('long', result.longitude);
                form.setValue('games', result.game.id);
                form.setValue('games', result.game.id);
                form.setValue('title', result.name);
                form.setValue('poolPrize', result.total_point);
                form.setValue('fee', result.entry_coin);
                form.setValue('detailLocation', result.address);
                setTable([...table, ...result.prize_infos]);
                setIsLoading(false);
            }
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
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
            notify(error.message, 'error');
        }
    };

    const handleSubmitData = async (data: any) => {
        setLoadingSubmit(true);
        try {
            const imgBase64 = await convertBase64(data.img);
            const body = {
                game_id: data.games,
                name: data.title,
                tournament_image: imgBase64,
                start_time: new Date(`${data.startDate} ${data.startTime}`).toISOString(),
                end_time: new Date(`${data.endDate} ${data.endTime}`).toISOString(),
                entry_coin: data.fee,
                prize_infos: table,
                company_id: data.company
                // status: 'OPEN'
            };

            const response = await fetchAPI({
                method: 'PUT',
                endpoint: `tournaments/${router.query.id}`,
                data: body
            });
            if (response?.status === 200) {
                setIsLoading(false);
                notify(response.data.message, 'success');
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

    // const handleAddRow = () => {
    //     setPrizeData([...prizeData, { id: 0, showTo: 1, player: 1, pointPrize: 1, prizePlayer: 1 }]);
    // };

    // const handleDeleteRow = () => {
    //     const temp = prizeData;
    //     temp.pop();
    //     setPrizeData(prizeData.filter((item: any) => temp.includes(item)));
    // };

    React.useEffect(() => {
        getDetailClientTournament();
        fetchPrizesInfos();
    }, []);

    // React.useEffect(() => {
    //     let ttl: number = 0;
    //     prizeData.forEach((item: any) => {
    //         ttl += item.pointPrize;
    //     });
    //     setPrizePool(ttl);
    // }, [prizeData.length]);

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

    return (
        <Box component='section'>
            <TitleCard title='Detail Client Tournament' subtitle='Addtional description if required' isSearchExist={false} />
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
                    <InputUpload isRequired label='Tournament Image' name='img' form={form} rules={rules} />
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
                                <InputCustom
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
                            label='Games'
                            name='games'
                            type='text'
                            form={form}
                            labelField='Games'
                            placeHolder='Select Games'
                            isSelectType
                            listSelect={[
                                { id: '1', name: 'Hop up' },
                                { id: '2', name: 'Tower Stack' },
                                { id: '3', name: 'Rose Dart' }
                            ]}
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
                            listSelect={[
                                { id: '1', name: 'OPEN' },
                                { id: '2', name: 'CLOSED' }
                            ]}
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
                    <Box sx={{ display: 'flex', aligItem: 'center', gap: '25px', ml: 2.5, my: '30px', width: '100%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '23%'
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
                        <Box sx={{ display: 'flex', aligItem: 'center', gap: '10px', width: '70%' }}>
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
                                                No.
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    // width: '8%',
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
                                                <TableRow key={idx + 1}>
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

export default DetailClientTour;
