import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Preview from "./EmployeeComponents/Preview";


const Test = ({ emp_id, rows, startDate, endDate, aggrigate, onKPISubmit }) => {
  const rowsWithAggregate = rows.map((row, index) => ({
    ...row,
    aggregate: aggrigate[index]?.aggr,
  }));
  const Submit = async (values) => {
    console.log("rows", rowsWithAggregate);
    console.log("agg", aggrigate);
    const data = values.map((item, index) => ({
      kpiId: item.KPIid,
      score: item.Score,
      comment: item.Comment,
    }));
    console.log("data", data);
    const response = await fetch(
      "http://localhost:4000/api/kpiScore/addUpdateKpiScore",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empId: emp_id,
          range: {
            startDate,
            endDate,
          },
          scores: data,
        }),
      }
    );
    const res = await response.json();
    console.log(res);
    onKPISubmit();
  };

  const formik = useFormik({
    initialValues: {
      rows: rowsWithAggregate,
    },
    onSubmit: (values) => {
      Submit(values.rows);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 100 }}>KPI ID</TableCell>
              <TableCell sx={{ width: 200 }}>KPI Description</TableCell>
              <TableCell sx={{ width: 70 }}>Max Weight</TableCell>
              <TableCell sx={{ width: 100, textAlign: "center" }}>
                Achieved
              </TableCell>
              <TableCell sx={{ width: 500 }}>Comment</TableCell>
              <TableCell sx={{ width: 100 }}>Aggrigate</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {formik.values.rows?.map((row, index) => (
              <TableRow key={row.KPIid}>
                <TableCell>{index}</TableCell>
                <TableCell>{row.KPI_Description}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.Max_Score}
                </TableCell>
                <TableCell>
                <ToggleButtonGroup
                  color="primary"
                  variant="contained"
                  value={formik.values.rows[index].Score}
                  exclusive
                  onChange={(e, value) => {
                    formik.setFieldValue(`rows.${index}.Score`, value);
                  }}
                  aria-label="Platform"
                >
                  <ToggleButton value={row.Max_Score}>Yes</ToggleButton>
                  <ToggleButton value={0}>No</ToggleButton>
                </ToggleButtonGroup>
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={row.Comment}
                    sx={{ width: "100%" }}
                    onChange={(e) => {
                      formik.setFieldValue(
                        `rows.${index}.Comment`,
                        e.target.value
                      );
                    }}
                  />
                </TableCell>
                <TableCell>{row.aggregate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" type="submit" sx={{ mt: "10px", mb: "20px" }}>
        Submit
      </Button>
      <Preview />
    </form>
  );
};

export default Test;
