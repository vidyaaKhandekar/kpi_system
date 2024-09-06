import { TextField } from "@mui/material";
import { useField } from "formik";
import React, { useEffect } from "react";

function TextInput({ label,value, ...props }) {
  const [meta, field] = useField(props);
  // useEffect(()=>{
  //   console.log("meta",meta)
  //   console.log("field",field)
  //   console.log("value",value)
  // },[])
  return (
    <TextField
      sx={{

        width: "100%",
        mt: "1px",
        "& .MuiFormHelperText-root": {
          ml:0
        },
      }}
      {...props}
      {...meta}
   
      defaultValue={value}
      error={field.error && field.touched}
      label={label}
      multiline
      helperText={field.error && field.touched ? `${field.error}` : ""}
    />
  );
}

export default TextInput;
