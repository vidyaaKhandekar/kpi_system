import React from 'react'
import Grid from '@mui/material/Grid'
import DisplayCards from '../DisplayCards'
import Card from '@mui/material/Card'
import EmployeeTab from './EmployeeTab'
const Employee = () => {
  return (
    <Grid container bgcolor="#FFEAE3" spacing={4} mt="0px" ml="2px">
    <Grid  xs={12} md={4}>
      <DisplayCards/>
    </Grid>
    <Grid  mt="19px" xs={11} md={7.6}  >
     <Card  ><EmployeeTab/></Card>
      
    </Grid>
  </Grid>
  )
}

export default Employee
