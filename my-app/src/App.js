import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import Navbar from './Components/Navbar';
import { Stack } from '@mui/material';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Footar from './Components/Footar';

function App() {
  return (
   <Box sx={{
    m:"0px",
    p:"0px",
    width:"100vw"
   }} >
    <Navbar/>
    <Stack direction="row" spacing={2} >
      <Sidebar/>
      <Feed/>
    </Stack>
    <Footar/>
   </Box>
  );
}

export default App;
