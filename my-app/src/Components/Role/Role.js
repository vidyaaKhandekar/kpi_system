import React from 'react'
import Grid from '@mui/material/Grid'
import DisplayCards from '../DisplayCards'
import Card from '@mui/material/Card'
import RoleTab from './RoleTab'
const Role = () => {
  return (
    <Grid container bgcolor="#FFEAE3" spacing={4} mt="0px" ml="2px">
      <Grid item xs={12} md={4}>
        <DisplayCards/>
      </Grid>
      <Grid item  mt="19px" xs={11} md={7.6}  >
       <Card  ><RoleTab/></Card>
        
      </Grid>
    </Grid>
  )
}

export default Role
