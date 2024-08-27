import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import RequestTable from "./RequestTable.";


export default function AccordionUsage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [requests, setRequests] = useState();
  const [NoData, setNoData] = useState();
  const [error, setError] = useState();
  const emp_id = userData.id;
  const fetchRequest = async () => {
    const response = await fetch(
      `http://localhost:4000/extra/getRequestlist/${emp_id}`
    );
    if (!response.ok) {
      setError("Problem in Fetching data");
      return;
    }

    const data = await response.json();
   
    if (data.length === 0) {
      setRequests([]);
      setNoData(true);
    } else {
      setRequests(data);
      setNoData(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  function handleRerender(){
    fetchRequest();
    console.log("reRenderd")
  }
  return (
    <>
    {requests?.length===0 ? <p>No Request</p>:null}
      {requests?.map((item, index) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"  
          >
         
           
           <Typography sx={{fontSize:'14px',width: '80%', flexShrink: 0 }}>{item.emp_fname+" "+item.emp_lname}</Typography>
           <Typography sx={{ color: 'text.secondary' }}>{"Month : "+item.month+" 2024"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
  
            <RequestTable requestID={item.id} weekData={item?.scoresData.Scores} aggrigate={item?.aggregatesData.aggregates} totals={item.totolsData} weeks={item?.scoresData.Ranges} aggrigateData={item?.aggregatesData} month={item?.month} year={item?.year} reRender={handleRerender}/>
       
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
