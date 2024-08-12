import {
  Stack,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../../CustomHook/useFetch";
import TextInput from "../../InputFields/TextInput";
import SelectInput from "../../InputFields/SelectInput";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { AddKpiFormSchema } from "../ValidationSchema";
///parent component
const AddKpiForm = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const { data, isLoading, error } = useFetch(
    "http://localhost:4000/api/dept/getAll"
  );

  useEffect(() => {
    if (isLoading) return;
    if (error) return console.error(error);
    console.log(data);
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
    setRoleList(list);
  };
  //on submit
  const onSubmit = async (values, { resetForm }) => {
    console.log("Calling submit");
    // description, weight, roleId
    const description = values.description;
    const weight = values.weight;
    const roleId = values.role;
    const responce = await fetch("http://localhost:4000/api/kpi/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        weight: weight,
        roleId: roleId,
      }),
    });
    const data = await responce.json();
    console.log(data);
    resetForm({ description: '', weight: '' });
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "30px" }}
      >
        <Button
          sx={{ width: "15%", height: "55px" }}
          component={Link}
          to="/Kpi"
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
          Fill KPI Details
        </Typography>
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
            <Stack component={Form} spacing={2} sx={{ width: "700px" }}>
              <Stack direction="row" spacing={1}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    value={props.values.department}
                    defaultValue=""
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    error={props.errors.department && props.touched.department}
                    label={
                      props.errors.department && props.touched.department
                        ? `${props.department}`
                        : "department"
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
                <SelectInput
                  departmentList={roleList}
                  name="role"
                  label="role"
                />
              </Stack>
            
              <TextInput label="Description" name="description" />
              <TextInput label="weight" name="weight" />

              <Button
                type="submit"
                variant="contained"
                sx={{ width: "200px", height: "50px", alignSelf: "center" }}
              >
                Add KPI
              </Button>
            </Stack>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default AddKpiForm;
