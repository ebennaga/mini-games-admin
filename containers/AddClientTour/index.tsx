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
    TextField
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
import Input from 'components/Input/Input';
import DialogMap from 'components/Dialog/DialogMap';

const dummyData = [
    { id: 1, showTo: 1, player: 2, pointPrize: 10000, prizePlayer: 10000 },
    { id: 2, showTo: 3, player: 2, pointPrize: 15000, prizePlayer: 7500 },
    { id: 4, showTo: 10, player: 6, pointPrize: 3000, prizePlayer: 500 },
    { id: 11, showTo: 50, player: 40, pointPrize: 2000, prizePlayer: 50 }
];
const AddClientTour = () => {
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            title: '',
            games: '',
            mode: '',
            img: '',
            fee: '',
            prizeTable: '',
            poolPrize: '',
            address: '',
            lat: '',
            long: '',
            startDate: new Date().toJSON().slice(0, 10) || '',
            endDate: new Date().toJSON().slice(0, 10) || '',
            maxDate: getCurrentDate(),
            startTime: getCurrentTime(),
            endTime: getCurrentTime(),
            detailLocation: ''
        }
    });
    const rules = { required: true };
    const router = useRouter();
    const [prizeData, setPrizeData] = React.useState<any>(dummyData);
    const [prizePool, setPrizePool] = React.useState(0);

    React.useEffect(() => {
        let ttl: number = 0;
        prizeData.forEach((item: any) => {
            ttl += item.pointPrize;
        });
        setPrizePool(ttl);
    }, [prizeData.length]);
    const handleAddRow = () => {
        setPrizeData([...prizeData, { id: 0, showTo: 1, player: 1, pointPrize: 1, prizePlayer: 1 }]);
    };

    const handleDeleteRow = () => {
        const temp = prizeData;
        temp.pop();
        setPrizeData(prizeData.filter((item: any) => temp.includes(item)));
    };

    return (
        <Box component='section'>
            <TitleCard title='Create Client Tournament' subtitle='Addtional description if required' isSearchExist={false} />
            <form onSubmit={form.handleSubmit(() => {})}>
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
                                    <Typography sx={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.9)' }}>serpong utara</Typography>
                                </Box>
                                <ButtonBase
                                    sx={{ color: '#A54CE5', fontSize: '16px', borderBottom: '1px solid #A54CE5', alignSelf: 'flex-end' }}
                                >
                                    Change
                                </ButtonBase>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <Input
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
                            listSelect={[{ value: '1', label: 'Games 1' }]}
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
                            listSelect={[{ value: '1', label: 'Mode 1' }]}
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
                    <Box sx={{ my: '30px' }}>
                        <InputWithLabel
                            label='Prizing Table'
                            name='prizeTable'
                            type='text'
                            form={form}
                            labelField='Copy Table'
                            isSelectType
                            listSelect={[{ value: '1', label: 'Tourney Hop Up Okt 2022' }]}
                            isMultiline={false}
                            rules={rules}
                            isRequired
                        />
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
                                                    borderLeft: '1px solid #E0E0E0',
                                                    borderRight: '1px solid #E0E0E0',
                                                    fontWeight: 'bold'
                                                }}
                                                align='center'
                                            >
                                                Show to
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    borderLeft: '1px solid #E0E0E0',
                                                    borderRight: '1px solid #E0E0E0',
                                                    fontWeight: 'bold'
                                                }}
                                                align='center'
                                            >
                                                Count Player
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
                                                    // width: '8%',
                                                    borderLeft: '1px solid #E0E0E0',
                                                    borderRight: '1px solid #E0E0E0',
                                                    fontWeight: 'bold'
                                                }}
                                                align='center'
                                            >
                                                Point Prizes / Player
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {prizeData.map((item: any, idx: number) => {
                                            return (
                                                <TableRow key={idx + 1}>
                                                    <TableCell sx={{ width: '5%' }} align='center'>
                                                        {item.id}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.showTo}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.player}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.pointPrize}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}
                                                        align='center'
                                                    >
                                                        {item.prizePlayer}
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
                    <CustomButton type='submit' />
                    <CustomButton
                        onClick={() => router.back()}
                        title='Cancel'
                        border='1px solid #A54CE5'
                        backgroundColor='white'
                        color='#A54CE5'
                    />
                </Box>
            </form>
            <DialogMap form={form} nameAddress='address' nameLat='lat' nameLong='long' />
        </Box>
    );
};

export default AddClientTour;
