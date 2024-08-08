import { Stack, Typography, Button, Select, MenuItem ,FormControl,InputLabel} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../CustomHook/useFetch";
import TextInput from "../InputFields/TextInput";
import SelectInput from "../InputFields/SelectInput";

import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
///parent component
const AddEmployeeForm = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );

  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);
    console.log(data)
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
        },
      }
    );
    // console.log(response);
    if (!response.ok) {
      console.log("Network ");
    }
    const data = await response.json();
    const list = data.roles;
    console.log(list);
    setRoleList(list);
  };
  //on submit
  const onSubmit = async (values, { resetForm }) => {
    console.log("Calling submit");
    //name, email, roleId, deptId
    const name = values.name;
    const email = values.email;
    const roleId = values.role;
    const deptId = values.department;
    const apprId = values.apprId;

    if (apprId === "") {
      const responce = await fetch("http://localhost:4000/api/emp/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          roleId: roleId,
          deptId: deptId,
        }),
      });
      const data = await responce.json();
      console.log(data);
      resetForm();
    } else {
      const responce = await fetch("http://localhost:4000/api/emp/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          roleId: roleId,
          deptId: deptId,
          apprId: apprId,
        }),
      });
      const data = await responce.json();
      console.log(data);
      resetForm();
    }
  };
  //Yup validation
  const AddEmployeeFormSchema = yup.object().shape({
    name: yup.string().required("name is required field"),
    email: yup
      .string()
      .email("Invalid Email")
      .matches(
        /@tekditechnologies\.com$/,
        "Email must end with @tekditechnologies.com"
      )
      .required("Email is required"),
    department: yup.string().required("Department is required field"),
    //  role:yup.string().when('department', {
    //   is: true,
    //   then: (AddEmployeeFormSchema)=>AddEmployeeFormSchema.oneOf(
    //     roleList.map(item => item.id),
    //     'Select a department'
    //   ).required('Role is required'),
    //   otherwise: (AddEmployeeFormSchema)=>AddEmployeeFormSchema.notRequired(),
    // }),
    role: yup.string().required("Role is required"),
  });

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
          onSubmit={onSubmit}
        >
          {(props) => (
            <Stack component={Form} spacing={2} sx={{ width: "600px" }}>
              <TextInput label="name" name="name" />
              <TextInput label="email" name="email" />
              <TextInput label="apprId" name="apprId" />
              {/* <Select
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="department"
                label="department"
                onChange={(e) => {
                  handleDepartmentChange(e);
                }}
                error={props.errors.department && props.touched.department}
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
              </Select> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                  value={props.values.department}
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  error={props.errors.department && props.touched.department}
                  label={
                    props.errors.department && props.touched.department ? `${props.department}` : "department"
                  }
                  onChange={(e) => {
                    handleDepartmentChange(e);
                    props.setFieldValue('department', e.target.value);
                
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
              <SelectInput departmentList={roleList} name="role" label="role" />

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
