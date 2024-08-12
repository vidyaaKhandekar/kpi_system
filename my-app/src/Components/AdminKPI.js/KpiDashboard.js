import React from "react";
import { Stack } from "@mui/material";
import AddKpi from "./AddKpi";
import DisplayKpi from "./DisplayKpi";

const KpiDashboard = () => {
  return (
    <Stack flex={8}>
      <AddKpi />
      <DisplayKpi />
    </Stack>
  );
};

export default KpiDashboard;
