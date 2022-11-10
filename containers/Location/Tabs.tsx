import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

interface ParentTabsProps {
    value: any;
    handleChange: any;
}

const ParentTabs: React.FC<ParentTabsProps> = ({ value, handleChange }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                <Tabs
                    indicatorColor='secondary'
                    textColor='secondary'
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                    sx={{
                        '& .css-126nuyh-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                            color: '#A54CE5'
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#A54CE5',
                            height: '4px'
                        }
                    }}
                >
                    <Tab sx={{ fontWeight: 'bold' }} label='PROVINCE' {...a11yProps(0)} />
                    <Tab sx={{ fontWeight: 'bold' }} label='CITY' {...a11yProps(1)} />
                    <Tab sx={{ fontWeight: 'bold' }} label='DISTRICT' {...a11yProps(2)} />
                    <Tab sx={{ fontWeight: 'bold' }} label='SUB DISTRICT' {...a11yProps(3)} />
                </Tabs>
            </Box>
        </Box>
    );
};

export default ParentTabs;
