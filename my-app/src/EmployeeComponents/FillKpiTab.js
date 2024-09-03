import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FillKpi from "./FillKpi";
import { useState, useEffect } from "react";
import Dialogg from "./Dialog";
import { Button, Typography } from "@mui/material";
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


  const userData = JSON.parse(localStorage.getItem("userData"));
  const emp_id = userData.id;
  const [CurrentweekRange, setCurrentWeekRange] = useState([]);
  const [PreviousweekRange, setPreviousWeekRange] = useState([]);
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const[noData,setNoData]=useState();
  const [CurrentweekAggrigate, setCurrentweekAggrigate] = useState();
  const [PreviousweekAggrigate, setPreviousweekAggrigate] = useState();

  const fetchCurrentWeek = async () => {
    const response = await fetch(
      `http://localhost:4000/extra/getCurrWeeks/${emp_id}`
    );
    if (!response.ok) {
      setError("Problem in Fetching data");
      return;
    }

    const data = await response.json();

    if (data.length === 0) {
      setCurrentWeekRange([]);
      setNoData(true);
    } else {
      setCurrentWeekRange(data);
      setNoData(false);
    }
  };
  const fetchPreviousWeek = async () => {
    const response = await fetch(
      `http://localhost:4000/extra/getPastWeeks/${emp_id}`
    );
    if (!response.ok) {
      setError("Problem in Fetching data");
      return;
    }

    const data = await response.json();

    if (data.length === 0) {
      setPreviousWeekRange([]);
      setNoData(true);
    } else {
      setPreviousWeekRange(data);
      setNoData(false);
    }
  };
  
///fetch aggrigates
const fetchCurrentWeekAgg = async () => {
  const response = await fetch(
    `http://localhost:4000/api/kpiScore/getCurrentAggregates/${emp_id}`
  );
  if (!response.ok) {
    setError("Problem in Fetching data");
    return;
  }

  const data = await response.json();
  console.log("current agg",data)
  if (data.length === 0) {
    setCurrentweekAggrigate([]);
    setNoData(true);
  } else {
    setCurrentweekAggrigate(data);
    setNoData(false);
  }
};
const fetchPreviousWeekAgg = async () => {
  const response = await fetch(
    `http://localhost:4000/api/kpiScore/getPreviousAggregates/${emp_id}`
  );
  if (!response.ok) {
    setError("Problem in Fetching data");
    return;
  }

  const data = await response.json();

  if (data.length === 0) {
    setPreviousweekAggrigate([]);
    setNoData(true);
  } else {
    setPreviousweekAggrigate(data);
    setNoData(false);
  }
};
  //set months for label
  const [CurrentMonth, setCurrentMonth] = useState();
  const [previousMonth, setPreviousMonth] = useState();
  const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC",];

  const handleRerender = () => {
    const currentMonth = new Date().getMonth();
    if (dayOfMonth > 20) {
      setCurrentMonth(monthNames[currentMonth + 1]);
      setPreviousMonth(monthNames[currentMonth]);

       fetchCurrentWeek();
       fetchPreviousWeek();
       fetchCurrentWeekAgg();
       fetchPreviousWeekAgg();
     
    } else {
      setCurrentMonth(monthNames[currentMonth]);
     fetchCurrentWeek();
     fetchCurrentWeekAgg();
    }
    
  };
  ///fetch data
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const handleSubmit=async()=>{
 fetch(`http://localhost:4000/extra/sendForApproval/${emp_id}`
)
.then(async(response) => {
  const res=await response.json();
  console.log(res)
if (response.ok) {
  setSuccess("Successfully Approved !!!");
} else {
  setError("Error with server ");
}
})
.catch((error) => {
setError(error.message);
});


};

useEffect(()=>(
  handleRerender()
),[])
  return (
    <Box sx={{ width: "100%", p: "0" }}>
      {noData  ? <p>No KPIs assigned to this role</p> : null}
      

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
                  <Typography sx={{ fontSize: "13px" }}>
                    {CurrentMonth}
                  </Typography>

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
                  <Typography sx={{ fontSize: "13px" }}>
                    {previousMonth}
                  </Typography>

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
           {/* <Button variant="contained" sx={{display:'flex',justifyContent  : "flex-end",
           }} type="submit" onClick={handleSubmit}><Typography sx={{fontSize:'13px'}}>Send For <br/> Approval</Typography></Button> */}
           <Dialogg weekRange={PreviousweekRange} emp_id={emp_id} onKPISubmit={handleRerender}/>
        </Tabs>
        
      </Box>
         
      {[...CurrentweekRange, ...PreviousweekRange]?.map((week, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
        
          <FillKpi
            week={week}
            onKPISubmit={handleRerender}
            aggrigate={
              week.flag === "Current"
                ? CurrentweekAggrigate
                : PreviousweekAggrigate
            }
            status={week.status}
          />
        </CustomTabPanel>
      ))}
      
    </Box>
  );
}
