import { Grid } from '@mui/material'
import React from 'react'
import { LoginLogo } from '../Constant'
import LoginOptions from './LoginOptions'
const LoginOptionDashboard = () => {
  return (
    <Grid container sx={{mt:'25%', justifyContent:'center',alignContent:'centre'}} >
       
        <Grid >
            <LoginOptions/>
        </Grid>
    </Grid>
  )
}

export default LoginOptionDashboard
