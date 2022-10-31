import { Box, ButtonBase, Typography } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DropdownCard = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <ButtonBase onClick={() => setIsOpen(!isOpen)} sx={{ width: '100%', padding: '15px 19px' }}>
                <Box width='100%' display='flex' justifyContent='space-between'>
                    <Box>
                        <img src='icons/navbar/tournament.png' alt='dashboard' width='18px' height='auto' />
                        <Typography component='span' fontSize='16px' fontWeight={400} ml='35px' sx={{ color: 'black' }}>
                            title
                        </Typography>
                    </Box>
                    <ExpandMoreIcon sx={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </Box>
            </ButtonBase>
            {isOpen && (
                <ButtonBase sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography component='span' fontSize='14px' fontWeight={400} sx={{ color: 'black', ml: '70px', textAlign: 'start' }}>
                        title
                    </Typography>
                </ButtonBase>
            )}
        </>
    );
};

export default DropdownCard;
