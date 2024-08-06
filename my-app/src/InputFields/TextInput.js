import { TextField } from '@mui/material'
import { Field, useField } from 'formik'
import React from 'react'

function TextInput({label,...props}) {
    const[meta,field,helper]=useField(props)
    console.log(field,"field")
    console.log(meta,"meta")
  return (
    <TextField  {...props} {...meta}
        error={field.error?true:false}
        label={field.error?"department is required field":""} />
  )
}

export default TextInput
