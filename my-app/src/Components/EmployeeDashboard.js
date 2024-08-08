import React from 'react'
import { Stack } from '@mui/material'
import AddEmployee from './AddEmployee'
import DisplayEmployee from './DisplayEmployee'
const EmployeeDashboard = () => {
  return (
    <Stack flex={8}>
      <AddEmployee/>
      <DisplayEmployee/>
    </Stack>
  )
}

export default EmployeeDashboard
