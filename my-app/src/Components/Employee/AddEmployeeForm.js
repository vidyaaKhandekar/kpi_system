import {Grid,Button,Select,MenuItem,FormControl,InputLabel,Alert,} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../../CustomHook/useFetch";
import TextInput from "../../InputFields/TextInput";
import SelectInput from "../../InputFields/SelectInput";
import { AddEmployeeFormSchema } from "../ValidationSchema";
///parent component
const AddEmployeeForm = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [fieldError, setFieldError] = useState(null);
  const [Error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  // const {id} = useParams();

  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );

  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);
    setDepartmentList(data);
  }, [data, isLoading, error]);

  //Fetch value of role on the basis deptId

  const handleDepartmentChange = async (e) => {
    console.log("Called");

    const response = await fetch(
      `http://localhost:4000/api/role/getByDept/${e.target.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    // console.log(response);
    if (!response.ok) {
      setFieldError("Network Error");
    }
    const data = await response.json();
    const list = data;
    console.log(list);
    setRoleList(list);
  };
  //on submit
  const onSubmit = async (values, { resetForm }) => {
    console.log("Calling submit");
    //name, email, roleId, deptId
    const firstName = values.firstName;
    const lastName = values.lastName;
    const email = values.email;
    const roleId = values.role;
    const deptId = values.department;
    const apprId = values.apprId;

    if (apprId === "") {
      fetch("http://localhost:4000/api/emp/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: window.localStorage.getItem("token"),
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          roleId: roleId,
          deptId: deptId,
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
      resetForm();
    } else {
      const responce = await fetch("http://localhost:4000/api/emp/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: window.localStorage.getItem("token"),
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          roleId: roleId,
          deptId: deptId,
          apprId: apprId,
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
      resetForm();
    }
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
      spacing={1}
      sx={{
        paddingTop: "20px",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          apprId: "",
          department: "",
          role: "",
        }}
        validationSchema={AddEmployeeFormSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Grid item xs={12} sm={6} md={8}>
            <Form>
              <Grid container spacing={1} sx={{}}>
                <Grid item xs={11}>
                  <TextInput label="Enter First Name*" name="firstName" />
                </Grid>
                <Grid item xs={11}>
                  <TextInput label="Enter Last Name" name="lastName" />
                </Grid>
                <Grid item xs={11}>
                  <TextInput label="Enter Email Address*" name="email" />
                </Grid>
                <Grid item xs={11}>
                  <TextInput label="Enter Manager ID" name="apprId" />
                </Grid>
                <Grid item xs={11}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {props.errors.department && props.touched.department
                        ? `${props.department}`
                        : "Select Department*"}
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
                          : "Select Department*"
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
                {error && (
                  <Grid item xs={11}>
                    <Alert severity="error">{error}</Alert>
                  </Grid>
                )}
                <Grid item xs={11}>
                  <SelectInput
                    departmentList={roleList}
                    name="role"
                    label="Select Designation*"
                  />
                </Grid>
                {fieldError && (
                  <Grid item xs={11}>
                    <Alert severity="error">{fieldError}</Alert>
                  </Grid>
                )}
                {Error && (
                  <Grid item xs={11}>
                    <Alert severity="error">{Error}</Alert>
                  </Grid>
                )}
                <Grid item xs={11}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "200px",
                      height: "50px",
                      alignSelf: "center",
                      
                    }}
                  >
                    Add Role
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        )}
      </Formik>
    </Grid>
  );
};

export default AddEmployeeForm;
