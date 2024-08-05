import { Stack, Typography,TextField, Button } from '@mui/material'
import React from 'react'
import {useFormik} from 'formik';
import {DepartmentSchema} from './ValidationSchema'
import axios from 'axios';
import { useState } from 'react';
const Department = () => {
    
const formik=useFormik({
    initialValues:{
        department:''
    },
    onSubmit: async (values) => {
        // const name=values.department;
        // axios.post('https://localhost:4000/api/dept/add',{
        //     name
        // })
        // .then((response)=>{
        //     console.log(response);
        // })
        // .catch((error)=>{
        //     console.log(error)
        // });
        const responce = await fetch('http://localhost:4000/api/dept/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: values.department })
          });

        const data = await responce.json();
        console.log(data);
    },
    
    validationSchema:DepartmentSchema
    
})

console.log(formik.values.department)
console.log(formik.errors.department)
return (
    <Stack spacing={3} sx={{
        paddingTop:"50px",
        justifyContent:"centre",
        alignItems:"center",
        
    }}>
        <Typography variant='h4' sx={{alignSelf:"center"}}>
            Department
        </Typography>
       
            <Stack component="form" onSubmit={formik.handleSubmit} direction="row" spacing={2} sx={{width:"80%"}} >
                
            <TextField id="outlined-basic" 
                error={formik.errors.department?true:false} 
                label={formik.errors.department?"department is required field":""} 
                variant="outlined"
                sx={{
                    flex:"8",
                }}
                placeholder=''
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='department'/>
                <Button variant="contained" sx={{
                flex:"2",
            }} type='submit'>ADD Department</Button>
            
        </Stack>
      
       
    </Stack>
  )
}

export default Department
