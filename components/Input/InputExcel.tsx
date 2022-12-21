/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
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
    isLoading
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
    const handleChange = (e: any) => {
        const file: any = e.target.files[0]?.size;
        // console.log(e.target.files[0]);
        const type: any = e.target.files[0]?.type.split('/')[1];
        const sizeInKB = Math.ceil(file / 1024);

        if (type !== 'vnd.ms-excel') {
            setErrMessage('File must be an excel file');
        }
        if (sizeInKB > 5072) {
            setErrMessage('File is to large! Image must be under 5072Kb!');
        }
        form.setValue('excel', e.target.files[0]);
    };

    const handleClear = () => form.setValue(name, '');
    // console.log(valueInput.type?.split('/')[0]);
    console.log(error);
    return (
        <Box>
            {isLoading ? (
                <Skeleton sx={{ height: '370px', mt: '-90px', mb: '-70px' }} />
            ) : valueInput ? (
                <Box>
                    <Grid
                        container
                        sx={{
                            my: '10px',
                            border: '1px dashed rgba(0, 0, 0, 0.17)',
                            background: '',
                            padding: '15px'
                        }}
                    >
                        <Grid container item xs={12}>
                            <Grid item xs={8} display='flex' alignItems='top' gap='10px'>
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
                                {!errMessage && (
                                    <Box width='100%' sx={{ display: '', alignItems: 'center' }}>
                                        <Typography component='p' fontSize='16px' sx={{ color: 'rgba(0,0,0,0.8)' }}>
                                            {valueInput.name || valueInput}
                                        </Typography>
                                        <Typography component='p' fontSize='16px' sx={{ color: 'rgba(0,0,0,0.8)' }}>
                                            {valueInput?.size && `${(valueInput?.size / 1024000).toFixed(3)}MB complete`}
                                        </Typography>
                                    </Box>
                                )}
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
