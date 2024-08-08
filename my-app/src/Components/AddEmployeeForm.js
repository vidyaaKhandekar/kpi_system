import { Stack, Typography, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../CustomHook/useFetch";
import TextInput from "../InputFields/TextInput";
import SelectInput from "../InputFields/SelectInput";
import { AddEmployeeFormSchema } from "./ValidationSchema";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

///parent component
const AddEmployeeForm = () => {

    
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );

  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);

    setDepartmentList(data);
  }, [data, isLoading, error]);
  console.log(Formik.values);
  //Fetch value of role on the basis deptId

  const handleDepartmentChange = async (e) => {
    console.log("Called");
    // setSelectedDepartment(e.target.value);
    const response = await fetch(
        `http://localhost:4000/api/role/getByDept/${e.target.value}`,
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
      const list=data.roles;
      console.log(list);
      setRoleList(list);
  };
 

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "30px" }}
      >
        <Button
          sx={{ width: "15%", height: "55px" }}
          component={Link}
          to="/employee"
        >
          <CloseIcon />
        </Button>
      </div>
      <Stack
        spacing={1}
        sx={{
          paddingTop: "20px",
          justifyContent: "centre",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ alignSelf: "center" }}>
          Add Employee
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            apprId: "",
            department: "",
            role: "",
          }}
          validationSchema={AddEmployeeFormSchema}
          //   onSubmit={onSubmit}
        >
          {(props) => (
            <Stack component={Form} spacing={2} sx={{ width: "600px" }}>
              <TextInput label="name" name="name" />
              <TextInput label="email" name="email" />
              <TextInput label="apprId" name="apprId" />

              <SelectInput
                departmentList={departmentList}
                name="department"
                label="department"
                // value={props.values.department}
                onChange={(e) => {
                handleDepartmentChange(e);
              }}
              />
              <SelectInput
                departmentList={roleList}
                name="role"
                label="role"
                error={props.errors.department ? true : false}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ width: "200px", height: "50px", alignSelf: "center" }}
              >
                Add Role
              </Button>
            </Stack>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default AddEmployeeForm;
