import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const AdditionalInfo = ({kpiAchieved,outOfTen}) => {
  return (
    <Card sx={{ maxWidth: 400 }} variant="outlined">
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
        KPI Achieved :{kpiAchieved}%
        </Typography>
        <Typography sx={{ fontSize: 14}} color="text.primary" gutterBottom>
        Out of 10:{outOfTen}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfo;
