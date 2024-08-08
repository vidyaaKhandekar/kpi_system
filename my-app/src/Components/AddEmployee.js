import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const AddEmployee = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end',margin:'30px'}} >
      <Button variant='contained' sx={{ width: "15%",height:"55px" }} component={Link} 
      to='addemployee'>ADD Employee</Button>
    </div>
  )
}

export default AddEmployee
