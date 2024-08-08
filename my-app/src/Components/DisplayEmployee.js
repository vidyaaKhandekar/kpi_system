import { Stack, Button, Select, Typography } from "@mui/material";
import React from "react";
import SelectInput from "../InputFields/SelectInput";
import { Form, Formik } from "formik";
import useFetch from "../CustomHook/useFetch";
import { useEffect, useState } from "react";
import { DepartmentSchema } from "./ValidationSchema";
import DisplayDepartment from "./DisplayDepartment";
import AddRole from "./AddRole";
import DisplayEmployeeTable from "./DisplayEmployeeTable";
import Employee from "./Employee";


const DisplayEmployee = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [Employee, setEmployee] = useState([]);
  // const[dept,setDept]=useState("");
  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );
  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);

    setDepartmentList(data);
  }, [data, isLoading, error]);
  //fetch role according to selected department
  const onSubmit = async (values, { resetForm }) => {
    const deptId = values.department;   
    const response = await fetch(
      `http://localhost:4000/api/emp/getByDept/${deptId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      console.log("Network ");
    }
    const data = await response.json();
    const list=data.employees;
    console.log(list);
    setEmployee(list);
  };
  

  return (
    <Stack
      spacing={3}
      sx={{
        paddingTop: "50px",
        justifyContent: "centre",
        alignItems: "center",
      }}
    >
   
      <Formik
        initialValues={{
          department: "",
        }}
        validationSchema={DepartmentSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Stack
            direction="row"
            component={Form}
            spacing={2}
            sx={{ width: "80%" }}
          >
            <SelectInput
              departmentList={departmentList}
              name="department"
              label="department"
              error={props.errors.department ? true : false}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "200px", height: "56px", alignSelf: "center" }}
            >
              Get Employee
            </Button>
          </Stack>
          
        )}
        
      </Formik>
        
        <DisplayEmployeeTable EmployeeList={Employee}/>
    </Stack>
  );
};

export default DisplayEmployee;
