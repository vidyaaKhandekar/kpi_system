import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,FormHelperText
} from "@mui/material";
import { useField } from 'formik';

const SelectInput = ({ departmentList, label, name,value, ...props }) => {
    const [meta, field] = useField(name);
    

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" >{label}</InputLabel>
          
            <Select
            
               {...props} {...meta}
                defaultValue={value}
                value={value}
                error={field.error && field.touched}
                label={label}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            overflowY: 'auto',
                        },
                    },
                }}
                
            >
                {departmentList?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
            </Select>
            {field.error && field.touched? <FormHelperText sx={{ color: 'red', fontSize: '12px',m:0 }}>{field.error}</FormHelperText>:null}

        </FormControl>
    )
}

export default SelectInput;