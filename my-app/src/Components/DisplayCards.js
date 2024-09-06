import {  Grid } from "@mui/material";
import React from "react";
import EmployeePieChart from "../Cards/EmployeePieChart";
import OverviewCard from "../Cards/OverviewCard";

const DisplayCards = () => {
  return (
   
      <Grid container direction={'row'} spacing={1}  sx={{
        justifyContent:'space-evenly',
        "&.MuiGrid-root":{
          m:0,
          p:0
      }
      }} >
        <Grid item  xs={11} md={11} sm={5.5} sx={{"&.MuiGrid-item":{
        mt:2.2,
        p:0
      
      }}}
      >
          <EmployeePieChart/>
        </Grid>
        <Grid item xs={11} md={11} sm={5.5} sx={{"&.MuiGrid-item":{
        mt:2.2,
        p:0
      }}}>
        <OverviewCard/>
        </Grid> 
      </Grid>
     
   
  );
};

export default DisplayCards;
