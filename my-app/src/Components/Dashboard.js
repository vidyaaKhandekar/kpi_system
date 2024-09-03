import React , {useEffect} from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Buttombar from "./Buttombar";
import { EmplList, EmployeeBottomBar } from "./Constant";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  //Route protecting
  const navigate = useNavigate();
  const userProfile = localStorage.getItem("userProfile");
  useEffect(() => {
    
    if (userProfile === "Admin") {
      navigate("/", { replace: true });
    }
  }, [userProfile, navigate]);
  return (
    <div>
      <Box>
        <Navbar />
        <Stack direction="row" spacing={0}>
          <Sidebar list={EmplList} />
          <Outlet />
        </Stack>
        <Buttombar list={EmployeeBottomBar} />
      </Box>
    </div>
  );
};

export default Dashboard;
