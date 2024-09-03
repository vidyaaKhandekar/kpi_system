import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../../CustomHook/useFetch";
import TextInput from "../../InputFields/TextInput";
import SelectInput from "../../InputFields/SelectInput";
import { AddRoleformSchema } from "../ValidationSchema";

const AddRoleForm = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );
  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);

    setDepartmentList(data);
  }, [data, isLoading, error]);

  //onsubmit
  const onSubmit = async (values, { resetForm }) => {
    const role = values.role;
    const dept = values.department;
    const responce = await fetch("http://localhost:4000/api/role/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({ name: role, deptId: dept }),
    });

    const data = await responce.json();

    console.log(data);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        department: "",
        role: "",
      }}
      validationSchema={AddRoleformSchema}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Grid
        container
          spacing={3}
          component={Form}
          sx={{
            width: "80%",
            height: "300px",
            justifyContent: "center",
            alignItems: "centre",
          }}
        >
          <Grid xs={11}>
            <SelectInput
              departmentList={departmentList}
              name="department"
              label="Select Department"
            />
          </Grid>
          <Grid xs={11}>
            <TextInput label="Enter Designation" name="role" />
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "200px", height: "50px",mt:'10px',bgcolor:'#240750' }}
            >
              Add Designation
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default AddRoleForm;
