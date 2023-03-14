import { Box, Dialog, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface DialogViewResultProps {
    open: boolean;
    onClose: () => void;
    data: any[];
}

const DialogViewResult: React.FC<DialogViewResultProps> = ({ open, onClose, data }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='lg'
            sx={{
                '.MuiPaper-root': {
                    width: '50%',
                    padding: '20px 45px',
                    paddingBottom: '55px'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                    padding: '18px 16px'
                }}
            >
                <Box>
                    <Typography component='h3' sx={{ fontSize: '24px', fontWeight: 400 }}>
                        View Result
                    </Typography>
                    <Typography component='h4' sx={{ fontSize: '14px', fontWeight: 400, color: '#949494' }}>
                        Leaderboard
                    </Typography>
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <TableContainer sx={{ mt: '32px' }}>
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: '#F0F0F0',
                                borderTop: '1px solid rgba(0,0,0,0.2)',
                                '& .MuiTableCell-root': { fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }
                            }}
                        >
                            <TableCell sx={{ borderLeft: '1px solid rgba(0,0,0,0.2)', width: '9%' }}>Rank</TableCell>
                            <TableCell sx={{ width: '28%' }}>Raffle Name</TableCell>
                            <TableCell sx={{ width: '28%' }}>Total Pool</TableCell>
                            <TableCell sx={{ width: '35%' }}>Ticket Price / Point</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ height: '89px' }}>
                        {data?.map((item: any) => {
                            return (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        '& .MuiTableCell-root': {
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            borderRight: '1px solid rgba(0,0,0,0.2)',
                                            textAlign: 'center'
                                        }
                                    }}
                                >
                                    <TableCell sx={{ borderLeft: '1px solid rgba(0,0,0,0.2)', width: '9%' }}>{item.rank}</TableCell>
                                    <TableCell sx={{ width: '28%' }}>{item.username}</TableCell>
                                    <TableCell sx={{ width: '28%' }}>{item.prize}</TableCell>
                                    <TableCell sx={{ width: '35%' }}>{item.ticket}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    );
};

export default memo(DialogViewResult);
