import React from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Controller } from 'react-hook-form';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface InputUploadProps {
    label?: string;
    name: string;
    form: any;
    rules?: any;
    isRequired?: any;
}

const InputUpload: React.FC<InputUploadProps> = ({ label, name, form, rules = false, isRequired = false }) => {
    const [uploadedImage, setUploadedImage] = React.useState('');
    const [uploadedFile, setUploadedFile] = React.useState<File>();

    let labelSplited: any = null;
    if (label?.concat('(Optional)')) {
        labelSplited = label.split('-');
    }
    const {
        formState: { errors }
    } = form;

    const error = errors[name] ? errors[name] : null;

    const errType: string = error?.type;

    let helperText: string = '';
    if (errType === 'required') {
        helperText = `${label} must be filled!`;
    } else {
        helperText = error;
    }

    return (
        <Box sx={{ display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                <Box>
                    <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>
                        {labelSplited === null ? label : labelSplited[0]}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>
                        {labelSplited === null ? label : labelSplited[1]}
                    </Typography>
                    {isRequired && (
                        <Typography
                            sx={{
                                fontWeight: '400',
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontSize: '12px',
                                position: 'relative',
                                bottom: '-10px'
                            }}
                        >
                            *Field Required
                        </Typography>
                    )}
                </Box>
                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
            </Box>
            <Box sx={{ width: '70%' }}>
                {uploadedFile && uploadedImage && (
                    <Box sx={{ my: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'start' }}>
                            <img src='/icons/upload.png' alt='upload' />
                            <Box sx={{ mx: 2 }}>
                                <Typography sx={{ textOverflow: 'ellipsis', lineHeight: '1.5em', fontSize: '16px', fontWeight: 400 }}>
                                    {uploadedFile?.name.length! > 30
                                        ? `${uploadedFile?.name.slice(0, 15)}...${uploadedFile?.name.slice(30, uploadedFile?.name.length)}`
                                        : uploadedFile?.name}
                                </Typography>
                                <Typography sx={{ color: ' rgba(0, 0, 0, 0.6);', fontSize: '16px', my: 1 }}>
                                    {`${uploadedFile?.size} bytes • Complete`}{' '}
                                </Typography>
                            </Box>
                            <IconButton
                                sx={{ mx: 3 }}
                                onClick={() => {
                                    setUploadedFile(undefined);
                                    setUploadedImage('');
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <CheckCircleIcon sx={{ color: '#A54CE5' }} />
                        </Box>

                        <Box sx={{ my: 2 }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '16px', color: 'rgba(0, 0, 0, 0.6)' }}>Preview</Typography>
                            <img src={uploadedImage} alt={uploadedFile!.name} width={300} height={300} />
                        </Box>
                    </Box>
                )}
                {!uploadedFile && !uploadedImage && (
                    <Controller
                        rules={rules}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                            <Box>
                                <TextField
                                    error={!!errType}
                                    focused
                                    type='file'
                                    id='uploadImage'
                                    sx={{ opacity: 0, height: 0, width: 0 }}
                                    {...field}
                                    onChange={({ target }) => {
                                        const { files } = target as HTMLInputElement;
                                        if (files) {
                                            setUploadedImage(URL.createObjectURL(files[0]));
                                            setUploadedFile(files[0]);
                                        }
                                    }}
                                />
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor='uploadImage'>
                                    <Box
                                        sx={{
                                            cursor: 'pointer',
                                            width: 'fit-content'
                                        }}
                                    >
                                        <Box
                                            sx={
                                                !errType
                                                    ? { border: '1px dashed rgba(0, 0, 0, 0.12)', py: 3, px: 2, borderRadius: '4px' }
                                                    : {
                                                          border: '1px solid red',
                                                          py: 3,
                                                          px: 2,
                                                          borderRadius: '4px',
                                                          backgroundColor: 'rgba(211, 47, 47, 0.04);'
                                                      }
                                            }
                                        >
                                            <UploadFileIcon sx={!errType ? { color: '#A54CE5' } : { color: 'red' }} />
                                            <Box sx={{ display: 'flex', my: 1 }}>
                                                <Typography
                                                    sx={{ color: '#A54CE5', textDecorationLine: 'underline', pr: 1, fontSize: '16px' }}
                                                >
                                                    Click to upload
                                                </Typography>

                                                <Typography sx={{ color: 'black', fontWeight: 400, fontSize: '16px' }}>
                                                    {' '}
                                                    or drag and drop
                                                </Typography>
                                            </Box>
                                            <Typography
                                                sx={
                                                    !errType
                                                        ? { color: 'rgba(0, 0, 0, 0.6)', fontSize: '14px' }
                                                        : { color: 'red', fontSize: '14px' }
                                                }
                                            >
                                                {errType ? helperText : 'SVG, PNG, JPG or GIF (max. 3MB)'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </label>
                            </Box>
                        )}
                    />
                )}
            </Box>
        </Box>
    );
};

export default InputUpload;
