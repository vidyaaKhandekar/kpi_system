import React from 'react'
import AddRoleButton from './AddRole'
import { Stack,Button } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import AddRole from './AddRole'
import DisplayRole from './DisplayRole'
import RoleDashboard from './RoleDashboard'
import AddRoleForm from './AddRoleForm'
const Role = () => {
  return (
    
    <Stack flex={8}>
        
        <Outlet />
        
    </Stack>
  )
}

export default Role
