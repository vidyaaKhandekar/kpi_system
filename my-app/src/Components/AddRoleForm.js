import { Stack, Typography, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../CustomHook/useFetch";
import TextInput from "../InputFields/TextInput";
import SelectInput from "../InputFields/SelectInput";
import { AddRoleformSchema } from "./ValidationSchema";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
const AddRoleForm = () => {
  console.log("Form rendeted");
  const [departmentList, setDepartmentList] = useState([]);
  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );
  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);

    setDepartmentList(data);
  }, [data, isLoading, error]);
  console.log(Formik.values);
  //onsubmit
  const onSubmit = async (values, { resetForm }) => {
    const role = values.role;
    const dept = values.department;
    const responce = await fetch("http://localhost:4000/api/role/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: role, deptId: dept }),
    });

    const data = await responce.json();

    console.log(data);
    resetForm();
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "30px" }}
      >
        <Button  sx={{ width: "15%",height:"55px" }} component={Link} 
      to='/role'><CloseIcon/></Button>
      </div>
      <Stack
        spacing={3}
        sx={{
          paddingTop: "50px",
          justifyContent: "centre",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ alignSelf: "center" }}>
          ADD ROLE
        </Typography>
        <Formik
          initialValues={{
            department: "",
            role: "",
          }}
          validationSchema={AddRoleformSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Stack component={Form} spacing={2} sx={{ width: "600px" }}>
              <SelectInput
                departmentList={departmentList}
                name="department"
                label="department"
                error={props.errors.department ? true : false}
              />
              <TextInput
                label="role"
                name="role"
                error={props.errors.role ? true : false}
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

export default AddRoleForm;
