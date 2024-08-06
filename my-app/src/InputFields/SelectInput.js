import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    } from "@mui/material";
import { useField } from 'formik';
const SelectInput = ({departmentList,label,error,...props}) => {
    const[meta,field,helper]=useField(props)
    
  return (
    <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...meta}
              {...props}
              error={error}
              label={error?"Required Field":`${label}`} 
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, 
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
  )
}

export default SelectInput
