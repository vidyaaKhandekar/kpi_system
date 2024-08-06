import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFetch from "../CustomHook/useFetch";
import TextInput from "../InputFields/TextInput";

const AddRoleForm = () => {
    const[departmentList,setDepartmentList]=useState([]);
    const { data, isLoading, error }=useFetch('http://localhost:4000/api/dept/getAll');
    useEffect(() => {
        if (isLoading) return;
        if (error) return console.error(error);
    
        setDepartmentList(data);
        console.log(data);
      }, [data, isLoading, error]);
  return (
    <Stack
      spacing={3}
      sx={{
        paddingTop: "50px",
        justifyContent: "centre",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ alignSelf: "center" }}>
        ADD ROLE
      </Typography>
      <Formik>
        <Stack
          component={Form}
          spacing={2}
          sx={{ width: "600px" }}
        >
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Department"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // adjust the height to your liking
                    overflowY: 'auto',
                  },
                },
              }}
            >
              {departmentList.map((item,index)=>(
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextInput label="role" name="role"/>
          <Button variant="contained" sx={{width:"200px",height:"50px",alignSelf:"center"}}>Add Role</Button>
        </Stack>
      </Formik>
    </Stack>
  );
};

export default AddRoleForm;
