import {  Grid } from "@mui/material";
import React from "react";
import EmployeePieChart from "../Cards/EmployeePieChart";
import OverviewCard from "../Cards/OverviewCard";

const DisplayCards = () => {
  return (
   
      <Grid container spacing={2} mt="2px" ml="0px">
        <Grid item  xs={11} md={11} sm={11}>
          <EmployeePieChart/>
        </Grid>
        <Grid item xs={11} md={11} sm={11}>
        <OverviewCard/>
        </Grid> 
      </Grid>
   
  );
};

export default DisplayCards;
