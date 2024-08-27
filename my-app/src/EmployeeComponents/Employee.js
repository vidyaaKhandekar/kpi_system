import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import MyKpiTab from './MyKpiTab'
import EmpDashboardCard from '../Cards/EmpDashboardCard'

const Role = () => {
  
  return (
    <Grid container bgcolor="#FFEAE3" spacing={0} mt="0px" ml="2px" pl='20px' pr='20px'>
      <Grid  xs={12} md={12}>
        <EmpDashboardCard/>
      </Grid>
      <Grid  mt="19px" xs={12} md={12} sx={{pl:'20px',pr:'20px',height:'auto'}} >
       <Card  >
        <MyKpiTab/>
       </Card>
        
      </Grid>
    </Grid>
  )
}

export default Role
