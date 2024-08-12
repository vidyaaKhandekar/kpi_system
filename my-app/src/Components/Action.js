import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack } from '@mui/material';
import AddEmployeeForm from './Employee/AddEmployeeForm';
const Action = ({roleId,deptId}) => {

  return (
   <Stack direction="row" spacing={1}>
        <Button variant='outined' ><EditIcon /></Button>
        <Button variant='outined'><DeleteIcon/></Button>
   </Stack>
  )
}

export default Action
