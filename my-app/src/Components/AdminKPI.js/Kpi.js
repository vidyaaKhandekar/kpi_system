import { Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Kpi = () => {
  return (
    <Stack flex={8}>
        <Outlet/>
    </Stack>
  )
}

export default Kpi
