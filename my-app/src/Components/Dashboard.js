import React , {useEffect} from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Buttombar from "./Buttombar";
import { EmplList, EmployeeBottomBar } from "./Constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  //Route protecting
  const navigate = useNavigate();
  const userProfile = localStorage.getItem("userProfile");

  // const getUser = () => {
  //     axios.get(
  //       "http://localhost:4000/auth/login/success",
  //       {
  //         withCredentials: true,
  //       }
  //     ).then((responce)=>{
  //       localStorage.setItem("userData", JSON.stringify(responce.data.user));
  //       localStorage.setItem("userProfile", "Employee");
  //     }).catch((err)=>{
  //       console.log("Catched Error, ", err);
  //     })
  // };
  
  useEffect(() => {
    // getUser();

    // if(!localStorage.getItem("userData")){
    //   navigate('/login')
    // }

    if (localStorage.getItem("userProfile") === "Admin") {
      navigate("/", { replace: true });
    }
  }, [navigate,userProfile]);
 
  
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
