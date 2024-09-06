import { Button, Stack, Typography } from "@mui/material";
import React, {useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
const LoginWithGoogle = () => {
  const navigate = useNavigate()
  const loginWithGoogle1 = async() => {
    window.open("http://localhost:4000/auth/google/callback", "_self");
    getUser();
  };
 
  const getUser = async () => {
    try {
      const responce = await axios.get(
        "http://localhost:4000/auth/login/success",
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("userData", JSON.stringify(responce.data.user));
      localStorage.setItem("userProfile", "Employee");
    } catch (error) {
      console.log("Error: ", error);
    }
  };


 
  return (
    <Stack
      sx={{
        justifyContent: "centre",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {/* <Typography sx={{ color: "text.secondary" }}>
        login With Google
      </Typography> */}
      <Button
        variant="outlined"
        sx={{
          height: "40px",
          width: "220px",
          alignSelf: "center",
          border: "1px solid grey",
          marginTop: "5%",
        }}
        onClick={loginWithGoogle1}
      >
        <img
          src="https://cdn.kekastatic.net/login/v/M180_2024.07.11.1/images/logos/google.svg"
          alt="img"
          width="20px"
          height="20px"
        />
        <Typography
          sx={{
            paddingLeft: "0px",
            fontSize: "14px",
            color: "black",
            width:'190px',
            fontWeight:'normal'
          }}

        >
          Login With Google
        </Typography>
      </Button>
    </Stack>
  );
};

export default LoginWithGoogle;
