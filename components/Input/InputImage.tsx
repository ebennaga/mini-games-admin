/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Box, ButtonBase, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface InputImageProps {
    name: string;
    form: any;
    label: string;
    secondaryLabel: string;
    placeholder: string;
    isLocation?: boolean;
    rules?: any;
    isLoading?: boolean;
    isImage?: boolean;
}

const InputImage: React.FC<InputImageProps> = ({
    name,
    form,
    label,
    secondaryLabel,
    placeholder,
    isLocation = false,
    rules,
    isLoading,
    isImage = true
}) => {
    const [errMessage, setErrMessage] = React.useState<string>('');
    const [isImg, setIsImg] = React.useState<boolean>(true);
    const {
        formState: { errors }
    } = form;

    const error = errors[name] || null;
    const errType = !form.watch(name) && error?.type;
    const errText = !form.watch(name) && errType === 'required' ? 'must be filled' : '';

    const valueInput: any = form.watch(name);
    // const valueSrc: any = form.watch('imageInput');
    const handleChange = (e: any) => {
        const file: any = e.target.files[0].size;
        const { type } = e.target.files[0];
        if (type.split('/')[0] !== 'image') {
            setIsImg(false);
        } else {
            setIsImg(true);
        }

        const sizeInKB = Math.ceil(file / 1024);
        if (type.split('/')[0] !== 'image') {
            setErrMessage('File must be an Image!');
        }
        if (sizeInKB > 3072) {
            setErrMessage('File image is to large! Image must be under 3072Kb!');
        } else {
            form.setValue(name, e.target.files[0]);
            setErrMessage('');
            const reader = new FileReader();
            if (type.split('/')[0] === 'image') {
                reader.onload = () => {
                    const output: any = document.getElementById(`preview${name}`);
                    // console.log(output);
                    output.src = reader.result;
                };
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleClear = () => form.setValue(name, '');
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
                            border: !isImg && isImage ? '1px dashed red' : '',
                            background: !isImg && isImage ? 'rgba(165, 76, 229, 0.1)' : '',
                            padding: '15px 10px'
                            // height: !isImg && isImage ? '270px' : ''
                        }}
                    >
                        <Grid container item xs={12} alignItems='center'>
                            <Grid item xs={10} display='flex' alignItems='center' justifyContent='space-between' gap='10px'>
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
                                <Box sx={{ display: !isImg && isImage ? 'flex' : '', alignItems: 'center', width: '100%' }}>
                                    <Typography
                                        component='p'
                                        fontSize='15px'
                                        sx={{ color: !isImg && isImage ? 'red' : 'rgba(0,0,0,0.8)', wordBreak: 'break-all' }}
                                    >
                                        {!isImg && isImage ? 'File must be an image ' : valueInput.name || valueInput}
                                    </Typography>
                                    <Typography component='p' fontSize='16px' sx={{ color: 'rgba(0,0,0,0.5)' }}>
                                        {!isImg && isImage
                                            ? ''
                                            : valueInput?.size && `${(valueInput?.size / 1024000).toFixed(3)}MB complete`}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: isImg && isImage ? ' ' : 'flex-end'
                                    // border: '1px solid red'
                                }}
                            >
                                <IconButton onClick={handleClear} sx={{ mr: '30px' }}>
                                    <ClearIcon />
                                </IconButton>
                                {isImg && isImage && (
                                    <CheckCircleIcon
                                        sx={{ color: '#A54CE5', fontSize: '30px', position: 'absolute', top: '-10px', right: '-10px' }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        {isImg && (
                            <>
                                {' '}
                                <Grid item xs={12}>
                                    <Typography
                                        component='p'
                                        sx={{ color: 'rgba(0,0,0,0.7)', fontSize: '14px', fontWeight: 'bold', my: 2 }}
                                    >
                                        Preview
                                    </Typography>
                                </Grid>
                                <img src={valueInput} id={`preview${name}`} alt='Game Cover' width='200px' height='auto' />
                            </>
                        )}
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
                                        accept={isImage ? 'image/*' : 'application/vnd.ms-excel'}
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

export default InputImage;
