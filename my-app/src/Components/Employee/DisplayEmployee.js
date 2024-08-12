import { Stack, Button } from "@mui/material";
import React from "react";
import SelectInput from "../../InputFields/SelectInput";
import { Form, Formik } from "formik";
import useFetch from "../../CustomHook/useFetch";
import { useEffect, useState } from "react";
import { DepartmentSchema } from "../ValidationSchema";
import DisplayEmployeeTable from "./DisplayEmployeeTable";



const DisplayEmployee = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [Employee, setEmployee] = useState([]);
  const [departmentId,setDepartmentID]=useState("");
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
    setDepartmentID(deptId);
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
        
        <DisplayEmployeeTable EmployeeList={Employee} dept_ID={departmentId}/>
      
    </Stack>
  );
};

export default DisplayEmployee;
