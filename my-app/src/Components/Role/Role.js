import React from 'react'
import Grid from '@mui/material/Grid'
import DisplayCards from '../DisplayCards'
import RoleTab from './RoleTab'
///1165
const Role = () => {
  return (
    <Grid container bgcolor="grey" spacing={1} sx={{}}>
      <Grid item xs={11.8} md={5.3}>
        <DisplayCards/>
      </Grid>
    
      <Grid
        item
        mt="19px"
        xs={11.3}
        md={6.1}
        lg={6.3}
        sx={{
          m: 2.3,
        }}
      >
       <RoleTab/>
        
      </Grid>
    </Grid>
  )
}

export default Role
