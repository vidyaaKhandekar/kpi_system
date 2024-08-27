import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const MyForm = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const emp_id = userData.id;
  const [weekData, setWeekData] = useState();
  const [weeks, setWeek] = useState();
  const [noDataFound, setNoDataFound] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
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

  const formik = useFormik({
    initialValues: {
      rows: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    fetchData();
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
      {weekData ? (
        <form onSubmit={formik.handleSubmit}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Max Weight</TableCell>
                  {weeks.map((week, index) => (
                    <TableCell
                      key={week.end_date}
                      colSpan={2}
                      sx={{ textAlign: "center" }}
                    >
                      {`Week${index + 1}`}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  {weeks.map((week) => (
                    <React.Fragment key={week.start_date}>
                      <TableCell>Score</TableCell>
                      <TableCell>Comment</TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {formik.values.rows.map((row, rowIndex) => (
                  <TableRow key={row.kpi_id}>
                    <TableCell>{rowIndex + 1}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.weight}
                    </TableCell>
                    {row?.Ranges?.map((week, weekIndex) => (
                      <>
                        <TableCell>{week.score}</TableCell>
                        <TableCell>{week.comment}</TableCell>
                      </>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <button type="submit">Submit</button>
        </form>
      ) : null}
    </>
  );
};

export default MyForm;
// {row?.Ranges?.map((week, weekIndex) => (
//     <React.Fragment key={week.start_date}>
//       <TableCell>
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
//       </TableCell>
//       <TableCell>
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
//       </TableCell>
//     </React.Fragment>
//   ))}
