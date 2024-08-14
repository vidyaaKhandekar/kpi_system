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
import * as yup from "yup";
import DisplayTable from "../../TableContent/DisplayTable";
import { KpiTableColumns } from "../../TableContent/Tablecolums";
///parent component
const DisplayKpi = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [kpiList, setKpiList] = useState([]);
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
    console.log(list);
    setRoleList(list);
  };
  //on submit
  const onSubmit = async (values, { resetForm }) => {
    const response = await fetch(
      `http://localhost:4000/api/kpi/getByRole/${values.role}`,
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
    console.log(list);
    setKpiList(list);
  };

  return (
    <Stack
      spacing={3}
      sx={{
        paddingTop: "20px",
        justifyContent: "centre",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" >
        View KPI
      </Typography>
      <Formik
        initialValues={{
          department: "",
          role: "",
        }}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Stack
            direction="row"
            component={Form}
            spacing={2}
            sx={{ width: "80%", alignSelf: "center" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
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
            <SelectInput departmentList={roleList} name="role" label="role" />

            <Button
              type="submit"
              variant="contained"
              sx={{ width: "200px", height: "50px", alignSelf: "center" }}
            >
              Get KPI's
            </Button>
          </Stack>
        )}
      </Formik>
      {kpiList?.length!==0?<DisplayTable row={kpiList} columns={KpiTableColumns}/>:null}
    </Stack>
  );
};

export default DisplayKpi;
