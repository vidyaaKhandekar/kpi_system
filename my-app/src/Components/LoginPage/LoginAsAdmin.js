import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Grid } from "@mui/material";
import { LoginAsAdminSchema } from "../ValidationSchema";
import TextInput from "../../InputFields/TextInput";
import Alert from "@mui/material/Alert";

const LoginAsAdmin = () => {

  const [error, setError] = useState(null);
  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;
    const response = await fetch("http://localhost:4000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
         localStorage.setItem('token', data.token);
         localStorage.setItem('username',data.username)
         localStorage.setItem("userProfile","Admin")
          window.location.href = "/";
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginAsAdminSchema}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Grid
          spacing={3}
          component={Form}
          sx={{
            width: "100%",
            height: "300px",
            justifyContent: "center",
            alignItems: "centre",
          }}
        >
          <Grid xs={11}>
            <TextInput type="text" label="Enter Username" name="username" sx={{width:'300px' , mb:'20px',}} id="standard-basic" variant="standard" />
          </Grid>
          <Grid xs={11}>
            <TextInput type="password" label="Enter Password" name="password" sx={{width:'300px'}}  id="standard-basic" variant="standard"  />
          </Grid>

          {error && (
            <Grid xs={11} alignSelf="center">
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

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
              sx={{
                width: "300px",
                height: "50px",
                mt: "25px",
                bgcolor: "#240750",
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default LoginAsAdmin;
