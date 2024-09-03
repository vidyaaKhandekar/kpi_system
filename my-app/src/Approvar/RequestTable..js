import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Alert,
  Button,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AdditionalInfo from "./AdditionalInfo";

const StyledTableContainer = styled(TableContainer)`
  border: 1px solid #ddd;
  font-size: 13px;
`;

const StyledTableHead = styled(TableHead)`
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #ddd;
  font-size: 13px;
`;

const StyledTableRow = styled(TableRow)`
  & > th {
    position: sticky;
    left: 0;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 13px;
  }
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid #ddd;
  font-size: 13px; /* reduce font size */
  padding: 8px;
`;
const RequestTable = ({
  emp_id,
  appr_id,
  requestID,
  weekData,
  aggrigate,
  totals,
  weeks,
  aggrigateData,
  month,
  year,
  reRender,
}) => {
  const [Error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const Submit = async (values, feedback) => {
    const data = values.map((item, index) => ({
      kpiId: item.kpi_id,
      ranges: item.Ranges,
    }));
    // console.log("data", data);
    fetch(`http://localhost:4000/api/emp/approveRequest/${requestID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // const empId: 2,
      // "month": "Aug",
      // "year": 2024,
      body: JSON.stringify({
        empId: emp_id,
        month: month,
        year: year,
        ranges: weeks,
        scores: data,
        feedback:feedback,
        apprId:appr_id
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          setSuccess("Successfully Approved !!!");
        } else {
          setError("Error with server ");
        }
      })
      .catch((error) => {
        setError(error.message);
      });

    reRender();
  };

  const formik = useFormik({
    initialValues: {
      rows: [],
      feedback: "",
    },
    onSubmit: (values) => {
      Submit(values.rows, values.feedback);
     
    },
  });
  useEffect(() => {
    if (weekData) {
      formik.setValues({
        rows: weekData,
      });
    }
  }, [weekData]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);
  useEffect(() => {
    if (Error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [Error]);
  return (
    <>
      {weekData && aggrigate ? (
        <form onSubmit={formik.handleSubmit}>
          {success && (
            <Alert
              severity="success"
              duration={2000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              {success}
            </Alert>
          )}

          <StyledTableContainer
            sx={{
              width: { xs: 400, sm: 690, md: 700, lg: 1000, xl: 1200 },
              maxWidth: { xs: 400, sm: 690, md: 700, lg: 1000, xl: 1200 },
            }}
          >
            <Table>
              <StyledTableHead sx={{ bgcolor: "white" }}>
                <TableRow>
                  <StyledTableCell>NO</StyledTableCell>
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
                {formik.values.rows?.map((row, rowIndex) => (
                  <StyledTableRow key={row.kpi_id}>
                    <StyledTableCell>{rowIndex + 1}</StyledTableCell>
                    <StyledTableCell>{row.description}</StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {row.weight}
                    </StyledTableCell>
                    {row?.Ranges?.map((week, weekIndex) => (
                      <>
                        <StyledTableCell>
                          <ToggleButtonGroup
                            color="primary"
                            variant="contained"
                            value={
                              formik.values.rows[rowIndex].Ranges[weekIndex]
                                .score
                            }
                            exclusive
                            onChange={(e, value) => {
                              formik.setFieldValue(
                                `rows.${rowIndex}.Ranges.${weekIndex}.score`,
                                value
                              );
                            }}
                            aria-label="Platform"
                            sx={{
                              fontSize: 10, // reduce font size
                              "& .MuiButtonBase-root": {
                                padding: "3px",
                                fontSize: "10px",
                              },
                            }}
                          >
                            <ToggleButton value={row.weight}>Yes</ToggleButton>
                            <ToggleButton value={0}>No</ToggleButton>
                          </ToggleButtonGroup>
                        </StyledTableCell>
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
                <StyledTableCell
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                  colSpan={1}
                >
                  {aggrigateData.totalAchieved}/{aggrigateData.totalPossible}
                </StyledTableCell>
              </TableRow>
            </Table>
          </StyledTableContainer>

          <Grid container spacing={2}>
            <Grid item xs={5.8}>
              <AdditionalInfo
                kpiAchieved={aggrigateData.percentage.toFixed(2)}
                outOfTen={aggrigateData.outOf10.toFixed(2)}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: "20px" }}>
              <TextField
                label="FEEDBACK"
                sx={{
                  width: "90%",
                }}
                multiline
                color="primary"
                 focused 
                rows={3}
                value={formik.values.feedback}
                onChange={(e) => {
                  formik.setFieldValue("feedback", e.target.value);
                }}
                onBlur={formik.handleBlur}
                
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained">
            APPROVE
          </Button>
          {Error && <Alert severity="error">{Error}</Alert>}
        </form>
      ) : null}
    </>
  );
};

export default RequestTable;
