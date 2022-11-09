import {
    Box,
    FormControl,
    TextField,
    Typography,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ButtonBase
} from '@mui/material';
import React from 'react';
import TitleCard from 'components/Layout/TitleCard';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useForm } from 'react-hook-form';
import InputUpload from 'components/Input/InputUpload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/router';
import CustomButton from 'components/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const prizeData = [
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
            poolPrize: ''
        }
    });
    const rules = { required: true };
    const router = useRouter();
    const [date, setDate] = React.useState<Dayjs | null>(null);

    React.useEffect(() => {
        setDate(dayjs(Date.now()));
    });
    return (
        <Box component='section'>
            <TitleCard title='Create Client Tournament' subtitle='Addtional description if required' isSearchExist={false} />
            <form onSubmit={form.handleSubmit(() => {})}>
                <Box sx={{ my: 3, mx: 2 }}>
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
                    />
                    <InputUpload label='Tournament Image' name='img' form={form} rules={rules} />
                    <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>Duration</Typography>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
                        </Box>
                        <Box sx={{ width: '70%' }}>
                            <Box sx={{ display: 'flex' }}>
                                <FormControl
                                    required
                                    fullWidth
                                    sx={{
                                        marginTop: '14px',
                                        marginBottom: '14px',
                                        marginRight: '14px'
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            InputAdornmentProps={{ position: 'start' }}
                                            label='Start Date'
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                <FormControl
                                    required
                                    fullWidth
                                    sx={{
                                        marginTop: '14px',
                                        marginBottom: '14px'
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            InputAdornmentProps={{ position: 'start' }}
                                            label='End Date'
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex' }}>
                                <FormControl
                                    required
                                    fullWidth
                                    sx={{
                                        marginTop: '14px',
                                        marginBottom: '14px',
                                        marginRight: '14px'
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            InputAdornmentProps={{ position: 'start' }}
                                            label='Start Time'
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                <FormControl
                                    required
                                    fullWidth
                                    sx={{
                                        marginTop: '14px',
                                        marginBottom: '14px'
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            InputAdornmentProps={{ position: 'start' }}
                                            label='End Time'
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
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
                    />
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
                    />
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
                    />

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
                    />

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
                                        {prizeData.map((item: any) => {
                                            return (
                                                <TableRow key={item.id}>
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

                    <InputWithLabel
                        label='Total Pool Prizes'
                        name='poolPrize'
                        type='text'
                        form={form}
                        labelField='Prize Pool'
                        placeHolder='30.000'
                        isSelectType={false}
                        isMultiline={false}
                        rules={rules}
                    />
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
        </Box>
    );
};

export default AddClientTour;
