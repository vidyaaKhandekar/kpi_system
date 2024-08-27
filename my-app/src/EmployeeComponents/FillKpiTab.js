import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FillKpi from "./FillKpi";
import { useState, useEffect } from "react";
import { useFetchById } from "../CustomHook/FetchDataByEmp";
import { Typography } from "@mui/material";
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

export default function FillKpiTab() {
  const[reRender,setRender]=useState(true);
  //fetch week ranges
  const url1 = "http://localhost:4000/extra/getCurrWeeks";
  const url2 = "http://localhost:4000/extra/getPastWeeks";
  const userData = JSON.parse(localStorage.getItem("userData"));
  const emp_id = userData.id;
  const [CurrentweekRange, setCurrentWeekRange] = useState([]);
  const [PreviousweekRange, setPreviousWeekRange] = useState([]);
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const { data: apiData1,noDataFound:noData1, error: error1 } = useFetchById({
    link: url1,
    id: emp_id,
  });
  const { data: apiData2,noDataFound:noData2, error: error2 } = useFetchById({
    link: url2,
    id: emp_id,
  });
  ///fetch Addrigates
  const[CurrentweekAggrigate,setCurrentweekAggrigate]=useState();
  const[PreviousweekAggrigate,setPreviousweekAggrigate]=useState();
  
  const link1="http://localhost:4000/api/kpiScore/getCurrentAggregates";
  const link2="http://localhost:4000/api/kpiScore/getPreviousAggregates";
  const {data:aggrigate1}=useFetchById({ link:link1, id: emp_id })
  const {data:aggrigate2}=useFetchById({ link:link2, id: emp_id })

  useEffect(() => {
    setCurrentweekAggrigate(aggrigate1.aggregates);
    setPreviousweekAggrigate(aggrigate2.aggregates);
  }, [aggrigate1,aggrigate2,reRender]);

  //set months for label
  const [CurrentMonth,setCurrentMonth]=useState();
  const[previousMonth,setPreviousMonth]=useState();
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


  useEffect(() => {
    const currentMonth = new Date().getMonth() ;
   
    if (dayOfMonth > 20) {
      setCurrentMonth(monthNames[currentMonth+1])
      setPreviousMonth(monthNames[currentMonth])
      setCurrentWeekRange(apiData1);
      setPreviousWeekRange(apiData2);
    } else {
      setCurrentMonth(monthNames[currentMonth])
      setCurrentWeekRange(apiData1);
    }
  }, [apiData1,apiData2,error1,error2,reRender]);
 ///set month


  
  ///fetch data
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  const handleRender = () => {
    console.log("rerederd")
    if(reRender===true){
      setRender(false);
    }
    else{
      setRender(false)
    }
  };
 
  return (
    <Box sx={{ width: "100%", p: "0" }}>
      {noData1 || noData2 ? <p>No KPIs assigned to this role</p> : null}
      {error1 || error2 ? <p>`OOOps Some Error `</p> : null}

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "flex-end",
          mr: "30px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            justifyContent: "center",
            alignItem: "centre",
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "#9DBDFF",
              color: "black",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent",
            },
            "& .MuiTab-root": {
              p: "0",
            },
          }}
        >
          {CurrentweekRange?.map((label, index) => (
            <Tab
              key={index}
              label={
                <>
                  <Typography sx={{ fontSize: "13px" }}>{CurrentMonth}</Typography>

                  <Typography sx={{ fontSize: "12px" }}>{`Week ${
                    CurrentweekRange.length - index
                  }`}</Typography>
                </>
              }
              {...a11yProps(index)}
              sx={{
                backgroundColor:
                CurrentweekRange[index].status === "" ? "#ec644b" : "",
                color: CurrentweekRange[index].status === "" ? "white" : "",
              }}
            />
          ))}
          {PreviousweekRange?.map((label, index) => (
            <Tab
              key={index}
              label={
                <>
                  <Typography sx={{ fontSize: "13px" }}>{previousMonth}</Typography>

                  <Typography sx={{ fontSize: "12px" }}>{`Week ${
                    PreviousweekRange.length - index
                  }`}</Typography>
                </>
              }
              {...a11yProps(index)}
              sx={{
                backgroundColor:
                PreviousweekRange[index].status === "" ? "#ec644b" : "",
                color: PreviousweekRange[index].status === "" ? "white" : "",
              }}
            />
          ))}
        </Tabs>
      </Box>
  
      {[...CurrentweekRange, ...PreviousweekRange]?.map((week, index) => (
  <CustomTabPanel key={index} value={value} index={index}>
    <FillKpi
      week={week}
      onKPISubmit={handleRender}
      aggrigate={week.flag==='Current' ? CurrentweekAggrigate : PreviousweekAggrigate}
    
    />
  </CustomTabPanel>
))}
{console.log(PreviousweekRange,"CurrentweekRange")}
    </Box>
  );
}
