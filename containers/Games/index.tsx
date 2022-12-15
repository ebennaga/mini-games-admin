import React from 'react';
import { Box, IconButton, ButtonBase } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useForm } from 'react-hook-form';
import InputSearch from 'components/Input/InputSearch';
import PaginationCard from 'components/PaginationCard';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import DialogSuccess from 'components/Dialog/DialogSuccess';
import { useRouter } from 'next/router';
import TitleCard from 'components/Layout/TitleCard';
import TableGames from './TableGames';
import DialogFilter from './DialogFilter';

const dummyData = [
    {
        id: 1,
        title: 'Hop Up',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 2,
        title: 'Rose Dart',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 3,
        title: 'Block Stack',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 4,
        title: 'Racing Fighter',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 5,
        title: 'Battle City',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 6,
        title: 'Contra',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 7,
        title: 'Hop Up',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 8,
        title: 'Rose Dart',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 9,
        title: 'Block Stack',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 10,
        title: 'Racing Fighter',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 11,
        title: 'Battle City',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    },
    {
        id: 12,
        title: 'Contra',
        game_url: 'https://minigames.prozaplay.io/hopup/',
        description: 'Let’s Go Play Hop up ',
        game_banner: 'https://prizeplay-minigames.s3.ap-southeast-3.amazonaws.com/thumbs/1/pp.png',
        genre: 'Arcade'
    }
];
const Games = () => {
    const dataSelect = [
        { id: 1, title: 'Arcade' },
        { id: 2, title: 'Adventure' },
        { id: 3, title: 'RPG' },
        { id: 4, title: 'Racing' }
    ];

    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [openDeleteDialog, setOpendDeleteDialog] = React.useState<boolean>(false);
    const [openDialogSuccess, setOpenDialogSuccess] = React.useState<boolean>(false);
    const [listTable, setListTable] = React.useState<any>([]);

    const router = useRouter();
    const [query, setQuery] = React.useState('');
    const form = useForm({
        mode: 'all',
        defaultValues: {
            dataTable: listTable,
            search: '',
            row: 5,
            page: 1,
            select: ''
        }
    });

    const handleEdit = (id: number) => {
        router.push(`/games/${id}`);
    };

    const handleOpenDeleteDialog = () => {
        setOpendDeleteDialog(true);
    };

    const handleRemoveGame = () => {
        setOpendDeleteDialog(false);
        setOpenDialogSuccess(true);
    };

    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(listTable.length / input.row);
        if (input.page < totalPage) {
            form.setValue('page', input.page + 1);
        }
    };

    const handlePrev = () => {
        const input = form.watch();
        if (input.page > 1) {
            form.setValue('page', input.page - 1);
        }
    };
    const handleDialog = (value: boolean) => {
        setOpenDialog(value);
    };
    const handleDataSearch = (keyword: any) => {
        setQuery(keyword);
    };

    React.useEffect(() => {
        setListTable(dummyData);
    }, []);

    React.useEffect(() => {
        console.log(listTable);
        console.log(form.watch('dataTable'));
    });
    React.useEffect(() => {
        // eslint-disable-next-line consistent-return, array-callback-return
        const temp = dummyData.filter((post: any) => {
            if (query === '') {
                return post;
            }
            if (
                post.genre.toString().toLowerCase().includes(query.toLowerCase()) ||
                post.title.toLowerCase().includes(query.toLowerCase())
            ) {
                return post;
            }
        });
        setListTable(temp);
        form.setValue('dataTable', temp);
    }, [query]);
    return (
        <Box>
            {/* <HeaderChildren title='Games' subTitle='Additional description if required'>
                <Box mt='27px' display='flex' alignItems='center' justifyContent='space-between'>
                    <Box display='flex' alignItems='center' gap='38px' position='relative'>
                        <Box>
                            <InputSearch form={form} name='search' label='Search' placeholder='Search by tittle, genre, etc.' />
                        </Box>
                        <IconButton onClick={() => setOpenDialog(!openDialog)}>
                            <FilterListIcon />
                        </IconButton>
                        <Box position='absolute' top='60px' left='320px'>
                            <DialogFilter
                                dataSelect={dataSelect}
                                nameSelect='select'
                                open={openDialog}
                                setOpen={setOpenDialog}
                                form={form}
                            />
                        </Box>
                    </Box>
                    <ButtonBase
                        onClick={() => router.push('/games/add-game')}
                        sx={{ padding: '6px 16px', color: '#fff', bgcolor: '#A54CE5', borderRadius: '4px', fontSize: '14px' }}
                    >
                        CREATE NEW
                    </ButtonBase>
                </Box>
            </HeaderChildren> */}
            <TitleCard
                handleSearch={(keyword: any) => handleDataSearch(keyword)}
                onConfirm={(value: boolean) => handleDialog(value)}
                title='Games'
                subtitle='Addtional description if required'
                isSearchExist
                placeholderSeacrhText='Search by tittle, genre, etc.'
                href='/games/add-game'
            />
            <Box position='absolute' top='60px' left='320px'>
                <DialogFilter dataSelect={dataSelect} nameSelect='select' open={openDialog} setOpen={setOpenDialog} form={form} />
            </Box>
            <Box>
                <TableGames
                    namePage='page'
                    nameRow='row'
                    name='dataTable'
                    form={form}
                    onEdit={(id: number) => handleEdit(id)}
                    handleOpenDeleteDialog={handleOpenDeleteDialog}
                />
                <PaginationCard
                    totalItem={listTable.length}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    form={form}
                    nameRow='row'
                    namePage='page'
                />
            </Box>
            <DialogConfirmation
                title='Are you sure remove this games?'
                subTitle={`${form.watch('dataTable').filter((item: any) => item.isAction).length} Selected`}
                handleConfirm={handleRemoveGame}
                open={openDeleteDialog}
                setOpen={setOpendDeleteDialog}
                textConfirmButton='REMOVE'
                textCancelButton='CANCEL'
            />
            <DialogSuccess title='Sucess Remove Account' open={openDialogSuccess} setOpen={setOpenDialogSuccess} />
        </Box>
    );
};

export default Games;
