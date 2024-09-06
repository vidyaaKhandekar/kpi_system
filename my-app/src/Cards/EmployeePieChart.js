import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid,useMediaQuery } from "@mui/material";
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
    const label=list?.map((obj, index) => ({ label: obj.name }));const isXs = useMediaQuery((theme) => theme.breakpoints.only('xs'));
    const isSm = useMediaQuery((theme) => theme.breakpoints.only('sm'));
    const isMd = useMediaQuery((theme) => theme.breakpoints.only('md'));
    const isLg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  
    let width, height,fontSize,right,outerRadius;
    if (isXs) {
      width = 250;
      height = 150;
      fontSize=12;
      right=117;
      outerRadius=60;

    } else if (isSm) {
      width = 300;
      height = 180;
      fontSize=12;
      
    
    } else if (isMd) {
      width = 350;
      height = 200;
      fontSize=13;
     
    } else if (isLg) {
      width = 400;
      height = 200;
      fontSize=14;
     
  
    }
  
    return (
      <PieChart
        series={[{ data: Data, innerRadius: 0, outerRadius: 60 ,highlightScope: { faded: 'global', highlighted: 'item' }, faded: { innerRadius: 20, additionalRadius: -30, color: 'gray' },},]}
        
        width={width}
        height={height}
        margin={{ top: 0, bottom: 0, left: 0, right:117 }}
        
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 12,
              fill: 'black',
            },
            position: { vertical: 'middle', horizontal: 'right' },
            padding:"0px"
          },
        }}
      />
      );
  };
const card = (
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

);

export default function EmployeePieChart() {
  return (
    <Box sx={{ minWidth: 275 ,}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
