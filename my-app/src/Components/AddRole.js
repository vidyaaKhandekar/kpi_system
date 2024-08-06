import { Stack ,Typography } from '@mui/material'
import { Formik ,Form } from 'formik'
import React from 'react'

const AddRole = () => {
  return (
    <Stack spacing={3} sx={{
        paddingTop:"50px",
        justifyContent:"centre",
        alignItems:"center",
        
    }}>
        <Typography variant='h4' sx={{alignSelf:"center"}}>
            Role
        </Typography>
        <Formik>
            <Stack component={Form} direction="row" spacing={2} sx={{width:"70%"}}>
                
            </Stack>
        </Formik>

    </Stack>
  )
}

export default AddRole
