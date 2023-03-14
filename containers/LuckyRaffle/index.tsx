import { Box, ButtonBase, IconButton } from '@mui/material';
import HeaderChildren from 'components/HeaderChildren';
import InputSearch from 'components/Input/InputSearch';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FilterListIcon from '@mui/icons-material/FilterList';
import BadgeSelected from 'components/BadgeSelected';
import DialogConfirmation from 'components/Dialog/DialogConfirmation';
import PaginationCard from 'components/PaginationCard';
import { useRouter } from 'next/router';
import TableLuckyRaffle from './TableLuckyRaffle';
import DialogSetPrize from './DialogSetPrize';
import DialogViewResult from './DialogViewResult';

const LuckyRaffle = () => {
    const dummiesTable = [
        { id: 1, name: 'Lucky Raffle 2022', totalPool: 30000, ticket: 100, isActive: false },
        { id: 2, name: 'Holee 2022', totalPool: 30000, ticket: 300, isActive: true },
        { id: 13, name: 'Ari Lucky 2022', totalPool: 30000, ticket: 10, isActive: false },
        { id: 14, name: 'Lucky Raffle', totalPool: 30000, ticket: 1230, isActive: false }
    ];
    const dummyResult = [
        { id: 1, rank: 1, username: 'Siapa nih', prize: 'Yuppie Strawberry', ticket: '12343.23' },
        { id: 2, rank: 2, username: 'Leo Sadiwo', prize: 'Yoosan', ticket: '12343.23' },
        { id: 3, rank: 3, username: 'Keluarga Cemara', prize: '2000 Siantar top', ticket: '12343.23' },
        { id: 4, rank: 4, username: 'Ingus tuh', prize: 'Komo', ticket: '12343.23' }
    ];

    const form = useForm({
        mode: 'all',
        defaultValues: {
            search: '',
            dataTable: dummiesTable,
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

    const router = useRouter();

    const [isDialogRemove, setIsDialogRemove] = React.useState<boolean>(false);
    const [isDialogSetPrize, setIsDialogSetPrize] = React.useState<boolean>(false);
    const [isDialogViewResult, setIsDialogViewResult] = React.useState<boolean>(false);

    const [dataChecked, setDataChecked] = React.useState<Array<number>>([]);

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

    // Update data that has been checked in table field action
    React.useEffect(() => {
        const fillDataChecked = async () => {
            let idChecked: number[] = [];
            const fillIdChecked = dataTable.map(async (item: any) => {
                if (item.isAction) idChecked = [...idChecked, item.id];
            });
            await Promise.all(fillIdChecked);

            setDataChecked(idChecked);
        };
        fillDataChecked();
    }, [dataTable]);

    // Event for remove item
    const handleRemove = async () => {
        const loopRemove = dataChecked.map(async (item: any) => {
            console.log(`id of item that will be deleted: ${item}`);
        });
        await Promise.all(loopRemove);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <DialogConfirmation
                title='Are you sure remove this Raffle ?'
                subTitle={`${dataChecked.length} Selected`}
                handleConfirm={handleRemove}
                open={isDialogRemove}
                setOpen={(val: boolean) => setIsDialogRemove(val)}
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
                open={isDialogSetPrize}
                onClose={() => setIsDialogSetPrize(false)}
            />
            <DialogViewResult
                open={isDialogViewResult}
                onClose={useCallback(() => setIsDialogViewResult(false), [isDialogViewResult])}
                data={dummyResult}
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
                        onClick={() => router.push('/lucky-raffle/add-lucky-raffle')}
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
            {dataChecked.length > 0 && (
                <Box mt={5}>
                    <BadgeSelected
                        total={dataChecked.length}
                        onEdit={() => alert('edit')}
                        handleOpenDeleteDialog={() => setIsDialogRemove(true)}
                    />
                </Box>
            )}
            <Box sx={{ mt: '24px' }}>
                <TableLuckyRaffle
                    form={form}
                    name='dataTable'
                    nameIdxAppears='idxAppears'
                    onSetPrize={useCallback(() => setIsDialogSetPrize(true), [isDialogSetPrize])}
                    onViewParticipant={(itemId: any) => router.push(`lucky-raffle/${itemId}/participants`)}
                    onViewResult={useCallback(() => setIsDialogViewResult(true), [isDialogViewResult])}
                />
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
