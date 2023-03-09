import { Box, Dialog, IconButton, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PaginationCard from 'components/PaginationCard';
import { useForm } from 'react-hook-form';

interface dataIdxAppearsI {
    startIndex: number;
    endIndex: number;
}

interface DialogViewNoTicketProps {
    open: boolean;
    onClose: () => void;
    data: any[];
}

const DialogViewNoTicket: React.FC<DialogViewNoTicketProps> = ({ open, onClose, data }) => {
    const form = useForm({
        mode: 'all',
        defaultValues: {
            row: 5,
            page: 1
        }
    });
    const { row, page } = form.watch();

    const [idxAppears, setIdxAppears] = React.useState<dataIdxAppearsI>({ startIndex: 0, endIndex: 5 });

    // Event Next page
    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(data.length / input.row);
        if (input.page < totalPage) {
            form.setValue('page', input.page + 1);
        }
    };

    // Event Prev Page
    const handlePrev = () => {
        const input = form.watch();
        if (input.page > 1) {
            form.setValue('page', input.page - 1);
        }
    };

    // Update useForm idxAppears value, while doing pagination events
    React.useEffect(() => {
        const startIndex = page * row - row;
        const endIndex = startIndex + row - 1;
        const result = { startIndex, endIndex };
        setIdxAppears(result);
    }, [row, page]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='lg'
            sx={{
                '.MuiPaper-root': {
                    width: '40%',
                    padding: '20px 45px'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
                    padding: '16px'
                }}
            >
                <Box>
                    <Typography component='h3' sx={{ fontSize: '24px', fontWeight: 400, mb: '8px' }}>
                        Set Prize
                    </Typography>
                    <Typography component='h4' sx={{ fontSize: '14px', fontWeight: 400, color: '#949494' }}>
                        Set Prize Pool
                    </Typography>
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box>
                <TableContainer sx={{ overflow: 'unset', mt: '31.5px' }}>
                    <Table aria-label='table player account'>
                        <TableHead>
                            <TableRow
                                sx={{
                                    bgcolor: '#F0F0F0',
                                    borderTop: '1px solid rgba(0,0,0,0.2)',
                                    '& .MuiTableCell-root': { fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }
                                }}
                            >
                                <TableCell sx={{ borderLeft: '1px solid rgba(0,0,0,0.2)', width: '4%' }}>No.</TableCell>
                                <TableCell sx={{ width: '35%' }}>Raffle Name</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data?.map((item: any, index: number) => {
                                const { startIndex, endIndex } = idxAppears;
                                return (
                                    index >= startIndex &&
                                    index <= endIndex && (
                                        <TableRow
                                            sx={{
                                                '& .MuiTableCell-root': {
                                                    fontWeight: 400,
                                                    fontSize: '16px',
                                                    borderRight: '1px solid rgba(0,0,0,0.2)'
                                                }
                                            }}
                                        >
                                            <TableCell sx={{ borderLeft: '1px solid rgba(0,0,0,0.2)', width: '4%' }}>No.</TableCell>
                                            <TableCell sx={{ width: '35%' }}>{item?.number}</TableCell>
                                        </TableRow>
                                    )
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                <PaginationCard
                    totalItem={data.length}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    form={form}
                    nameRow='row'
                    namePage='page'
                />
            </Box>
        </Dialog>
    );
};

export default DialogViewNoTicket;
