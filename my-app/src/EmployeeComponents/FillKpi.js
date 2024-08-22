import React, { useEffect, useState } from 'react'
import Test from '../test';
const FillKpi = ({kpiList, noDataFound, error}) => {
  ///API Call for week Range
  const[weekRange,setWeekRange]=useState();
   const fetchWeek = async()=>{
    console.log("Called");

    const response = await fetch(
      "http://localhost:4000/extra/getPreviousWeekRange",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
       
        },
      }
    );
    const data = await response.json();
    const list = data;
    console.log(list);
    setWeekRange(list);
   }
   console.log(weekRange);
   useEffect(
    ()=>{
        fetchWeek();
    },[]
   )
   // Creating array of { KPIid: 1, KPI_Description: '',Max_Score:'', Score: '', Comment: '' },
   const rows = kpiList?.map((obj, index) => ({ KPIid: index + 1, KPI_Description: obj.description,Max_Score: obj.weight,Score:'',Comment:'' }));
  return (
   <Test rows={rows}/>
  )
}

export default FillKpi
