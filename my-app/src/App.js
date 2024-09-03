import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Box from "@mui/material/Box";
import Navbar from "./Components/Navbar";
import { Stack } from "@mui/material";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";
import Buttombar from "./Components/Buttombar";
import { AdminList, AdminBottomBar } from "./Components/Constant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  //Route protecting
  const navigate = useNavigate();
  const userProfile = localStorage.getItem("userProfile");
  useEffect(() => {
    if (userProfile === "Employee") {
      navigate("/dashboard", { replace: true });
    }
  }, [userProfile, navigate]);

  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={0}>
        <Sidebar list={AdminList} />
        <Outlet />
      </Stack>
      <Buttombar list={AdminBottomBar} />
    </Box>
  );
}

export default App;
