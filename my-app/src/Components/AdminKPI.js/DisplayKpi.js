import {Grid,Button,Select,MenuItem,FormControl,InputLabel,Alert} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../../CustomHook/useFetch";
import SelectInput from "../../InputFields/SelectInput";
import DisplayTable from "../../TableContent/DisplayTable";
import { KpiTableColumns } from "../../TableContent/Tablecolums";

const DisplayKpi = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [kpiList, setKpiList] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [Error, setError] = useState(null);
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
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      console.log("Network ");
    }
    const data = await response.json();
    const list = data;
    console.log(list);
    setRoleList(list);
  };

  const onSubmit = async (values, { resetForm }) => {
    const response = await fetch(
      `http://localhost:4000/api/kpi/getByRole/${values.role}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
     setError("Problem in Fetching data")
    }
    const data = await response.json();

    console.log("KPI", data);
    if (data.length === 0) {
      setKpiList([]);
      setNoDataFound(true); // set a state variable to true
    } else {
      setKpiList(data);
      setNoDataFound(false); // set a state variable to false
    }
  };
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
      spacing={3}
      sx={{
        paddingTop: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12}>
        <Formik
          initialValues={{
            department: "",
            role: "",
          }}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Grid component={Form} spacing={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={5} md={5}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Department
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
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                  <SelectInput
                    departmentList={roleList}
                    name="role"
                    label="role"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "200px",
                    height: "50px",
                    alignSelf: "center",
                    mt: "8px",
                  }}
                >
                  Get KPI's
                </Button>
              </Grid>
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
            </Grid>
          )}
        </Formik>
      </Grid>
      {noDataFound ? (
        <Grid item xs={12}>
          <p>No KPIs assigned to this role</p>
        </Grid>
      ) : null}
      {kpiList?.length !== 0 ? (
        <Grid item xs={12}>
          <DisplayTable row={kpiList} columns={KpiTableColumns} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default DisplayKpi;
