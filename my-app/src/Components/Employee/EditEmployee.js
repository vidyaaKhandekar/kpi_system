/* eslint-disable react-hooks/exhaustive-deps */
import {Grid,Button,Select,MenuItem,FormControl,InputLabel,Alert,FormHelperText,} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../../CustomHook/useFetch";
import TextInput from "../../InputFields/TextInput";
import SelectInput from "../../InputFields/SelectInput";
import { AddEmployeeFormSchema } from "../ValidationSchema";
///parent component
const EditEmployeeForm = ({
  editEmployeeId,
  initialValue,
  handleClose,
  fetchAllEmployee,
  departmentId,
  setSuccess
}) => {
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [fieldError, setFieldError] = useState(null);
  const [Error, setError] = useState(null);
  const [deptId, setDeptId] = useState(initialValue?.department);

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
    const response = await fetch(
      `http://localhost:4000/api/role/getByDept/${deptId}`,
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
    const f_name = values.firstName;
    const l_name = values.lastName;
    const email = values.email;
    const role_id = values.role;
    const dept_id = values.department;
    let appr_id = values.apprId;
    if (appr_id === "") appr_id = null;

    fetch(`http://localhost:4000/api/emp/update/${editEmployeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        f_name: f_name,
        l_name: l_name,
        email: email,
        role_id: role_id,
        dept_id: dept_id,
        appr_id: appr_id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess("Successfully Updated");
          handleClose();
          fetchAllEmployee(departmentId);
        } else {
          setError("Error in Adding ");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
    
   
    
  };
  useEffect(() => {
    if (Error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [Error]);
  useEffect(() => {
    handleDepartmentChange();

  }, [deptId]);


  return (
    <Grid
      container
      spacing={1}
      sx={{
        paddingTop: "20px",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "900px",
        width: "100%",
      }}
    >
    <Formik
        initialValues={initialValue}
        validationSchema={AddEmployeeFormSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Grid
              container
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={6}>
                <TextInput
                  label="First Name*"
                  name="firstName"
                  value={props.values?.firstName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput label="Last Name*" name="lastName" />
              </Grid>
              <Grid item xs={12}>
                <TextInput label="Email Address*" name="email" />
              </Grid>
              <Grid item xs={12}>
                <TextInput label="Manager ID" name="apprId" />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Department*</InputLabel>
                  <Select
                    value={props.values?.department}
                    defaultValue=""
                    error={props.errors.department && props.touched.department}
                    label="Department*"
                    onChange={(e) => {
                      props.setFieldValue("department", e.target.value);
                      setDeptId(e.target.value);
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

                  {props.errors.department ? (
                    <FormHelperText
                      sx={{
                        color: "red",
                        fontSize: "12px",
                        m: 0,
                      }}
                    >
                      {props.errors.department}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <SelectInput
                  departmentList={roleList}
                  name="role"
                  label="Designation*"
                  value={props.values?.role}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "50px",
                  }}
                >
                  Edit Employee
                </Button>
              </Grid>
              {fieldError && (
                <Grid item xs={12}>
                  <Alert severity="error">{fieldError}</Alert>
                </Grid>
              )}
              {Error && (
                <Grid item xs={12}>
                  <Alert severity="error">{Error}</Alert>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default EditEmployeeForm;
