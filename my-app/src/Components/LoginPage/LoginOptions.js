import React from 'react'
import { Stack,Button } from '@mui/material'
import { Link } from 'react-router-dom'
const LoginOptions = () => {
  return (
    <Stack spacing={1} sx={{width:"35%",
        justifyContent:"center",
        alignItems:"center"
    }}>
    
    <Button variant="contained" component={Link} to='admin'  sx={{
        width:"80%",
        height:"50px"
    }}>Login As Admin</Button>
    <Button variant="contained" component={Link} to='employee'
    sx={{
        width:"80%",
        height:"50px"
    }}>Login As Employee</Button>
    </Stack>
  )
}

export default LoginOptions
