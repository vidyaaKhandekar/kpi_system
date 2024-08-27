import { Card, Grid } from '@mui/material'
import React from 'react'
import EmpDashboardCard from '../Cards/EmpDashboardCard'
import MyTeamTab from './MyTeamTab'

const Approvar = () => {
    return (
        <Grid container bgcolor="#FFEAE3" spacing={0} mt="0px" ml="2px" pl='20px' pr='20px'>
          <Grid  xs={12} md={12}>
            <EmpDashboardCard/>
          </Grid>
          <Grid  mt="19px" xs={12} md={12} sx={{pl:'20px',pr:'20px',height:'600px',overflowY:'scroll'}} >
           <Card  >
            <MyTeamTab/>
           </Card>
            
          </Grid>
        </Grid>
    )
}

export default Approvar
