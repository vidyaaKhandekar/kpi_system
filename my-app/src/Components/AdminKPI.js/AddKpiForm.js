import {Grid,Button,Select,MenuItem,FormControl,InputLabel,Alert,} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../../CustomHook/useFetch";
import TextInput from "../../InputFields/TextInput";
import SelectInput from "../../InputFields/SelectInput";
import { AddKpiFormSchema } from "../ValidationSchema";

const AddKpiForm = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [Error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );

  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);
    setDepartmentList(data);
  }, [data, isLoading, error]);

  const handleDepartmentChange = async (e) => {
    const response = await fetch(
      `http://localhost:4000/api/role/getByDept/${e.target.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);
    if (!response.ok) {
      console.log("Network ");
    }
    const data = await response.json();
    const list = data;
    setRoleList(list);
  };

  const onSubmit = async (values, { resetForm }) => {
    console.log("Calling submit");
    // description, weight, roleId
    const description = values.description;
    const weight = values.weight;
    const roleId = values.role;
    fetch("http://localhost:4000/api/kpi/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        description: description,
        weight: weight,
        roleId: roleId,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setSuccess("Successfully added");
          
        } else {
          setError(data.message);
          
        }
      })
      .catch((error) => {
        setError(error.message);
      });

    resetForm({ description: "", weight: "" });
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);
  useEffect(() => {
    if (Error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [Error]);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {success && (
        <Grid item xs={12}>
          <Alert
            severity="success"
            duration={2000}
            position={{
              top: 16,
              right: 16,
            }}
          >
            {success}
          </Alert>
        </Grid>
      )}
      {Error && (
        <Grid item xs={12}>
          <Alert
            severity="danger"
            duration={2000}
            position={{
              top: 16,
              right: 16,
            }}
          >
            {Error}
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Formik
          initialValues={{
            description: "",
            weight: "",
            department: "",
            role: "",
          }}
          validationSchema={AddKpiFormSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={5.6} md={5.6} sx={{"&.MuiGrid-item": {
                p: 0,
                mt:1,
                  ml:2
              },}}>
                  <FormControl fullWidth>
                    <InputLabel >
                     Department
                    </InputLabel>
                    <Select
                      value={props.values.department}
                      label={"Department"}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      error={
                        props.errors.department && props.touched.department
                      }
                      onChange={(e) => {
                        handleDepartmentChange(e);
                        props.setFieldValue("department", e.target.value);
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                            overflowY: "auto",
                          },
                        },
                      }}
                    >
                      {departmentList?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5.6} md={5.6} sx={{"&.MuiGrid-item": {
                p: 0,
                ml:{
                  xs:2,
                  sm:1,
                  md:1
                },
                mt:1
              },}}>
                  <SelectInput
                    departmentList={roleList}
                    name="role"
                    label="Designation"
                  />
                </Grid>
                <Grid item xs={12} sx={{"&.MuiGrid-item": {
                p: 0,
                m:0,
                mt:1,
                ml:2
              },}}>
                  <TextInput label="KPI Description" name="description" />
                </Grid>
                <Grid item xs={12} sx={{"&.MuiGrid-item": {
                p: 0,
                m:0,
                mt:1,
                ml:2
              },}}>
                  <TextInput label="Maximum Weight" name="weight" />
                </Grid>
                <Grid item xs={12} sx={{"&.MuiGrid-item": {
                p: 0,
                m:0,ml:2,
              },display: "flex",justifyContent: "center"}} >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: 300,
                      height: "50px",
                      alignSelf: "center",
                      mt: "10px",
                    }}
                  >
                    Add KPI
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddKpiForm;
