/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Grid, ButtonBase, TextField } from '@mui/material';
import InputDate from 'components/Input/InputDate';
import { SelectChangeEvent } from '@mui/material/Select';
import InputImage from 'components/Input/InputImage';
import Input from 'components/Input/Input';
import { Remove, Add } from '@mui/icons-material';
import CustomButton from 'components/Button';
import useNotify from 'hooks/useNotify';
import InputPrizingTable from 'components/Input/InputPrizingTable';
import useAPICaller from 'hooks/useAPICaller';
import InputSelect from 'components/Input/InputSelect';
import convertBase64 from 'helpers/convertBase64';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import dataTable from './dataSelect';
import TableAddTournament from './Table';

interface CreateTournamentProps {
    form: any;
    setCreateTour: any;
    createTour: any;
}

const dummyData = [
    {
        id: 0,
        positionStart: 3,
        positionEnd: 4,
        countPlayer: 2,
        pointPrizes: 15000,
        playerPointPrizes: 15000,
        cointPrizes: 20000,
        playerCointPrizes: 20001
    },
    {
        id: 1,
        positionStart: 2,
        positionEnd: 4,
        countPlayer: 2,
        pointPrizes: 15000,
        playerPointPrizes: 15000,
        cointPrizes: 20000,
        playerCointPrizes: 20000
    },
    {
        id: 2,
        positionStart: 2,
        positionEnd: 4,
        countPlayer: 2,
        pointPrizes: 15000,
        playerPointPrizes: 15000,
        cointPrizes: 20000,
        playerCointPrizes: 20000
    },
    {
        id: 3,
        positionStart: 2,
        positionEnd: 4,
        countPlayer: 2,
        pointPrizes: 15000,
        playerPointPrizes: 15000,
        cointPrizes: 20000,
        playerCointPrizes: 20001
    }
];
const CreateTournament: React.FC<CreateTournamentProps> = ({ setCreateTour, createTour, form }) => {
    const [game, setGame] = React.useState('0');
    const [table, setTable] = React.useState<any>([]);
    const [value, setValue] = React.useState('0');
    const [defaultTable, setDefaultTable] = React.useState<Array<any>>([]);
    const [tournaments, setTournaments] = React.useState<any>([]);
    const [selectTournament, setSelectTournament] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [prizeData, setPrizeData] = React.useState<any>([]);
    const [prizePool, setPrizePool] = React.useState('');
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const notify = useNotify();

    const { fetchAPI } = useAPICaller();
    const router = useRouter();
    const formTable = useForm({
        mode: 'all',
        defaultValues: {
            title: '',
            image: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            games: '',
            tornamentType: '',
            fee: '',
            tableData: [
                {
                    // positionStart: '',
                    // positionEnd: '',
                    // countPlayer: '',
                    // pointPrizes: '',
                    // playerPointPrizes: '',
                    // cointPrizes: '',
                    // playerCointPrizes: ''
                    max_pos: '',
                    point: '',
                    coin: ''
                }
            ]
        }
    });

    const fieldArray = useFieldArray({
        control: formTable.control,
        name: 'tableData'
    });

    const dataType = [
        { id: 1, title: 'Accumulation' },
        { id: 2, title: 'High Score' }
    ];
    const dataGames = [
        { id: 1, title: 'Hop Up' },
        { id: 2, title: 'Tower Stack' },
        { id: 3, title: 'Rose Dart' }
    ];
    const handleFiter = (event: SelectChangeEvent) => {
        setGame(event.target.value as string);
    };

    const handleTable = (event: any) => {
        // const isDuplicate: any = tournaments.includes(event.target.value);
        // form.setValue('tournament', event.target.value);
        // if (!isDuplicate) {
        //     const dataTournament = selectTournament.filter((item: any) => event.target.value === item.id);
        //     setTable([...tournaments, ...dataTournament]);
        // }
        setValue(event.target.value as string);
        setTable([]);
    };
    // console.log(fieldArray);
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
            setPrizePool('0');
        }
    }, [table]);

    const handlePOSTSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const fee = Number(data.fee);
            const imgBase64 = await convertBase64(data.image);

            const res = formTable.watch('tableData').map((item: any) => {
                const { positionStart, pointPrizes, cointPrizes } = item;
                return { max_pos: Number(positionStart), point: Number(pointPrizes), coin: Number(cointPrizes) };
            });

            const body = {
                game_id: data.games,
                name: data.title,
                tournament_image: imgBase64,
                start_time: `${data.startDate} ${data.startTime}`,
                end_time: `${data.endDate} ${data.endTime}`,
                entry_coin: data.fee,
                prize_infos: table
            };

            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/tournaments',
                data: body
            });

            if (response?.status === 200) {
                setIsLoading(false);
                notify('Create tournament success!');
                router.push('/tournament');
            } else {
                notify(response.data.message, 'error');
            }
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
    };

    // const MenuProps = {
    //     PaperProps: {
    //         style: {
    //             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    //             width: 250
    //         }
    //     }
    // };

    const handleAddRow = () => {
        let tempTable: any = [];
        const formValue: any = [...formTable.watch('tableData')];
        if (formTable.watch('tableData')[0].max_pos && formTable.watch('tableData')[0].point && formTable.watch('tableData')[0].coin) {
            tempTable = [...table, ...formValue];
            setTable(tempTable);
            formTable.reset();
        }
    };

    const handleDeleteRow = () => {
        if (table.length > 0) {
            const deleting = table.slice(0, table.length - 1);
            setTable(deleting);
        }
    };

    // console.log({ tableindex0: formTable.watch('tableData')[0] });
    // const handleAddRow = () => {
    // if (Array.isArray(table)) {
    //     setDefaultTable([...defaultTable, { positionStart: '', pointPrizes: '', cointPrizes: '' }]);
    // } else if (table === '0') {
    //     setPrizeData([
    //         ...prizeData,
    //         {
    //             positionStart: 1,
    //             pointPrizes: 1,
    //             cointPrizes: 1
    //         }
    //     ]);
    // } else {
    //     const filter = prizeData.map((item: any) => {
    //         if (item.id === table) {
    //             item.prize_infos = [
    //                 ...item.prize_infos,
    //                 {
    //                     positionStart: item.max_pos,
    //                     // positionEnd: 5,
    //                     // countPlayer: 5,
    //                     pointPrizes: item.point,
    //                     // playerPointPrizes: 15000,
    //                     cointPrizes: item.coin
    //                     // playerCointPrizes: 20000
    //                 }
    //             ];
    //             return item;
    //         }
    //         return item;
    //     });
    //     setPrizeData(filter);
    // }
    // };

    // const handleDeleteRow = () => {
    //     if (Array.isArray(table) && defaultTable.length > 1) {
    //         const result = defaultTable.filter((_item: any, index: number) => index !== defaultTable.length - 1);
    //         setDefaultTable(result);
    //     } else if (table === '0') {
    //         const removeThis = prizeData.pop();
    //         // console.log(removeThis);

    //         const filter = prizeData.map((item: any) => {
    //             if (item !== removeThis) {
    //                 // item.data.pop();
    //                 return item;
    //             }
    //             return item;
    //         });

    //         setPrizeData(filter);
    //     } else {
    //         const filter = prizeData.map((item: any) => {
    //             if (item.id === table) {
    //                 item.prize_infos.pop();
    //                 return item;
    //             }
    //             return item;
    //         });
    //         setPrizeData(filter);
    //     }
    // };

    // React.useEffect(() => {
    //     let ttl: number = 0;
    //     formTable.watch('tableData').forEach((item: any) => {
    //         // console.log(`ini ${item.pointPrizes}`);
    //         ttl += parseInt(item.pointPrizes, 10);
    //     });
    //     setPrizePool(ttl);
    // }, [fieldArray, formTable.watch('tableData')]);

    // React.useEffect(() => {
    //     let arrTemp: any[];

    //     if (table !== '0') {
    //         arrTemp = prizeData.filter((item: any) => {
    //             return item.id === table;
    //         });
    //     } else {
    //         arrTemp = prizeData;
    //     }

    //     formTable.reset();

    //     arrTemp.forEach((item: any, index: number) => {
    //         if (item.prize_infos) {
    //             item.prize_infos.forEach((el: any, idx: number) => {
    //                 fieldArray.append({
    //                     positionStart: el.max_pos,
    //                     positionEnd: el.positionEnd,
    //                     countPlayer: el.countPlayer,
    //                     pointPrizes: el.point,
    //                     playerPointPrizes: el.playerPointPrizes,
    //                     cointPrizes: el.coin,
    //                     playerCointPrizes: el.playerCointPrizes
    //                 });
    //             });
    //         }
    //     });
    // }, [table, prizeData]);

    // React.useEffect(() => {
    //     formTable.reset();
    //     if (Array.isArray(table)) {
    //         defaultTable.forEach((item) => {
    //             const { positionStart, pointPrizes, cointPrizes } = item;
    //             fieldArray.append({
    //                 positionStart: String(positionStart),
    //                 pointPrizes: String(pointPrizes),
    //                 cointPrizes: String(cointPrizes),
    //                 positionEnd: '',
    //                 countPlayer: '',
    //                 playerCointPrizes: '',
    //                 playerPointPrizes: ''
    //             });
    //         });
    //     }
    // }, [defaultTable]);

    // console.log(table);
    return (
        <Box
            sx={{
                '& .MuiPaper-root MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiPaper-root MuiMenu-paper.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper':
                    { maxHeight: '225px !important' }
            }}
        >
            <Box sx={{ padding: '40px 25px' }}>
                <Paper sx={{ width: '100%', height: '85px', borderRadius: '4px', padding: '16px', position: 'relative' }}>
                    <Typography sx={{ fontSize: '24px', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 400 }}>Create Tournament</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                        Additional description if required
                    </Typography>
                </Paper>
                <form onSubmit={form.handleSubmit(handlePOSTSubmit)}>
                    <Grid container mt='37px' color='rgba(0, 0, 0, 0.6)'>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Tournament Title
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
                            </Grid>
                            <Grid item xs={3}>
                                <Input
                                    isColor
                                    name='title'
                                    label='Title'
                                    rules={{ required: true }}
                                    placeholder='Max 100 Character'
                                    form={form}
                                />
                            </Grid>
                        </Grid>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Tournament Image
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
                            </Grid>
                            <Grid item xs={3}>
                                <InputImage
                                    isImage
                                    name='image'
                                    form={form}
                                    label='Click to upload'
                                    rules={{ required: true }}
                                    secondaryLabel='or drag and drop'
                                    placeholder='SVG, PNG, JPG or GIF (max. 3MB)'
                                />
                            </Grid>
                        </Grid>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Duration
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

                                {/* <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                    :
                                </Typography> */}
                            </Grid>

                            <Grid item xs={3}>
                                <InputDate
                                    isCreate
                                    rules={{ required: true }}
                                    form={form}
                                    name='startDate'
                                    label='Start Date'
                                    type='date'
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputDate isCreate rules={{ required: true }} form={form} name='endDate' label='End Date' type='date' />
                            </Grid>
                        </Grid>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between' />
                            <Grid item xs={3}>
                                <InputDate
                                    isCreate
                                    rules={{ required: true }}
                                    form={form}
                                    name='startTime'
                                    label='Start Time'
                                    type='time'
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputDate isCreate rules={{ required: true }} form={form} name='endTime' label='End Time' type='time' />
                            </Grid>
                        </Grid>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Games
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
                            </Grid>
                            <Grid item xs={3}>
                                <InputSelect
                                    form={form}
                                    name='games'
                                    dataSelect={dataGames}
                                    title='Games'
                                    placeholder='Select Type'
                                    rules={{ required: true }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Tournament Type
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
                            </Grid>
                            <Grid item xs={3}>
                                <InputSelect
                                    form={form}
                                    name='tournamentType'
                                    dataSelect={dataType}
                                    title='Genre'
                                    placeholder='Select Type'
                                    rules={{ required: true }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Tournament Fee
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
                            </Grid>
                            <Grid item xs={3}>
                                <Input
                                    isColor
                                    rules={{ required: true }}
                                    isCoin
                                    name='fee'
                                    label='Fee'
                                    placeholder='Min Amount 20'
                                    form={form}
                                    type='number'
                                />
                            </Grid>
                        </Grid>

                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between'>
                                <Box sx={{ mr: '70%' }}>
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
                            </Grid>
                            <Grid item xs={3}>
                                {/* <InputPrizingTable
                                    form={form}
                                    name='tournamentType'
                                    dataSelect={dataTable}
                                    title='Prizing Table'
                                    placeholder='Select Type'
                                    rules={{ required: true }}
                                /> */}
                                <Box sx={{}}>
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
                                            {/* {dataTable.length > 0 &&
                                            dataTable.map((item: any) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.label}
                                                </MenuItem>
                                            ))} */}
                                            {selectTournament.map((item: any, index: any) => {
                                                return (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between' />
                            <Grid item xs={3}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <TableAddTournament
                                        table={table}
                                        setTable={setTable}
                                        valueTable={value}
                                        data={prizeData}
                                        formTable={formTable}
                                        fieldArray={fieldArray}
                                    />
                                    <Box
                                        sx={{
                                            my: '20px',
                                            display: 'flex',
                                            // width: '35%',
                                            gap: '15px',
                                            alignSelf: 'flex-end',
                                            fontWeight: 700
                                        }}
                                    >
                                        <ButtonBase
                                            onClick={handleDeleteRow}
                                            sx={{
                                                height: '50px',
                                                backgroundColor: 'white',
                                                paddingX: '10px',
                                                width: '100px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                color: '#A54CE5',
                                                borderRadius: '5px',
                                                border: '1px solid #A54CE5',
                                                gap: '10px'
                                            }}
                                        >
                                            <Remove />
                                            <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>DELETE</Typography>
                                        </ButtonBase>
                                        <ButtonBase
                                            onClick={handleAddRow}
                                            sx={{
                                                height: '50px',
                                                backgroundColor: '#A54CE5',
                                                width: '100px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                color: 'white',
                                                borderRadius: '5px',
                                                gap: '10px'
                                            }}
                                        >
                                            <Add />
                                            <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>ADD</Typography>
                                        </ButtonBase>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                                <Grid item xs={3} display='flex' alignItems='center' justifyContent='space-between'>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        Total Pool Prizes
                                    </Typography>
                                    <Typography component='h3' fontSize='15px' fontWeight='bold' color='rgba(0, 0, 0, 0.6)'>
                                        :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box sx={{ width: '100%' }}>
                                        <TextField type='number' disabled fullWidth label='Prize Pool' value={prizePool || 0} />
                                    </Box>
                                    {/* <Input isColor name='pool' label='Prize Pool' rules={{ required: true }} form={form} placeholder='30000' /> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center',
                            mt: '100px',
                            padding: '40px',
                            width: '100%'
                        }}
                    >
                        <CustomButton type='submit' />
                        {/* <CustomButton type='submit' padding='10px' width='193px' height='59px' title='Submit' backgroundColor='#A54CE5' /> */}
                        <CustomButton
                            onClick={() => {
                                setCreateTour(!createTour);
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

export default CreateTournament;
