import { Box, ButtonBase, IconButton } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import InputSearch from 'components/Input/InputSearch';
import React from 'react';
import { useForm } from 'react-hook-form';
import FilterListIcon from '@mui/icons-material/FilterList';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import PaginationCard from 'components/PaginationCard';
import TableLuckyRaffle from './TableLuckyRaffle';
import DialogSetPrize from './DialogSetPrize';

const LuckyRaffle = () => {
    const dummies = [
        { id: 1, name: 'Lucky Raffle 2022', totalPool: 30000, ticket: 100, isActive: false },
        { id: 2, name: 'Holee 2022', totalPool: 30000, ticket: 300, isActive: true },
        { id: 13, name: 'Ari Lucky 2022', totalPool: 30000, ticket: 10, isActive: false },
        { id: 14, name: 'Lucky Raffle', totalPool: 30000, ticket: 1230, isActive: false }
    ];

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            dataTable: dummies,
            row: 5,
            page: 1,
            idxAppears: { startIndex: 0, endIndex: 5 },
            prize1: '',
            prize2: '',
            prize3: '',
            prize4: '',
            qty1: '',
            qty2: '',
            qty3: '',
            qty4: ''
        }
    });
    const { dataTable, page, row } = form.watch();

    const [dialogRemove, setDialogRemove] = React.useState<boolean>(false);

    // Event Next page
    const handleNext = () => {
        const input = form.watch();
        const totalPage = Math.ceil(dataTable.length / input.row);
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
        form.setValue('idxAppears', result);
    }, [row, page]);

    return (
        <Box sx={{ width: '100%' }}>
            <DialogConfirmation
                title='Are you sure remove this Raffle ?'
                subTitle='2 Selected'
                handleConfirm={() => alert('Remove')}
                open={dialogRemove}
                setOpen={(val: boolean) => setDialogRemove(val)}
                textConfirmButton='REMOVE'
                textCancelButton='CANCEL'
            />
            <DialogSetPrize
                form={form}
                prize1='prize1'
                prize2='prize2'
                prize3='prize3'
                prize4='prize4'
                qty1='qty1'
                qty2='qty2'
                qty3='qty3'
                qty4='qty4'
            />
            <HeaderChildren title='Lucky Raffle' subTitle='Additional description if required'>
                <Box sx={{ mt: '27px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <InputSearch placeholder='Search by name, email, etc.' name='search' label='Search' form={form} />
                        <IconButton sx={{ ml: '35px' }} onClick={() => alert('filter')}>
                            <FilterListIcon />
                        </IconButton>
                    </Box>
                    <ButtonBase
                        sx={{
                            background: '#A54CE5',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#fff',
                            padding: '6px 16px',
                            borderRadius: '4px'
                        }}
                    >
                        ADD LUCKY RAFFLE
                    </ButtonBase>
                </Box>
            </HeaderChildren>
            <Box mt={5}>
                <BadgeSelected total={1} onEdit={() => alert('edit')} handleOpenDeleteDialog={() => setDialogRemove(true)} />
            </Box>
            <Box>
                <TableLuckyRaffle form={form} name='dataTable' nameIdxAppears='idxAppears' />
                <PaginationCard
                    totalItem={dataTable.length}
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

export default LuckyRaffle;
