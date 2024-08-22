import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import useFetch from "../CustomHook/useFetch";
import { useState,useEffect } from "react";
const PieCharts = () => {
    const [list, setList] = useState([]);
  
    const { data, isLoading, error } = useFetch(
      "http://localhost:4000/api/emp/getCountByDept"
    );
  
    useEffect(() => {
      if (isLoading) return;
      if (error) return console.error(error);
      setList(data);
    }, [data, isLoading, error]);
  
    const Data = list?.map((obj, index) => ({ id: index + 1, value: obj.employeecount,label: obj.name }));
    const label=list?.map((obj, index) => ({ label: obj.name }));
    console.log(Data, "data");
  
    return (
    
        <PieChart
      series={[{ data: Data, innerRadius: 0, outerRadius: 85 ,highlightScope: { faded: 'global', highlighted: 'item' }, faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },},]}
      
      width={350}
      height={200}
      margin={{ top: 0, bottom: 0, left: 0, right:100 }}
      
      slotProps={{
        legend: {
          labelStyle: {
            fontSize: 14,
            fill: 'black',
          },
          position: { vertical: 'middle', horizontal: 'right' },
          padding:"30px"
        },
      }}
      sx={{}}
    />
      );
  };
const card = (
  <React.Fragment>
    <CardContent sx={{height:'220px'}}>
      <Grid container  >
        <Grid item sx={12}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        Employee Distribution by Department 
      </Typography>
        </Grid>
        <Grid item>
          <PieCharts />
        </Grid>
      </Grid>
    </CardContent>
  </React.Fragment>
);

export default function EmployeePieChart() {
  return (
    <Box sx={{ minWidth: 275 ,}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
