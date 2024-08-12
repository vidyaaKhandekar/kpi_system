import React from 'react'
import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Role = () => {
  return (
    
    <Stack flex={8}>
        
        <Outlet />
        
    </Stack>
  )
}

export default Role
