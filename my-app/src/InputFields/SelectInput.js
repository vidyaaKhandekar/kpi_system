import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useField } from 'formik';

const SelectInput = ({ departmentList, label, name, ...props }) => {
    const [meta, field, helper] = useField(name);
    

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" >{field.error&&field.touched ?`${field.error}`:`${label}`}</InputLabel>
            <Select
            
               {...props} {...meta}
                defaultValue=""
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={field.error && field.touched}
                label={field.error&&field.touched ?`${field.error}`:`${label}`}
            
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
        </FormControl>
    )
}

export default SelectInput;