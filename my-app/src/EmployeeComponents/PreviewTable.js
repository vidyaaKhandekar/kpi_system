/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AdditionalInfo from "../Approvar/AdditionalInfo";
const StyledTableContainer = styled(TableContainer)`
  height: 500px; /* set the height of the table container */
  overflow-y: auto; /* make the table body scrollable */
  border: 1px solid #ddd; /* add a border to the table */
`;

const StyledTableHead = styled(TableHead)`
  position: sticky; /* make the table head sticky */
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #ddd; /* add a border to the table head */
`;

const StyledTableRow = styled(TableRow)`
  & > th {
    position: sticky; /* make the table head cells sticky */
    left: 0;
    border-right: 1px solid #ddd; /* add a border to the table head cells */
    border-bottom: 1px solid #ddd;
  }
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid #ddd; /* add a border to the table cells */
`;

const PreviewTable = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const emp_id = userData.id;
  const [weekData, setWeekData] = useState();
  const [weeks, setWeek] = useState();
  const [noDataFound, setNoDataFound] = useState(false);
  const [error, setError] = useState(null);
  const [aggrigate, setAggrigate] = useState();
  const fetchCurrentData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/kpiScore/getCurrentMonthKpiScores/${emp_id}`,
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
      console.log("current week data", data);

      if (data.length === 0) {
        setWeekData([]);
        setNoDataFound(true);
      } else {
        setWeekData(data.Scores);
        setWeek(data.Ranges);
        setNoDataFound(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  ///fetch previous week data
  const fetchPreviousData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/kpiScore/getPreviousMonthKpiScores/${emp_id}`,
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
      console.log("previous week data data", data.Scores);

      if (data.length === 0) {
        setWeekData([]);
        setNoDataFound(true);
      } else {
        setWeekData(data.Scores);
        setWeek(data.Ranges);
        setNoDataFound(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  //fetch  aggrigates
  const [aggrigateData, setAggrigateData] = useState();
  const fetchCurrentAggrigate = async () => {
    try {
      const response = await fetch(
        ` http://localhost:4000/api/kpiScore/getCurrentAggregates/${emp_id}`,
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
      console.log("current week aggrigate", data);

      if (data.length === 0) {
        setAggrigate([]);
        setNoDataFound(true);
      } else {
        setAggrigate(data.aggregates);
        setAggrigateData(data);

        setNoDataFound(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  ///fetch  previous week aggrigate
  const fetchPreviousAggrigate = async () => {
    try {
      const response = await fetch(
        ` http://localhost:4000/api/kpiScore/getPreviousAggregates/${emp_id}`,
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
      console.log("aggrigate", data);

      if (data.length === 0) {
        setAggrigate([]);
        setNoDataFound(true);
      } else {
        setAggrigate(data.aggregates);
        setAggrigateData(data);

        setNoDataFound(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      rows: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  //fetch totals
  const [totals, setTotals] = useState();
  const fetchCurrentTotal = async () => {
    try {
      const response = await fetch(
        ` http://localhost:4000/api/kpiScore/getCurrentTotals/${emp_id}`,
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
      console.log("current week totals", data);

      if (data.length === 0) {
        setTotals([]);
        setNoDataFound(true);
      } else {
        setTotals(data);

        setNoDataFound(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const fetchPreviousTotal = async () => {
    try {
      const response = await fetch(
        ` http://localhost:4000/api/kpiScore/getPreviousTotals/${emp_id}`,
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
      console.log("totals", data);

      if (data.length === 0) {
        setTotals([]);
        setNoDataFound(true);
      } else {
        setTotals(data);

        setNoDataFound(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    if (dayOfMonth > 20) {
      fetchPreviousData()
      fetchPreviousAggrigate()
      fetchPreviousTotal()

    } else {
      fetchCurrentAggrigate()
      fetchCurrentData()
      fetchCurrentTotal()
    }
    
  }, []);

  useEffect(() => {
    if (weekData) {
      formik.setValues({
        rows: weekData,
      });
    }
  }, [weekData]);

  return (
    <>
      {weekData && aggrigate ? (
        <form onSubmit={formik.handleSubmit}>
          <StyledTableContainer>
            <Table>
              <StyledTableHead sx={{ bgcolor: "white" }}>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Max Weight</StyledTableCell>
                  {weeks?.map((week, index) => (
                    <StyledTableCell
                      key={week.end_date}
                      colSpan={2}
                      sx={{ textAlign: "center" }}
                    >
                      {`Week${index + 1}`}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell sx={{ textAlign: "center" }}>
                    Aggregate
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  {weeks?.map((week) => (
                    <React.Fragment key={week.start_date}>
                      <StyledTableCell>Score</StyledTableCell>
                      <StyledTableCell>Comment</StyledTableCell>
                    </React.Fragment>
                  ))}
                  <StyledTableCell />
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {formik.values.rows.map((row, rowIndex) => (
                  <StyledTableRow key={row.kpi_id}>
                    <StyledTableCell>{rowIndex + 1}</StyledTableCell>
                    <StyledTableCell>{row.description}</StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {row.weight}
                    </StyledTableCell>
                    {row?.Ranges?.map((week, weekIndex) => (
                      <>
                        <StyledTableCell>{week.score}</StyledTableCell>
                        <StyledTableCell>{week.comment}</StyledTableCell>
                      </>
                    ))}
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {aggrigate[rowIndex]?.aggr}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell sx={{ textAlign: "center" }} colSpan={2}>
                  TOTALS
                </StyledTableCell>
                {totals?.map((item, index) => (
                  <StyledTableCell
                    key={index}
                    sx={{ textAlign: "center" }}
                    colSpan={2}
                  >
                    {item.total}
                  </StyledTableCell>
                ))}
                <StyledTableCell sx={{ textAlign: "center" }} colSpan={1}>
                  {aggrigateData?.totalAchieved}/{aggrigateData?.totalPossible}
                </StyledTableCell>
              </TableRow>
            </Table>
          </StyledTableContainer>
          <AdditionalInfo
            kpiAchieved={aggrigateData?.percentage.toFixed(2)}
            outOfTen={aggrigateData?.outOf10.toFixed(2)}
          />
        </form>
      ) : null}
    </>
  );
};

export default PreviewTable;
