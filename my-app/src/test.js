import React from 'react';
import { useFormik } from 'formik';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Input } from '@mui/material';

const Test = ({rows}) => {
  const formik = useFormik({
    initialValues: {
      rows: rows,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    
    <form onSubmit={formik.handleSubmit}>
      <TableContainer sx={{overflowX:"auto"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 100 }} editable="false">KPI ID</TableCell>
              <TableCell sx={{ width: 1300 }}>KPI Description</TableCell>
              <TableCell sx={{ width: 200 }}>Max Weight</TableCell>
              <TableCell sx={{ width: 200 }}>Score</TableCell>
              <TableCell sx={{ width: 500 }}>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formik.values.rows.map((row, index) => (
              <TableRow key={row.KPIid}>
                <TableCell >{row.KPIid}</TableCell>
                <TableCell >{row.KPI_Description}</TableCell>
                <TableCell >{row.Max_Score}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.Score}
                    onChange={(e) => {
                      formik.setFieldValue(`rows.${index}.Score`, e.target.value);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    
                    type="text"
                    value={row.Comment}
                    sx={{width:'100%',}}
                    onChange={(e) => {
                      formik.setFieldValue(`rows.${index}.Comment`, e.target.value);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" type='submit'>Contained</Button>
    </form>
  );
};

export default Test;