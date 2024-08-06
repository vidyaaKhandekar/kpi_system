import { TextField } from '@mui/material'
import { Field, useField } from 'formik'
import React from 'react'

function TextInput({label,error,...props}) {
    const[meta,field,helper]=useField(props)
        
  return (
    <TextField  {...props} {...meta}
        error={error&&field.touched}
        label={error&&field.touched?"Required Field":`${label}`} />
  )
}

export default TextInput
