import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddDepartment from "./AddDepartment";
import { useState, useEffect } from "react";
import { deleteDepartmentUrl } from "../Constant";
import DisplayList from "../DisplayList";

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

export default function DepartmentTab() {
  ///fetch data
  const [DepartmentList, setDepartmentList] = useState([]);
  const fetchData = async () => {
    const data = await fetch("http://localhost:4000/api/dept/getAll");
    console.log("Responce: ", data);
    const deptList = await data.json();
    console.log("List: ", deptList);
    setDepartmentList(deptList);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(DepartmentList);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "700px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ justifyContent: "center", alignItem: "centre" }}
        >
          <Tab label="Add Department" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddDepartment fetchData={fetchData} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DisplayList
            listItem={DepartmentList}
            fetchData={fetchData}
            url={deleteDepartmentUrl}
          />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
