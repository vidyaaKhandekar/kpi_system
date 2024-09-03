import React, { useEffect, useState } from "react";
import Test from "../test";
import { Typography } from "@mui/material";
import AdditionalInfo from "../Approvar/AdditionalInfo";
const FillKpi = ({ week,onKPISubmit,aggrigate ,status}) => {
  // Creating array of { KPIid: 1, KPI_Description: '',Max_Score:'', Score: '', Comment: '' },
  const userData = JSON.parse(localStorage.getItem("userData"));
  const emp_id = userData.id;
  const [weekData, setWeekData] = useState();
  const [noDataFound, setNoDataFound] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {

    try {
      const response = await fetch(
        `http://localhost:4000/api/kpiScore/getByWeek/${emp_id}/${week.sd}/${week.ed}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        setError("Problem in Fetching data");
        return;
      }
      const data = await response.json();
   
      if (data.length === 0) {
        setWeekData([]);
        setNoDataFound(true);
      } else {
        setWeekData(data);
        setNoDataFound(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {

    fetchData();
    console.log(status,"status is")
  }, []);

  const rows = weekData?.map((obj, index) => ({
    KPIid: obj.kpi_id,
    KPI_Description: obj.description,
    Max_Score: obj.weight,
    Score: obj.score,
    Comment: obj.comment,
    
  }));

  

  return (
    <>
      {noDataFound ? <p>No KPIs assigned to this role</p> : null}
      {error ? <p>OOOps Some Error</p> : null}
      {console.log(week,"week")}
      <Typography variant="body1" align="center"sx={{ fontSize: "14px" ,fontWeight:'bold',mt:'5px' }}>
        {`${week.sd_date } ${week.sd_month }- ${week.ed_date} ${week.ed_month}`}
      </Typography>
      <Typography variant="body1" align="center" sx={{ fontSize: "14px" ,fontWeight:'bold', }}>
        {`${week.sd_year }`}
      </Typography>
      {rows ? (
        
        <Test
          emp_id={emp_id}
          rows={rows}
          startDate={week.sd}
          endDate={week.ed}
          aggrigate={aggrigate.aggregates}
          onKPISubmit={onKPISubmit}
          status={status}
        />
      ) : null}
     

    </>
  );
};

export default FillKpi;
