import { Button,Stack,Typography } from "@mui/material";
import React,{useState} from "react";
import axios from "axios";



const LoginWithGoogle = () => {
  const loginWithGoogle1 =()=>{
    window.open("http://localhost:4000/auth/google/callback", "_self")
    getUser();
}
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
      localStorage.setItem("user","yes")
      localStorage.setItem("userProfile","Employee")
    } catch (error) {
      console.log("Error: ", error);
    }
  };
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
