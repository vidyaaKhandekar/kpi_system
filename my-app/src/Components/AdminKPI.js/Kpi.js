import React from "react";
import Grid from "@mui/material/Grid";
import DisplayCards from "../DisplayCards";
import KpiTab from "./KpiTab";

const Kpi = () => {
  return (
    <Grid container bgcolor="grey" spacing={1} sx={{}}>
      <Grid item xs={11.8} md={5.3}>
        <DisplayCards />
      </Grid>
      <Grid
        item
        mt="20px"
        xs={11}
        md={6.1}
        lg={6.3}
        m={2}
      >
        <KpiTab />
      </Grid>
    </Grid>
  );
};

export default Kpi;
