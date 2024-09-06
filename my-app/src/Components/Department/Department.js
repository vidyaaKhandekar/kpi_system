import React from "react";
import { Grid } from "@mui/material";
import DepartmentTab from "./DepartmentTab";
import DisplayCards from "../DisplayCards";
const Department = () => {
  return (
    <Grid container bgcolor="grey" spacing={1} >
      <Grid item xs={11.8} md={5.5}>
        <DisplayCards />
      </Grid>
      <Grid
        item
        mt="19px"
        xs={11}
        sm={11.3}
        md={6.1}
        m={2}
        
      >
        <DepartmentTab />
      </Grid>
    </Grid>
  );
};

export default Department;
