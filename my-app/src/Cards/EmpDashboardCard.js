import { Box, Grid } from "@mui/material";
import React from "react";

import EmployeePieChart from "../Cards/EmployeePieChart";
import OverviewCard from "../Cards/OverviewCard";
import KpiHistoryLineChart from "./KpiHistoryLineChart";
import CurrentMonthCalendar from "./CurrentMonthCalendar";

const EmpDashboardCard = () => {
  return (
   
      <Grid container spacing={3} mt="2px" ml="0px" pr='24px' >
        <Grid item  xs={11} md={5.8} sm={5.5}>
          <KpiHistoryLineChart/>
        </Grid>
        <Grid item xs={11} md={5.8} sm={5.5}>
        <CurrentMonthCalendar/>
        </Grid> 
      </Grid>
   
  );
};

export default EmpDashboardCard;
