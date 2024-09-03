import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import RequestTable from "./RequestTable.";

export default function Request() {
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
    console.log("request", data);
    if (data.length === 0) {
      setRequests([]);
      setNoData(true);
    } else {
      setRequests(data);
      setNoData(false);
    }
    console.log("reRenderd");
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      {requests?.length === 0 ? <p>No Request</p> : null}
      {requests?.map((item, index) => (
        <Accordion key={index + 1}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography sx={{ fontSize: "14px", width: "80%", flexShrink: 0 }}>
              {item.emp_fname + " " + item.emp_lname}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {"Month : " + item.month + " 2024"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RequestTable
              emp_id={item.emp_id}
              appr_id={item.appr_id}
              requestID={item.id}
              weekData={item?.scoresData.Scores}
              aggrigate={item?.aggregatesData.aggregates}
              totals={item.totolsData}
              weeks={item?.scoresData.Ranges}
              aggrigateData={item?.aggregatesData}
              month={item?.month}
              year={item?.year}
              reRender={fetchRequest}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
//   return (
//     <div>
//       {requests?.length === 0 ? <p>No Request</p> : null}
//       {requests?.map((item, index) => (
//       <Accordion
//         expanded={expanded === "panel1"}
//         onChange={handleChange("panel1")}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1bh-content"
//           id="panel1bh-header"
//         >
//           <Typography sx={{ fontSize: "14px", width: "80%", flexShrink: 0 }}>
//               {item.emp_fname + " " + item.emp_lname}
//             </Typography>
//             <Typography sx={{ color: "text.secondary" }}>
//               {"Month : " + item.month + " 2024"}
//             </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//         <RequestTable
//               emp_id={item.emp_id}
//               appr_id={item.appr_id}
//               requestID={item.id}
//               weekData={item?.scoresData.Scores}
//               aggrigate={item?.aggregatesData.aggregates}
//               totals={item.totolsData}
//               weeks={item?.scoresData.Ranges}
//               aggrigateData={item?.aggregatesData}
//               month={item?.month}
//               year={item?.year}
//               reRender={fetchRequest}
//             />
//         </AccordionDetails>
//       </Accordion>
//        ))}
//     </div>
//   );
}


