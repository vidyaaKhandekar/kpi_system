import { Grid} from "@mui/material";
import React ,{useEffect}from "react";
import loginPage from "./loginPage.jpg";
import LoginOptionDashboard from "./LoginOptionDashboard";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const userProfile = localStorage.getItem("userProfile");
  useEffect(() => {
    if (userProfile === "Employee") {
      navigate("/dashboard", { replace: true });
    }
    if (userProfile === "Admin") {
      navigate("/", { replace: true });
    }
  }, [userProfile, navigate]);
  return (
    <Grid container sx={{width:'100vw',height:'100vh'}}>
      <Grid item xs={6}>
        <img src={loginPage} alt="login imag " width="100%" height="100%" />
      </Grid>
      <Grid item xs={6} sx={{justifyContent:'centre',alignItems:'center'}}>
        <LoginOptionDashboard/>
      </Grid>
    </Grid>
  );
};

export default Login;
