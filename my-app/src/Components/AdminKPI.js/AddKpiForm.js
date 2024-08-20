import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,Alert
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../../CustomHook/useFetch";
import TextInput from "../../InputFields/TextInput";
import SelectInput from "../../InputFields/SelectInput";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
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
    console.log(data);
    setDepartmentList(data);
  }, [data, isLoading, error]);

  const handleDepartmentChange = async (e) => {
    console.log("Called");

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
      .then((response) => {
        if (response.ok) {
          setSuccess("Successfully added");
        } else {
          setError("Error in Adding ");
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
        paddingTop: "20px",
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
            <Grid component={Form} spacing={2}>
              <Grid container spacing={1}>
                <Grid item xs={6} >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {props.errors.department && props.touched.department
                        ? `${props.department}`
                        : "Select Department"}
                    </InputLabel>
                    <Select
                      value={props.values.department}
                      defaultValue=""
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      error={
                        props.errors.department && props.touched.department
                      }
                      label={
                        props.errors.department && props.touched.department
                          ? `${props.department}`
                          : "Select Department"
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
                <Grid item xs={6}>
                  <SelectInput
                    departmentList={roleList}
                    name="role"
                    label="Select Designation"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextInput label="Enter KPI Description" name="description" />
              </Grid>
              <Grid item xs={12}>
                <TextInput label="Enter Maximum Weight" name="weight" />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "200px", height: "50px", alignSelf: "center" ,mt:"10px"}}
                >
                  Add KPI
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddKpiForm;
