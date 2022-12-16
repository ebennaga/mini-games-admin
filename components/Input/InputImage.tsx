/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface InputImageProps {
    name: string;
    form: any;
    label: string;
    secondaryLabel: string;
    placeholder: string;
    isLocation?: boolean;
    rules?: any;
}

const InputImage: React.FC<InputImageProps> = ({ name, form, label, secondaryLabel, placeholder, isLocation = false, rules }) => {
    const [errMessage, setErrMessage] = React.useState<string>('');

    const {
        formState: { errors }
    } = form;

    const error = errors[name] || null;
    const errType = !form.watch(name) && error?.type;
    const errText = !form.watch(name) && errType === 'required' ? 'must be filled' : '';

    const valueInput = form.watch(name);
    const handleChange = (e: any) => {
        const file: any = e.target.files[0].size;
        const sizeInKB = Math.ceil(file / 1024);

        if (sizeInKB > 3072) {
            setErrMessage('File image is to large! Image must be under 3072Kb!');
        } else {
            form.setValue(name, e.target.files[0]);
            setErrMessage('');
        }
    };

    return (
        <Box>
            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={() => {
                    return (
                        <Box sx={{ bgcolor: errType || errMessage ? 'rgba(211, 47, 47, 0.04)' : '#fff' }}>
                            <input
                                accept='image/*, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
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
                <Typography component='h3' fontSize='16px' sx={{ my: '11px', color: '#A54CE5', '& span': { color: 'rgba(0,0,0,0.8)' } }}>
                    {label} <span>{secondaryLabel}</span>
                </Typography>
                <Typography component='p' fontSize='16px' sx={{ color: errMessage || errType ? 'red' : 'rgba(0,0,0,0.8)' }}>
                    {valueInput && !errMessage ? valueInput.name : errMessage || errText || placeholder}
                </Typography>
            </Box>
        </Box>
    );
};

export default InputImage;
