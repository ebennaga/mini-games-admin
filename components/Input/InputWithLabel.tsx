/* eslint-disable no-nested-ternary */
import { Box, Typography, TextField, IconButton, ButtonBase, MenuItem, InputAdornment, Skeleton } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface InputWithLabelProps {
    label?: string;
    labelField?: string;
    placeHolder?: string;
    form?: any;
    name: string;
    type?: 'text' | 'number' | 'password' | 'email' | 'tel';
    isSelectType?: boolean;
    rules?: any;
    component?: any;
    listSelect?: any;
    isMultiline?: boolean;
    placeholder?: any;
    foucused?: boolean;
    isRequired?: boolean;
    isLoading?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
    component,
    label = 'Email address',
    labelField,
    placeHolder,
    form,
    name,
    rules,
    type,
    isSelectType,
    listSelect,
    isMultiline,
    foucused,
    isRequired = false,
    isLoading
}) => {
    const {
        formState: { errors }
    } = form;
    const [showPwd, setShowPwd] = React.useState<boolean>(false);
    const error = errors[name] ? errors[name] : null;

    const errType: string = error?.type;

    let helperText: string = '';
    if (errType === 'maxLength') {
        helperText = `${label} exceed maximum length!`;
    } else if (errType === 'required') {
        helperText = `${label} is required!`;
    } else if (errType === 'minLength') {
        helperText = type === 'password' ? `Password minimum 6 characters` : `${label} exceed minimum length`;
    } else if (error?.message) {
        helperText = `${label} - ${error.message}`;
    } else {
        helperText = error;
    }
    React.useEffect(() => {
        console.log(form.watch('name'));
    });
    return (
        <Controller
            control={form.control}
            name={name}
            rules={rules}
            render={({ field }) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-between', px: '20px' }}>
                        <Box>
                            <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>{label}</Typography>
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
                        {isLoading ? (
                            <Skeleton sx={{ height: '90px', mt: '-20px', mb: '-20px' }} />
                        ) : (
                            <TextField
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: !error ? '1px solid rgba(0, 0, 0, 0.28) !important' : ''
                                    },
                                    '& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                        color: !error ? 'rgba(0, 0, 0, 0.6) !important' : 'red',
                                        fontWeight: 'bold'
                                    }
                                }}
                                focused={foucused}
                                error={!!errType}
                                helperText={helperText}
                                id='outlined-basic'
                                label={labelField}
                                select={isSelectType}
                                placeholder={placeHolder}
                                fullWidth
                                multiline={isMultiline}
                                rows={isMultiline ? 3 : 1}
                                variant='outlined'
                                type={type === 'password' ? (showPwd ? 'text' : 'password') : type === 'tel' ? 'number' : type}
                                {...field}
                                InputProps={{
                                    id: `input-${name}`,
                                    // disableUnderline: true,
                                    startAdornment:
                                        (type === 'tel' && (
                                            <Typography
                                                variant='subtitle1'
                                                component='span'
                                                fontWeight='bold'
                                                sx={{ paddingRight: 2, borderRight: '1px solid rgba(148, 148, 148, 0.2)' }}
                                            >
                                                +62
                                            </Typography>
                                        )) ||
                                        (labelField === 'Fee' && (
                                            <InputAdornment position='start'>
                                                <img src='/images/coin.png' alt='' />
                                            </InputAdornment>
                                        )),
                                    endAdornment:
                                        type === 'password' ? (
                                            <IconButton onClick={() => setShowPwd(!showPwd)}>
                                                {!showPwd ? (
                                                    <VisibilityIcon sx={{ color: '#A54CE5' }} />
                                                ) : (
                                                    <VisibilityOffIcon sx={{ color: '#A54CE5' }} />
                                                )}
                                            </IconButton>
                                        ) : (
                                            <ButtonBase>{component}</ButtonBase>
                                        )
                                }}
                                {...field}
                            >
                                {isSelectType ? (
                                    listSelect?.map((item: any) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <Box />
                                )}
                            </TextField>
                        )}
                    </Box>
                </Box>
            )}
        />
    );
};
export default InputWithLabel;
