import  React ,{useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WysiwygSharpIcon from "@mui/icons-material/WysiwygSharp";
import { Badge, Grid } from "@mui/material";
import Groups2SharpIcon from "@mui/icons-material/Groups2Sharp";
import AppsIcon from "@mui/icons-material/Apps";


export default function OverviewCard() {

   const [totalEmployee,setTotalEmployee]=useState();
   const[totalDepartment,setTotalDepartment]=useState();
   const[totalRole,setTotalRole]=useState();

  const  fetchData =async()=>{
    const response1= await fetch("http://localhost:4000/api/emp/getCountAll")
    const data1=await response1.json();
    setTotalEmployee(data1.count);
    const response2= await fetch("http://localhost:4000/api/dept/getCount")
    const data2=await response2.json();
    setTotalDepartment(data2.count);
    const response3= await fetch("http://localhost:4000/api/role/getCount")
    const data3=await response3.json();
    setTotalRole(data3.count);
  }
  useEffect(
    ()=>{
      fetchData();
    },[]
  )
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined"> <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 14, mb: "20px" }}
              color="text.secondary"
              gutterBottom
            >
              Organizational Summary:
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            spacing={1}
            direction="row"
            sx={{ justifyContent: "centre", alignItems: "centre" }}
          >
            <Grid
              item
              xs={3.5}
              sx={{ justifyContent: "centre", alignItems: "centre" }}
            >
              <Badge
                badgeContent={totalEmployee}
                color="primary"
                badgeStyle={{
                  fontSize: 24, // increase font size
                  fontWeight: 600, // make it bold
                  padding: "8px 12px", // add some padding
                  borderRadius: 10, // add some rounded corners
                }}
              >
                <Groups2SharpIcon
                  color="primary"
                  sx={{ height: "60px", width: "60px", ml: "17px" }}
                />
              </Badge>
              <Typography
                sx={{ fontSize: 13 }}
                color="text.secondary"
                gutterBottom
              >
                Total Employee
              </Typography>
            </Grid>
            <Grid item xs={4.5} sx={{ ml: "5px" }}>
              <Badge
                badgeContent={totalDepartment}
                color="primary"
                badgeStyle={{
                  fontSize: 24, // increase font size
                  fontWeight: 600, // make it bold
                  padding: "8px 12px", // add some padding
                  borderRadius: 10, // add some rounded corners
                }}
              >
                <WysiwygSharpIcon
                  color="primary"
                  sx={{ height: "60px", width: "60px", ml: "20px" }}
                />
              </Badge>
              <Typography
                sx={{ fontSize: 13 }}
                color="text.secondary"
                gutterBottom
              >
                Total Departments
              </Typography>
            </Grid>
            <Grid item xs={3.5}>
              <Badge
                badgeContent={totalRole}
                color="primary"
                badgeStyle={{
                  fontSize: 24, // increase font size
                  fontWeight: 600, // make it bold
                  padding: "8px 12px", // add some padding
                  borderRadius: 10, // add some rounded corners
                }}
              >
                <AppsIcon
                  color="primary"
                  sx={{ height: "60px", width: "60px", ml: "0px" }}
                />
              </Badge>
              <Typography
                sx={{ fontSize: 13 }}
                color="text.secondary"
                gutterBottom
              >
                Total Roles
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent></Card>
    </Box>
  );
}
