import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const AdditionalInfo = ({ kpiAchieved, outOfTen }) => {
  
  return (
    <Card variant="outlined" sx={{ pt: "10px" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold" }}
              color="text.primary"
              gutterBottom
            >
              KPI Achieved :{kpiAchieved}%
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold" }}
              color="text.primary"
              gutterBottom
            >
              Out of 10:{outOfTen}
            </Typography>
          </CardContent>
        </Card>
  );
};

export default AdditionalInfo;
