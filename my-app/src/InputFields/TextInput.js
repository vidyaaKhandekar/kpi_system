import { TextField } from '@mui/material'
import { Field, useField } from 'formik'
import React from 'react'

function TextInput({label,...props}) {
    const[meta,field,helper]=useField(props)
        
  return (
    <TextField sx={{width:"100%",mt:"10px"}} {...props} {...meta}
        error={field.error&&field.touched}
        label={field.error&&field.touched?`${field.error}`:`${label}`} multiline />
  )
}

export default TextInput
