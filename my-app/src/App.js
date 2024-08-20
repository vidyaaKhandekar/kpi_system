import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Box from "@mui/material/Box";
import Navbar from "./Components/Navbar";
import { Grid, Stack } from "@mui/material";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";
import Buttombar from "./Components/Buttombar";


function App() {

  return (
    <Box>
        <Navbar />
        <Stack direction="row" spacing={0}>
          <Sidebar />
          <Outlet />
        </Stack>
        <Buttombar />
    </Box>
   
  );
}

export default App;
