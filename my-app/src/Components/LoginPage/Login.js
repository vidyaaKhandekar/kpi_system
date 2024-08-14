import { Stack, Button, Typography } from "@mui/material";
import React from "react";
import loginPage from "./loginPage.jpg";
import { Outlet } from "react-router-dom";
const Login = () => {
  return (
    <Stack
      direction="row"
      sx={{
        m: "0px",
        p: "0px",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img src={loginPage} alt="login imag " width="65%" height="100%" />
      <Outlet />
    </Stack>
  );
};

export default Login;
