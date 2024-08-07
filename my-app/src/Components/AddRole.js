import { Button,Box} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AddRole = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end',margin:'30px'}} >
      <Button variant='contained' sx={{ width: "15%",height:"55px" }} component={Link} 
      to='addrole'>ADD ROLE</Button>
    </div>
  )
}

export default AddRole
