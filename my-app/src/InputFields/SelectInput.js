import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useField, useFormikContext } from 'formik';

const SelectInput = ({ departmentList, label, name, error, ...props }) => {
    const [meta, field, helper] = useField(props);
    const { setFieldValue } = useFormikContext();

    const handleChange = (event) => {
        setFieldValue(name, event.target.value);
    };

    const getSelectedItem = () => {
        if (field.value && departmentList) {
            const selectedItem = departmentList.find(item => item.id === field.value);
            return selectedItem ? selectedItem.name : '';
        }
        return '';
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field.value}
                onChange={handleChange}
                error={error}
                label={field.error ? `${field.error}` : `${label}`}
                renderValue={() => getSelectedItem()}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            overflowY: 'auto',
                        },
                    },
                }}
            >
                {departmentList && departmentList.map((item, index) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectInput;