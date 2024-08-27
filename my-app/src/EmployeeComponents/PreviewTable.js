import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {styled,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@mui/material";
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
  const fetchData = async () => {
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
      console.log("previwe data", data.Scores);
     
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
  const fetchAggrigate = async () => {
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
  const fetchTotal = async () => {
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
    fetchData();
    fetchAggrigate();
    fetchTotal();
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
        <form onSubmit={formik.handleSubmit} sx={{height:'300px'}}>
          <StyledTableContainer>
            <Table>
              <StyledTableHead sx={{ bgcolor: "white" }}>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Max Weight</StyledTableCell>
                  {weeks.map((week, index) => (
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
                  {weeks.map((week) => (
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
                <StyledTableCell sx={{ textAlign: "center" }} colSpan={2} >
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
              </TableRow>
            </Table>
          </StyledTableContainer>
          <button type="submit">Submit</button>
        </form>
      ) : null}
    </>
  );
};

export default PreviewTable;
// {row?.Ranges?.map((week, weekIndex) => (
//     <React.Fragment key={week.start_date}>
//       <StyledTableCell>
//         <Slider
//           defaultValue={week.score}
//           sx={{ height: 5 }}
//           valueLabelDisplay="auto"
//           shiftStep={2}
//           step={row.weight}
//           marks
//           min={0}
//           max={row.weight}
//           onChange={(e) => {
//             formik.setFieldValue(
//               `rows.${rowIndex}.Ranges.${weekIndex}.score`,
//               e.target.value
//             );
//           }}
//         />
//       </StyledTableCell>
//       <StyledTableCell>
//         <Input
//           type="text"
//           value={row.Comment}
//           sx={{ width: "100%" }}
//           onChange={(e) => {
//             formik.setFieldValue(
//               `rows.${rowIndex}.Ranges.${weekIndex}.comment`,
//               e.target.value
//             );
//           }}
//         />
//       </StyledTableCell>
//     </React.Fragment>
//   ))}
