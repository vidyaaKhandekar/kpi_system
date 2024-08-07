import { TextField } from '@mui/material'
import { Field, useField } from 'formik'
import React from 'react'

function TextInput({label,...props}) {
    const[meta,field,helper]=useField(props)
        
  return (
    <TextField  {...props} {...meta}
        error={field.error&&field.touched}
        label={field.error&&field.touched?"Required Field":`${label}`} />
  )
}

export default TextInput
