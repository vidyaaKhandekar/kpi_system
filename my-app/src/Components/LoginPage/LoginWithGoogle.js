import { Button,Stack,Typography } from "@mui/material";
import React from "react";


const loginWithGoogle =()=>{
    window.open("http://localhost:4000/auth/google/callback", "_self")
}
const LoginWithGoogle = () => {
  return (
    <Stack sx={{ 
        justifyContent:"centre",
        alignItems:"center",
        height:"100%",
        width:"100%"
    }}>
      <Button
        variant="outlined"
        sx={{
          height: "40px",
          width: "165px",
          alignSelf:"center",
          border: "1px solid grey",
          marginTop:"400px"
        }}
        onClick={loginWithGoogle}
      >
        <img
          src="https://cdn.kekastatic.net/login/v/M180_2024.07.11.1/images/logos/google.svg"
          alt="img"
          width="20px"
          height="20px"
        />
        <Typography
          sx={{
            paddingLeft: "20px",
            fontSize: "15px",
            font: "Proxima Nova",
            color: "black",
          }}
        >
          Google
        </Typography>
      </Button>
    </Stack>
  
  );
};

export default LoginWithGoogle;
