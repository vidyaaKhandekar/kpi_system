import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DisplayMyKpi from "./DisplayMyKpi";
import useFetchKpi from "../CustomHook/useFetchKpi";
import FillKpiTab from "./FillKpiTab";
import KpiHistory from "./KpiHistory";
;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MyKpiTab() {
  ///KPIs for that employee
  const userData = JSON.parse(localStorage.getItem("userData"));
  const emp_id = userData.id;
  const { kpiList, noDataFound, error } = useFetchKpi(emp_id);

  ///fetch data
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiBox-root": {
          padding: "0 ",
        },
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            justifyContent: "center",
            alignItem: "centre",
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "#F2AFEF",
              color: "black",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent", 
            },
          }}
        >
          <Tab label="MY KPI" {...a11yProps(0)} />
          <Tab label="Fill KPI" {...a11yProps(1)} />
          <Tab label="KPI HISTORY" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DisplayMyKpi
          kpiList={kpiList}
          noDataFound={noDataFound}
          error={error}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FillKpiTab kpiList={kpiList} noDataFound={noDataFound} error={error} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} sx={{ height: 500, overflowY: "scroll" ,}}>
        <KpiHistory/>
      </CustomTabPanel>
    </Box>
  );
}
