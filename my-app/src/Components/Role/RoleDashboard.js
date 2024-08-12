import React from 'react'
import { Stack } from '@mui/material'
import AddRole from './AddRole'
import DisplayRole from './DisplayRole'
const RoleDashboard = () => {
  return (
    <Stack flex={8}>
      <AddRole/>
      <DisplayRole/>
    </Stack>
  )
}

export default RoleDashboard
