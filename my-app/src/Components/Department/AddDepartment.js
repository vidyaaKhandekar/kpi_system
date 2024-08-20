import { Stack, Typography, Button, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import TextInput from "../../InputFields/TextInput";
import { DepartmentSchema } from "../ValidationSchema";

const AddDepartment = ({ fetchData }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const onSubmit = async (values, { resetForm }) => {
    const responce = await fetch("http://localhost:4000/api/dept/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("token"),
      },

      body: JSON.stringify({ name: values.department }),
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
    fetchData();

    resetForm();
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);
  return (
    <Stack
      spacing={3}
      sx={{
        paddingTop: "10px",
        justifyContent: "centre",
        alignItems: "center",
      }}
    >
      {success && (
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
      )}
      {error && (
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
      )}
      <Typography
        variant="h6"
        sx={{ alignSelf: "center", fontFamily: "revert" }}
      >
        Department
      </Typography>

      <Formik
        initialValues={{ department: "" }}
        onSubmit={onSubmit}
        validationSchema={DepartmentSchema}
      >
        {(props) => (
          <Stack
            component={Form}
            direction="row"
            spacing={2}
            sx={{ width: "70%" }}
          >
            <TextInput
              label="Department"
              name="department"
              sx={{ flex: "8" }}
            />
            <Button variant="contained" type="submit" sx={{ flex: "2" }}>
              ADD Department
            </Button>
          </Stack>
        )}
      </Formik>
    </Stack>
  );
};

export default AddDepartment;
