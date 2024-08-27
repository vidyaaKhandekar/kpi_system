import React, { useEffect, useState } from "react";
import {Box,Table,TableBody,TableCell,TableHead,TableRow,TableContainer,} from "@mui/material";

const Team = () => {
  const link = "http://localhost:4000/api/emp/getByAppr";
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [employee, setEmployee] = useState();
  const [NoData, setNoData] = useState();
  const [error, setError] = useState();
  const emp_id = userData.id;
  const fetchData = async () => {
    const response = await fetch(`http://localhost:4000/api/emp/getByAppr/${emp_id}`);
    if (!response.ok) {
      setError("Problem in Fetching data");
      return;
    }

    const data = await response.json();

    if (data.length === 0) {
      setEmployee([]);
      setNoData(true);
    } else {
      setEmployee(data);
      setNoData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <TableContainer sx={{ maxWidth: 800, margin: "auto",bgcolor:'#FDFFE2' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 100 }}>ID</TableCell>
              <TableCell sx={{ width: 200 }}>Name</TableCell>
              <TableCell sx={{ width: 250 }}>Email</TableCell>
              <TableCell sx={{ width: 150 }}>Department</TableCell>
              <TableCell sx={{ width: 150 }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell sx={{ width: 100 }}>{index+1}</TableCell>
                <TableCell sx={{ width: 250 }}>
                  {item.first_name + " " + item.last_name}
                </TableCell>
                <TableCell sx={{ width: 250 }}>{item.email}</TableCell>
                <TableCell sx={{ width: 100 }}>{item.department.name}</TableCell>
                <TableCell sx={{ width: 100 }}>{item.role.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Team;