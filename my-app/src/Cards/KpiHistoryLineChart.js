import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { Typography } from "@mui/material";

export default function KpiHistoryChart() {
  return (
    <Stack direction="row" sx={{ width: "100%",}}>
      <Box sx={{ flexGrow: 1, bgcolor: "white", height: "200px" }}>
        <Typography
          sx={{ fontSize: 20, }}
          color="text.primary"
          gutterBottom
        >
          KPI Score History
        </Typography>
        
        <SparkLineChart
          data={[6.5, 7, 8, 5, 10, 6.7, 8.8, 9]} // month numbers (0-11)
          xAxis={{
            scaleType: "band",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          }}
          height={100}
          showTooltip
          showHighlight
        />
        <Typography
          sx={{ fontSize: 14, mb: "20px",ml:'35px' }}
          color="text.secondary"
          gutterBottom
        >
          KPI Score In Each Month
        </Typography>
      </Box>
    </Stack>
  );
}
