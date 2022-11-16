import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import BadgeSelected from 'components/BadgeSelected';

interface TableGamesProps {
    name: string;
    form: any;
    onEdit: any;
    handleOpenDeleteDialog: any;
    nameRow: string;
    namePage: string;
}

const TableGames: React.FC<TableGamesProps> = ({ name, nameRow, namePage, form, handleOpenDeleteDialog, onEdit }) => {
    const [dataTable, setDataTable] = React.useState<Array<any>>([...form.watch(name)]);
    const [totalChecked, setTotalChecked] = React.useState<number>(0);
    const [isAllChecked, setIsAllChecked] = React.useState<boolean>(false);
    const [showTable, setShowTable] = React.useState<any>({ startIndex: null, endIndex: null });

    const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
        const isChecked = e.target.checked;

        let newArr: any = [...dataTable];
        dataTable.forEach((item: any, index: number) => {
            if (item.id === data.id) {
                const filter = newArr.filter((itm: any) => itm.id !== data.id);
                if (isChecked) {
                    newArr = [...filter, { ...data, isAction: true }];
                    setTotalChecked(totalChecked + 1);
                } else {
                    newArr = [...filter, { ...data, isAction: false }];
                    setIsAllChecked(false);
                    if (totalChecked) setTotalChecked(totalChecked - 1);
                }
            }

            if (index === dataTable.length - 1) {
                newArr.sort((a: any, b: any) => a.id - b.id);
                setDataTable([...newArr]);
                form.setValue(name, [...newArr]);
            }
        });
    };

    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        let resArr: any = [];
        if (isChecked) {
            dataTable.forEach((item: any) => {
                const resObj = { ...item, isAction: true };
                resArr = [...resArr, resObj];
            });
            setIsAllChecked(true);
            setTotalChecked(dataTable.length);
        } else {
            dataTable.forEach((item: any) => {
                const resObj = { ...item, isAction: false };
                resArr = [...resArr, resObj];
            });
            setIsAllChecked(false);
            setTotalChecked(0);
        }
        setDataTable([...resArr]);
        form.setValue(name, [...resArr]);
    };

    React.useEffect(() => {
        const page = form.watch(namePage);
        const row = form.watch(nameRow);
        const first = page * row - row;
        const last = first + row - 1;
        setShowTable({ startIndex: first, endIndex: last });
    }, [form.watch(nameRow), form.watch(namePage)]);

    return (
        <>
            {totalChecked ? (
                <BadgeSelected
                    total={totalChecked}
                    onEdit={totalChecked === 1 ? onEdit : false}
                    handleOpenDeleteDialog={handleOpenDeleteDialog}
                />
            ) : null}
            <TableContainer sx={{ mt: totalChecked ? 0 : '24px' }}>
                <Table aria-label='Table Games'>
                    <TableHead sx={{ borderTop: '1px solid rgba(0,0,0,0.2)' }}>
                        <TableRow sx={{ background: '#F0F0F0' }}>
                            <TableCell
                                align='center'
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    borderRight: '1px solid rgba(0,0,0,0.2)',
                                    borderLeft: '1px solid rgba(0,0,0,0.2)',
                                    width: '5%'
                                }}
                            >
                                No.
                            </TableCell>
                            <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '15.5%' }}>
                                Game Title
                            </TableCell>
                            <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '18.5%' }}>
                                Game Url
                            </TableCell>
                            <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '15.5%' }}>
                                Short Description
                            </TableCell>
                            <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '15.5%' }}>
                                Game Cover
                            </TableCell>
                            <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '15.5%' }}>
                                Genre
                            </TableCell>
                            <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '10%' }}>
                                <FormControl
                                    sx={{ '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' } }}
                                >
                                    <FormControlLabel
                                        control={<Checkbox checked={!!isAllChecked} onChange={(e) => handleCheckAll(e)} />}
                                        label='Action'
                                    />
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((item: any, index: number) => {
                            return (
                                index >= showTable.startIndex &&
                                index <= showTable.endIndex && (
                                    <TableRow key={index}>
                                        <TableCell
                                            align='center'
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: '16px',
                                                borderRight: '1px solid rgba(0,0,0,0.2)',
                                                borderLeft: '1px solid rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            {index + 1}.
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }}>
                                            {item.title}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }}>
                                            {item.game_url}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }}>
                                            {item.description}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }}>
                                            {item.game_banner}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }}>
                                            {item.genre}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 400, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }}>
                                            <FormControl
                                                sx={{
                                                    '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' }
                                                }}
                                            >
                                                <Checkbox
                                                    checked={!!item.isAction}
                                                    // defaultChecked={item.isAction}
                                                    onChange={(e) => handleCheck(e, item)}
                                                />
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                )
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TableGames;
