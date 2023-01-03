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
        positionStart: 2,
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
    const [table, setTable] = React.useState('0');
    const [isLoading, setIsLoading] = React.useState(false);
    const [prizeData, setPrizeData] = React.useState<any>(dataTable);
    const [prizePool, setPrizePool] = React.useState(0);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const notify = useNotify();

    const { fetchAPI } = useAPICaller();
    const formTable = useForm({
        mode: 'all'
        // defaultValues: {
        //     tableData: [
        //         {
        //             positionStart: '',
        //             positionEnd: '',
        //             countPlayer: '',
        //             pointPrizes: '',
        //             playerPointPrizes: '',
        //             cointPrizes: '',
        //             playerCointPrizes: ''
        //         }
        //     ]
        // }
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

    const handleTable = (event: SelectChangeEvent) => {
        setTable(event.target.value as string);
    };

    // const fetchPrizesInfos = async () => {
    //     try {
    //         const result = await fetchAPI({
    //             endpoint: '/tournaments/prize-infos',
    //             method: 'GET'
    //         });
    //         if (result?.status === 200) {
    //             console.log(`hi ${result}`);
    //         }
    //     } catch (error: any) {
    //         console.log(error);
    //     }
    // };

    const handlePOSTSubmit = async (data: any) => {
        // console.log(data);
        // console.log(`checking${categoryList[parseInt(form.watch('category'), 10) - 1].label}`);
        // form.watch('name');
        // console.log('masuk');
        // console.log(`${form.watch('startDate')} ${form.watch('startTime')}`);
        setIsLoading(true);
        try {
            const fee = Number(data.fee);
            const imgBase64 = await convertBase64(data.image);
            const response = await fetchAPI({
                method: 'POST',
                endpoint: '/tournaments',
                data: {
                    game_id: data.games,
                    name: data.title,
                    start_time: `${data.startDate} ${data.startTime}`,
                    end_time: `${data.endDate} ${data.endTime}`,
                    entry_coin: fee,
                    tournament_image: imgBase64
                    // total_points: data.pool
                }
            });
            if (response?.status === 200) {
                // console.log(response);
                setIsLoading(false);
            }
        } catch (error: any) {
            notify(error.message, 'error');
            setIsLoading(false);
        }
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    const handleAddRow = () => {
        if (table === '0') {
            setPrizeData([
                ...prizeData,
                {
                    id: 4,
                    label: '',
                    data: [
                        {
                            id: 4,
                            positionStart: 5,
                            positionEnd: 5,
                            countPlayer: 5,
                            pointPrizes: 15000,
                            playerPointPrizes: 15000,
                            cointPrizes: 20000,
                            playerCointPrizes: 20000
                        }
                    ]
                }
            ]);
        } else {
            const filter = prizeData.map((item: any) => {
                if (item.id === table) {
                    item.data = [
                        ...item.data,
                        {
                            id: 4,
                            positionStart: 5,
                            positionEnd: 5,
                            countPlayer: 5,
                            pointPrizes: 15000,
                            playerPointPrizes: 15000,
                            cointPrizes: 20000,
                            playerCointPrizes: 20000
                        }
                    ];
                    return item;
                }
                return item;
            });
            setPrizeData(filter);
        }
    };

    const handleDeleteRow = () => {
        if (table === '0') {
            const removeThis = prizeData.pop();
            // console.log(removeThis);

            const filter = prizeData.map((item: any) => {
                if (item !== removeThis) {
                    // item.data.pop();
                    return item;
                }
                return item;
            });

            setPrizeData(filter);
        } else {
            const filter = prizeData.map((item: any) => {
                if (item.id === table) {
                    item.data.pop();
                    return item;
                }
                return item;
            });
            setPrizeData(filter);
        }
    };
    React.useEffect(() => {
        let ttl: number = 0;
        formTable.watch('tableData').forEach((item: any) => {
            // console.log(`ini ${item.pointPrizes}`);
            ttl += parseInt(item.pointPrizes, 10);
        });
        setPrizePool(ttl);
    }, [fieldArray, formTable.watch('tableData')]);

    React.useEffect(() => {
        let arrTemp: any[];

        if (table !== '0') {
            arrTemp = prizeData.filter((item: any) => {
                return item.id === parseInt(table, 10);
            });
        } else {
            arrTemp = prizeData;
        }

        formTable.reset();

        arrTemp.forEach((item: any, index: number) => {
            item.data.forEach((el: any, idx: number) => {
                fieldArray.append({
                    positionStart: el.positionStart,
                    positionEnd: el.positionEnd,
                    countPlayer: el.countPlayer,
                    pointPrizes: el.pointPrizes,
                    playerPointPrizes: el.playerPointPrizes,
                    cointPrizes: el.cointPrizes,
                    playerCointPrizes: el.playerCointPrizes
                });
            });
        });
    }, [table, prizeData]);
    return (
        <Box sx={{}}>
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
                                <FormControl fullWidth>
                                    <InputLabel sx={{ fontWeight: 'bold' }} id='demo-simple-select-label'>
                                        Copy Table
                                    </InputLabel>
                                    <Select
                                        sx={{ color: table === '0' ? 'rgba(0, 0, 0, 0.38)' : 'black' }}
                                        placeholder='Games'
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={table}
                                        label='Copy Table'
                                        onChange={handleTable}
                                    >
                                        <MenuItem value='0' disabled>
                                            Select Table
                                        </MenuItem>
                                        {dataTable.length > 0 &&
                                            dataTable.map((item: any) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container display='flex' alignItems='center' spacing={3} mb='37px'>
                            <Grid item xs={2} display='flex' alignItems='center' justifyContent='space-between' />
                            <Grid item xs={8}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <TableAddTournament valueTable={table} data={prizeData} formTable={formTable} fieldArray={fieldArray} />
                                    <Box
                                        sx={{
                                            mt: '20px',
                                            display: 'flex',
                                            width: '35%',
                                            gap: '15px',
                                            alignSelf: 'flex-end',
                                            fontWeight: 700
                                        }}
                                    >
                                        <ButtonBase
                                            onClick={handleDeleteRow}
                                            sx={{
                                                backgroundColor: 'white',
                                                padding: '20px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                color: '#A54CE5',
                                                borderRadius: '5px',
                                                border: '1px solid #A54CE5',
                                                gap: '10px'
                                            }}
                                        >
                                            <Remove />
                                            <Typography sx={{ fontWeight: 600 }}>DELETE</Typography>
                                        </ButtonBase>
                                        <ButtonBase
                                            onClick={handleAddRow}
                                            sx={{
                                                backgroundColor: '#A54CE5',
                                                padding: '20px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                color: 'white',
                                                borderRadius: '5px',
                                                gap: '10px'
                                            }}
                                        >
                                            <Add />
                                            <Typography sx={{ fontWeight: 600 }}>ADD</Typography>
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
                                        <TextField fullWidth label='Prize Pool' value={prizePool || 0} />
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
