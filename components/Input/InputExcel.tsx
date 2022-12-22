/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as XLSX from 'xlsx';
import { Box, ButtonBase, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { Cancel } from '@mui/icons-material';

interface InputExcelProps {
    name: string;
    form: any;
    label: string;
    secondaryLabel: string;
    placeholder: string;
    isLocation?: boolean;
    rules?: any;
    isLoading?: boolean;
    setRemove: any;
    // isImage?: boolean;
}

const InputExcel: React.FC<InputExcelProps> = ({
    name,
    form,
    label,
    secondaryLabel,
    placeholder,
    isLocation = false,
    rules,
    isLoading,
    setRemove
    // isImage = false
}) => {
    const [errMessage, setErrMessage] = React.useState<string>('');
    // const [isImg, setIsImg] = React.useState<boolean>(false);
    const {
        formState: { errors }
    } = form;

    const error = errors[name] || null;
    const errType = !form.watch(name) && error?.type;
    const errText = !form.watch(name) && errType === 'required' ? 'must be filled' : '';

    const valueInput: any = form.watch(name);
    const types: any = valueInput?.type?.split('/')[1];
    const size = valueInput?.size;
    const sizeExcelInKb = Math.ceil(size / 1024);
    const handleChange = (e: any) => {
        const file: any = e.target.files[0]?.size;
        const sizeInKB = Math.ceil(file / 1024);
        if (sizeInKB > 3072) {
            form.setValue(name, '');
            return setErrMessage('File is to large! Image must be under 3072Kb!');
        }
        if (types === 'vnd.ms-excel' || types === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            form.setValue(name, e.target.files[0]);
            setErrMessage('');
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const data: any = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);
                setRemove(json);
            };
            reader.readAsBinaryString(e.target.files[0]);
        }
        form.setValue('excel', e.target.files[0]);
    };

    const handleClear = () => {
        form.setValue(name, '');
        setErrMessage('');
    };
    // console.log(sizeExcelInKb >= 3072);
    // console.log(errMessage);
    return (
        <Box>
            {isLoading ? (
                <Skeleton sx={{ height: '370px', mt: '-90px', mb: '-70px' }} />
            ) : valueInput && sizeExcelInKb <= 3072 ? (
                <Box>
                    <Grid
                        container
                        sx={{
                            width: '340px',
                            my: '10px',
                            border:
                                (types === 'vnd.ms-excel' || types === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') &&
                                sizeExcelInKb <= 3072
                                    ? '1px dashed rgba(0, 0, 0, 0.17)'
                                    : '1px dashed red',
                            background:
                                (types === 'vnd.ms-excel' || types === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') &&
                                sizeExcelInKb <= 3072
                                    ? ''
                                    : 'rgba(211, 47, 47, 0.04)',
                            padding: '15px'
                        }}
                    >
                        <Grid container item xs={12} sx={{}}>
                            <Grid
                                item
                                xs={8}
                                display='flex'
                                alignItems={
                                    (types === 'vnd.ms-excel' || types === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') &&
                                    sizeExcelInKb <= 3072
                                        ? 'top'
                                        : 'center'
                                }
                                gap='10px'
                            >
                                <Box
                                    width='41px'
                                    height='41px'
                                    borderRadius='900px'
                                    sx={{
                                        background: '',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <UploadFileIcon sx={{ color: '#A54CE5' }} />
                                </Box>
                                <Box width='100%' sx={{ display: '', alignItems: 'center' }}>
                                    <Typography
                                        component='p'
                                        fontSize={
                                            types === 'vnd.ms-excel' || types === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                                ? '16px'
                                                : '14px'
                                        }
                                        sx={{
                                            color:
                                                types === 'vnd.ms-excel' ||
                                                types === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                                    ? 'rgba(0,0,0,0.8)'
                                                    : 'red'
                                        }}
                                    >
                                        {types === 'vnd.ms-excel' || types === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                            ? valueInput.name || valueInput
                                            : 'File must be an excel file'}
                                    </Typography>
                                    {(types === 'vnd.ms-excel' || types === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') && (
                                        <Typography component='p' fontSize='14px' sx={{ color: 'rgba(0,0,0,0.8)' }}>
                                            {valueInput?.size && `${(valueInput?.size / 1024000).toFixed(3)}MB complete`}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={4} sx={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton onClick={handleClear} sx={{ mr: '30px' }}>
                                    <ClearIcon />
                                </IconButton>
                                {/* {isImage ? (
                                    <Cancel sx={{ color: 'red', fontSize: '30px', position: 'absolute', top: '-10px', right: '-10px' }} />
                                ) : (
                                    <CheckCircleIcon
                                        sx={{ color: '#A54CE5', fontSize: '30px', position: 'absolute', top: '-10px', right: '-10px' }}
                                    />
                                )} */}
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* {!isImg && isImage && <Typography sx={{ textAlign: 'center', color: 'red' }}>File must be an image!</Typography>} */}
                </Box>
            ) : (
                <>
                    <Controller
                        name={name}
                        control={form.control}
                        rules={rules}
                        render={() => {
                            return (
                                <Box sx={{ bgcolor: errType || errMessage ? 'rgba(211, 47, 47, 0.04)' : '#fff' }}>
                                    <input
                                        accept='application/*'
                                        style={{ display: 'none' }}
                                        id='raised-button-file'
                                        multiple
                                        type='file'
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <label htmlFor='raised-button-file'>
                                        <ButtonBase
                                            component='span'
                                            sx={{
                                                border: errType || errMessage ? '1px solid #D32F2F' : '1px dashed rgba(0, 0, 0, 0.12)',
                                                width: '100%',
                                                height: '200px',
                                                opacity: 0
                                            }}
                                        >
                                            Upload
                                        </ButtonBase>
                                    </label>
                                </Box>
                            );
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: isLocation ? 'center' : '',
                            alignItems: isLocation ? 'center' : '',
                            flexDirection: 'column',
                            border: errType || errMessage ? '1px solid #D32F2F' : '1px dashed rgba(0, 0, 0, 0.12)',
                            width: '100%',
                            height: '200px',
                            mt: '-200px',
                            padding: '24px 16px'
                        }}
                    >
                        <Box
                            width='41px'
                            height='41px'
                            borderRadius='900px'
                            sx={{
                                background: 'rgba(165, 76, 229, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <UploadFileIcon sx={{ color: '#A54CE5' }} />
                        </Box>
                        <Typography
                            component='h3'
                            fontSize='16px'
                            sx={{ my: '11px', color: '#A54CE5', '& span': { color: 'rgba(0,0,0,0.8)' } }}
                        >
                            {label} <span>{secondaryLabel}</span>
                        </Typography>
                        <Typography component='p' fontSize='16px' sx={{ color: errMessage || errType ? 'red' : 'rgba(0,0,0,0.8)' }}>
                            {valueInput && !errMessage ? valueInput.name || valueInput : errMessage || errText || placeholder}
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default InputExcel;
