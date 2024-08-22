import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Buttombar from "./Buttombar";
import { EmplList, EmployeeBottomBar } from "./Constant";
const Dashboard = () => {
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
