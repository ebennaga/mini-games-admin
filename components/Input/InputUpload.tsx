import React from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';

interface InputUploadProps {
    label?: string;
}

const InputUpload: React.FC<InputUploadProps> = ({ label }) => {
    let labelSplited: any = null;
    if (label?.concat('(Optional)')) {
        labelSplited = label.split('-');
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
                </Box>
                <Typography sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.6)' }}>:</Typography>
            </Box>
            <Box sx={{ width: '70%' }}>
                <Box sx={{ border: '1px dashed rgba(0, 0, 0, 0.12)', borderRadius: '4px', width: 'fit-content', py: 3, px: 2 }}>
                    <img src='/icons/upload.png' alt='upload' />
                    <Box sx={{ display: 'flex', my: 1 }}>
                        <ButtonBase>
                            <Typography sx={{ color: '#A54CE5', textDecorationLine: 'underline', pr: 1, fontSize: '16px' }}>
                                Click to upload
                            </Typography>
                        </ButtonBase>
                        <Typography sx={{ color: 'black', fontWeight: 400, fontSize: '16px' }}> or drag and drop</Typography>
                    </Box>
                    <Typography sx={{ color: 'rgba(0, 0, 0, 0.6);', fontSize: '14px' }}>SVG, PNG, JPG or GIF (max. 3MB)</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default InputUpload;
