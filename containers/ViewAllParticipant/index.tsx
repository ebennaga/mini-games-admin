import { Box, ButtonBase, IconButton, Typography } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import InputSearch from 'components/Input/InputSearch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import TableViewAllParticipant from './TableViewAllParticipant';

const ViewAllParticipant = () => {
    const noTicket = [{ number: '3241 31234' }, { number: '254 31234' }, { number: '1a31 2432' }];
    const dummyTable = [
        { id: 1, avatar: '/icons/upload.png', username: 'Yan', userTicket: 3, noTicket },
        { id: 2, avatar: '/icons/upload.png', username: 'Yen', userTicket: 3, noTicket },
        { id: 3, avatar: '/icons/upload.png', username: 'Yin', userTicket: 3, noTicket },
        { id: 4, avatar: '/icons/upload.png', username: 'Yun', userTicket: 3, noTicket }
    ];

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            dataTable: dummyTable,
            idxAppears: { startIndex: 0, endIndex: 5 }
        }
    });

    const router = useRouter();

    // Event download excel
    const handleDownload = async () => {
        const header = ['Avatar', 'Username', 'User Ticket', 'Number Ticket']; // Header table
        let csvStr = `${header.join(',')}\n`;

        const data = form.watch('dataTable'); // Data table

        data.forEach((item: any) => {
            const { avatar, username, userTicket, noTicket: noTick } = item;
            let resNumbeTicket = '';
            noTick.forEach((no: any) => {
                resNumbeTicket += `${no.number},`;
            });
            csvStr += `${avatar},${username},${userTicket},[${resNumbeTicket}]\n`;
        });

        // Create dom for download result of csvStr to csv extention
        const hiddenElement = document.createElement('a');
        hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csvStr)}`;
        hiddenElement.target = '_blank';
        hiddenElement.download = 'player-account.csv';
        hiddenElement.click();
    };

    return (
        <Box>
            <HeaderChildren title='View All Participant' subTitle='Additional description if required'>
                <Box sx={{ mt: '16px' }}>
                    <Link href='/lucky-raffle'>
                        <Typography component='span' sx={{ fontSize: '16px', fontWeight: 400, color: '#A54CE5' }}>
                            Lucky Raffle
                        </Typography>
                    </Link>{' '}
                    /{' '}
                    <Link href={`${router.asPath}`}>
                        <Typography component='span' sx={{ fontSize: '16px', fontWeight: 400, color: 'rgba(0, 0, 0, 0.6)' }}>
                            Lucky Raffle Apa
                        </Typography>
                    </Link>{' '}
                    /{' '}
                    <Link href={`${router.asPath}`}>
                        <Typography component='span' sx={{ fontSize: '16px', fontWeight: 400 }}>
                            View All Participant
                        </Typography>
                    </Link>{' '}
                </Box>
                <Box sx={{ mt: '27px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <InputSearch placeholder='Search by name, email, etc.' name='search' label='Search' form={form} />
                        <IconButton sx={{ ml: '35px' }} onClick={() => alert('filter')}>
                            <FilterListIcon />
                        </IconButton>
                    </Box>
                    <ButtonBase
                        onClick={handleDownload}
                        sx={{
                            background: '#A54CE5',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#fff',
                            padding: '6px 16px',
                            borderRadius: '4px'
                        }}
                    >
                        <DownloadIcon sx={{ mr: '5px' }} />
                        DOWNLOAD EXCELL
                    </ButtonBase>
                </Box>
            </HeaderChildren>
            <Box sx={{ mt: '14px' }}>
                <TableViewAllParticipant form={form} name='dataTable' nameIdxAppears='idxAppears' />
            </Box>
        </Box>
    );
};

export default ViewAllParticipant;
