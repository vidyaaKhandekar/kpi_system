import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Buttombar from "./Buttombar";

const Dashboard = () => {
  const handleLogOut = async () => {
    window.open("http://localhost:4000/auth/logout", "_self");
  };
  const [userData, setUserData] = useState({});
  console.log("Responce: ", userData);
  const getUser = async () => {
    try {
      const responce = await axios.get(
        "http://localhost:4000/auth/login/success",
        {
          withCredentials: true,
        }
      );

      setUserData(responce.data.user);
      localStorage.setItem("userData", JSON.stringify(responce.data.user));
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Box>
        <Navbar />
        <Stack direction="row" spacing={0}>
          <Sidebar />
          <Outlet />
        </Stack>
        <Buttombar />
      </Box>
    </div>
  );
};

export default Dashboard;
