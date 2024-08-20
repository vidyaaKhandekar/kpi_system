import { Box, Grid } from "@mui/material";
import React from "react";
import OutlinedCard from "./OutlinedCard";

const DisplayCards = () => {
  return (
   
      <Grid container spacing={2} mt="2px" ml="0px">
        <Grid item  xs={11} md={11} sm={4}>
          <OutlinedCard/>
        </Grid>
        <Grid item xs={11} md={11} sm={4}>
        <OutlinedCard/>
        </Grid>
        <Grid item xs={11} md={11} sm={4}>
          <OutlinedCard/>
        </Grid>
        
      </Grid>
   
  );
};

export default DisplayCards;
