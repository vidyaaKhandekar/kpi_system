import React from "react";
import AddDepartment from "./AddDepartment";
import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import DisplayList from "../DisplayList";
import { deleteDepartmentUrl } from "../Constant";
import DepartmentTab from "./DepartmentTab";
import DisplayCards from "../DisplayCards";
const Department = () => {
  
  return (
    <Grid container bgcolor="#FFEAE3" spacing={4} mt="0px" ml="2px">
      <Grid  xs={12} md={4}>
        <DisplayCards/>
      </Grid>
      <Grid  mt="19px" xs={11} md={7.6}  >
       <Card  ><DepartmentTab/></Card>
        
      </Grid>
    </Grid>
  );
};

export default Department;
