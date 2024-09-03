import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryTable from "./HistoryTable";

export default function History() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [history, setHistory] = useState();
  const [NoData, setNoData] = useState();
  const [error, setError] = useState();
  const emp_id = userData.id;
  const fetchRequest = async () => {
    const response = await fetch(
      `http://localhost:4000/api/kpiScore/getPastScores/${emp_id}`
    );
    if (!response.ok) {
      setError("Problem in Fetching data");
      return;
    }

    const data = await response.json();
    console.log("History", data);
    if (data.length === 0) {
      setHistory([]);
      setNoData(true);
    } else {
      setHistory(data);
      setNoData(false);
    }
    console.log("reRenderd");
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div>
      {history?.length === 0 ? <p>No History available</p> : null}
      {history?.map((item, index) => (
        <Accordion
        key={index+1}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ fontSize: "14px", width: "75%", flexShrink: 0 ,fontWeight:'bold'}}>
            {"Month : " + item.month + " 2024"}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {"KPI ACHIEVED :"+item.aggregates.percentage?.toFixed(2)+"%"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HistoryTable
              weekData={item?.scores?.Scores}
              aggrigate={item?.aggregates?.aggregates}
              totals={item?.totals}
              weeks={item?.scores?.Ranges}
              aggrigateData={item?.aggregates}
              feedback={item?.feedback}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
