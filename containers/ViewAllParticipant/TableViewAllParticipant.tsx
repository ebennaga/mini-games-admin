import {
    Avatar,
    ButtonBase,
    Checkbox,
    FormControl,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import React, { memo, useCallback } from 'react';
import DialogViewNoTicket from './DialogViewNoTicket';

interface TableViewAllParticipantProps {
    form: any;
    name: string;
    nameIdxAppears: string;
}

const TableViewAllParticipant: React.FC<TableViewAllParticipantProps> = ({ form, name, nameIdxAppears }) => {
    const [isAllChecked, setIsAllChecked] = React.useState<boolean>(false);
    const [isDialogNoTicket, setIsDialogNoTicket] = React.useState<boolean>(false);

    const [dataTable, setDataTable] = React.useState<Array<any>>(form.watch(name));
    const [dataNoTicket, setDataNoTicket] = React.useState<Array<any>>([]);

    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        let resArr: any = [];
        if (isChecked) {
            dataTable.forEach((item: any) => {
                const resObj = { ...item, isAction: true };
                resArr = [...resArr, resObj];
            });
            setIsAllChecked(true);
        } else {
            dataTable.forEach((item: any) => {
                const resObj = { ...item, isAction: false };
                resArr = [...resArr, resObj];
            });
            setIsAllChecked(false);
        }
        setDataTable([...resArr]);
        form.setValue(name, [...resArr]);
    };

    const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
        const isChecked = e.target.checked;
        let newArr: any = [...dataTable];
        dataTable.forEach((item: any, index: number) => {
            if (item.id === data.id) {
                const filter = newArr.filter((itm: any) => itm.id !== data.id);
                if (isChecked) {
                    newArr = [...filter, { ...data, isAction: true }];
                } else {
                    newArr = [...filter, { ...data, isAction: false }];
                    setIsAllChecked(false);
                }
            }
            if (index === dataTable.length - 1) {
                newArr.sort((a: any, b: any) => a.id - b.id);
                setDataTable([...newArr]);
                form.setValue(name, [...newArr]);
            }
        });
    };

    // Update data table if form is changed
    React.useEffect(() => {
        setDataTable(form.watch(name));
    }, [form.watch(name)]);

    // Funck view no ticket
    const handleViewNoTicket = (data: any[]) => {
        setDataNoTicket(data);
        setIsDialogNoTicket(true);
    };

    return (
        <>
            <DialogViewNoTicket
                open={isDialogNoTicket}
                onClose={useCallback(() => setIsDialogNoTicket(false), [isDialogNoTicket])}
                data={dataNoTicket}
            />
            <TableContainer sx={{ overflow: 'unset' }}>
                <Table aria-label='table player account'>
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: '#F0F0F0',
                                borderTop: '1px solid rgba(0,0,0,0.2)',
                                '& .MuiTableCell-root': { fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)' }
                            }}
                        >
                            <TableCell sx={{ borderLeft: '1px solid rgba(0,0,0,0.2)', width: '5%' }}>No.</TableCell>
                            <TableCell sx={{ width: '15%' }}>Avatar</TableCell>
                            <TableCell sx={{ width: '45%' }}>Username</TableCell>
                            <TableCell sx={{ width: '15%' }}>User Ticket</TableCell>
                            <TableCell sx={{ width: '8%' }}>Number Ticket</TableCell>
                            {/* <TableCell sx={{ width: '8%' }}>Action</TableCell> */}
                            <TableCell
                                align='center'
                                sx={{ fontWeight: 600, fontSize: '16px', borderRight: '1px solid rgba(0,0,0,0.2)', width: '7%' }}
                            >
                                <FormControl
                                    sx={{ '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' } }}
                                >
                                    <FormControlLabel
                                        control={<Checkbox checked={!!isAllChecked} onChange={(e) => handleCheckAll(e)} />}
                                        label='Action'
                                        sx={{ '& .MuiTypography-root': { fontWeight: 600 } }}
                                    />
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {dataTable.map((item: any, index: number) => {
                            const idxAppears = form.watch(nameIdxAppears);
                            return (
                                index >= idxAppears.startIndex &&
                                index <= idxAppears.endIndex && (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '& .MuiTableCell-root': {
                                                fontWeight: 400,
                                                fontSize: '16px',
                                                borderRight: '1px solid rgba(0,0,0,0.2)'
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ borderLeft: '1px solid rgba(0,0,0,0.2)', width: '4%' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ width: '6%' }}>
                                            <Avatar src={item.avatar} alt='avatar' sx={{ width: '24px', height: 'auto', margin: 'auto' }} />
                                        </TableCell>
                                        <TableCell sx={{ width: '15%' }}>{item.username}</TableCell>
                                        <TableCell sx={{ width: '15%' }}>{item.userTicket}</TableCell>
                                        <TableCell sx={{ width: '7%' }}>
                                            <ButtonBase
                                                onClick={() => handleViewNoTicket(item.noTicket)}
                                                sx={{ color: '#A54CE5', borderBottom: '1px solid #A54CE5' }}
                                            >
                                                View No. Ticket
                                            </ButtonBase>
                                        </TableCell>
                                        <TableCell sx={{ width: '8%' }}>
                                            <FormControl
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': { color: '#A54CE5' }
                                                }}
                                            >
                                                <Checkbox checked={!!item.isAction} onChange={(e) => handleCheck(e, item)} />
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

export default memo(TableViewAllParticipant);
