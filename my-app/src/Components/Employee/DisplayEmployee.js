import { Stack, Button, Grid } from "@mui/material";
import React from "react";
import SelectInput from "../../InputFields/SelectInput";
import { Form, Formik } from "formik";
import useFetch from "../../CustomHook/useFetch";
import { useEffect, useState } from "react";
import { DepartmentSchema } from "../ValidationSchema";
import DisplayTable from "../../TableContent/DisplayEmployeeTable";

const DisplayEmployee = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const[departmentId,setDepartmentId]=useState();
  const [Employee, setEmployee] = useState([]);
  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );
  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);

    setDepartmentList(data);
  }, [data, isLoading, error]);
  //fetch Employee according to selected department
  const fetchAllEmployee = async (deptId) => {   
    const response = await fetch(
      `http://localhost:4000/api/emp/getByDept/${deptId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (!response.ok) {
      console.log("Network ");
    }
    const data = await response.json();
    setEmployee(data);
  };
  
  if(Employee){
    Employee.map((obj, index) => {
      obj.name = `${obj.f_name} ${obj.l_name}`;
      return obj;
    });
   
  }

  return (
    <Stack
      spacing={3}
      sx={{
        paddingTop: "50px",
        justifyContent: "centre",
        alignItems: "center",
        width:"100%"
      }}
    >
      <Formik
        initialValues={{
          department: "",
        }}
        validationSchema={DepartmentSchema}
        onSubmit={(values)=>{
          fetchAllEmployee(values.department)
          setDepartmentId(values.department)
        }}
      >
        {(props) => (
          <Grid
           
            component={Form}
            spacing={2}
            sx={{ width: "80%" }}
           
            justifyContent='center'
            alignItems='center'
          >
            
            <Grid item xs={12}>
            <SelectInput
              departmentList={departmentList}
              name="department"
              label="Select Department"
            />
            </Grid>
            <Grid item xs={12} mt={1} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{  height: "56px", alignSelf: "center" ,width:'70%'}}
            >
              Get Employee
            </Button>
            </Grid>
            
          </Grid>
          
        )}
        
      </Formik>
      {Employee?.length!==0 ? <DisplayTable row={Employee} fetchAllEmployee={fetchAllEmployee}  departmentId={departmentId}/>:null }
    </Stack>
  );
 
};
export default DisplayEmployee;
