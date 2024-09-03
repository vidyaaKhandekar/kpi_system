import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoginWithGoogle from './LoginWithGoogle';
import LoginAsAdmin from './LoginAsAdmin';
import { LoginLogo } from '../Constant';
export default function LoginOptions() {
  const [value, setValue] = React.useState('employee');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1',bgcolor:'#FFF8E8'}}>
    
            <Box sx={{ml:'40%', mt:'5px'}}>
            {LoginLogo}
            </Box>
        
      <TabContext value={value}>
        <Box sx={{ width: '100%',}} >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Login As Emoloyee" value="employee" />
            <Tab label="Login As Admin" value="admin" />
          </TabList>
        </Box>
        <TabPanel value="employee"><LoginWithGoogle/></TabPanel>
        <TabPanel value="admin"><LoginAsAdmin/></TabPanel>
      </TabContext>
    </Box>
  );
}