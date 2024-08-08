import { Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Employee = () => {
  return (
    <Stack sx={{flex:"8"}}>
      <Outlet/>
    </Stack>
  )
}

export default Employee
