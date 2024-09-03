import React, { useEffect, useState } from "react";
import {
    Alert,Box,Grid,styled,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField,
} from "@mui/material";
import AdditionalInfo from "../Approvar/AdditionalInfo";

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
    
    left: 0;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 13px;
  }
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid #ddd;
  font-size: 13px; /* reduce font size */


`;

const HistoryTable = ({weekData,aggrigate,totals,weeks,aggrigateData,feedback
}) => {



    useEffect(()=>{
        console.log("weekData",weekData)
        console.log("aggrigate",aggrigate)
        console.log("totals",totals)
        console.log("weeks",weeks)
        console.log("aggrigateData",aggrigateData)
        console.log("feedback",feedback)
    },[])
  return (
    <>
      {weekData && aggrigate ? (
        <Box>
          <StyledTableContainer sx={{
              width: { xs: 400, sm: 690, md: 700, lg: 1000, xl: 1200 },
              maxWidth: { xs: 400, sm: 690, md: 700, lg: 1000, xl: 1200 },
            }}>
            <Table>
              <StyledTableHead sx={{ bgcolor: "white" }}>
                <StyledTableRow>
                <StyledTableCell>NO</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Max Weight</StyledTableCell>
                  {weeks?.map((week, index) => (
                    <StyledTableCell
                      key={week.end_date}
                      colSpan={2}
                      sx={{ textAlign: "center", width: 100,}}
                    >
                      {`Week${index + 1}`}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell sx={{ textAlign: "center" }}>
                    Aggregate
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  {weeks?.map((week) => (
                    <React.Fragment key={week?.start_date}>
                      
                      <StyledTableCell colSpan={2}>Score</StyledTableCell>
                    </React.Fragment>
                  ))}
                  <StyledTableCell />
                </StyledTableRow>
              </StyledTableHead>
              <TableBody>
                {weekData?.map((row, rowIndex) => (
                  <StyledTableRow key={row?.kpi_id}>
                    <StyledTableCell>{rowIndex + 1}</StyledTableCell>
                    <StyledTableCell>{row?.description}</StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {row?.weight}
                    </StyledTableCell>
                    {row?.Ranges?.map((week, weekIndex) => (
                      
                        <StyledTableCell  colSpan={2}>{week?.score}</StyledTableCell>
                   
                    ))}
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {aggrigate[rowIndex]?.aggr}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <StyledTableRow>
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
                    {item?.total}
                  </StyledTableCell>
                  
                ))}

              </StyledTableRow>
            </Table>
          </StyledTableContainer>

          <Grid container spacing={2}>
            <Grid item xs={5.8}>
              <AdditionalInfo
                kpiAchieved={aggrigateData?.percentage?.toFixed(2)}
                outOfTen={aggrigateData?.outOf10?.toFixed(2)}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: "20px" }}>
              <TextField
                label="FEEDBACK"
                sx={{
                  width: "90%",
                }}
                multiline
                focused
                rows={3}
                value={feedback}
                
              />
            </Grid>
          </Grid>
      
        </Box>
      ) : null}
    </>
  );
};

export default HistoryTable;
