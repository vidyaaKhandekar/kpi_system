import React from "react";
import Grid from "@mui/material/Grid";
import DisplayCards from "../DisplayCards";
import EmployeeTab from "./EmployeeTab";
const Employee = () => {
  return (
    <Grid container bgcolor="grey" spacing={1} sx={{}}>
      <Grid item xs={11.8} md={5.5}>
        <DisplayCards />
      </Grid>
      <Grid
        item
        mt="19px"
        xs={11.1}
        sm={11.4}
        md={6}
        lg={6.1}
        m={2}
      >
        <EmployeeTab />
      </Grid>
    </Grid>
  );
};

export default Employee;
