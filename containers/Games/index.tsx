/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, IconButton, ButtonBase } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useForm } from 'react-hook-form';
import InputSearch from 'components/Input/InputSearch';
import PaginationCard from 'components/PaginationCard';
import TableGames from './TableGames';
import DialogFilter from './DialogFilter';

const Games = () => {
    const listTable = [
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
        }
    ];

    const dataSelect = [
        { id: 1, title: 'Arcade' },
        { id: 2, title: 'Adventure' },
        { id: 3, title: 'RPG' },
        { id: 4, title: 'Racing' }
    ];

    const [openDialog, setOpenDialog] = React.useState<boolean>(false);

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

    const handleEdit = () => {};
    const handleDelete = () => {};

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

    return (
        <Box>
            <HeaderChildren title='Games' subTitle='Additional description if required'>
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
                    <ButtonBase sx={{ padding: '6px 16px', color: '#fff', bgcolor: '#A54CE5', borderRadius: '4px', fontSize: '14px' }}>
                        CREATE NEW
                    </ButtonBase>
                </Box>
            </HeaderChildren>
            <Box>
                <TableGames namePage='page' nameRow='row' name='dataTable' form={form} onEdit={handleEdit} onDelete={handleDelete} />
                <PaginationCard
                    totalItem={listTable.length}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    form={form}
                    nameRow='row'
                    namePage='page'
                />
            </Box>
        </Box>
    );
};

export default Games;
