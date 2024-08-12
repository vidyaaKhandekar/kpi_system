import { Stack, Typography, Button } from '@mui/material'
import React from 'react'
import {Form, Formik} from 'formik';
import TextInput from '../../InputFields/TextInput';
import { DepartmentSchema } from '../ValidationSchema';

const AddDepartment = ({fetchData}) => {

    const onSubmit=  async (values,{resetForm}) => {

        const responce = await fetch('http://localhost:4000/api/dept/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: values.department })

      });

    const data = await responce.json();
    fetchData();
    console.log(data);
    resetForm();
}
     
return (
    <Stack spacing={3} sx={{
        paddingTop:"50px",
        justifyContent:"centre",
        alignItems:"center",

    }}>
        <Typography variant='h4' sx={{alignSelf:"center"}}>
            Department
        </Typography>
        <Formik initialValues={
            {department:''}
            } 
            onSubmit={
                onSubmit}
             validationSchema={DepartmentSchema}> 
            {(props)=>(

                <Stack component={Form} direction="row" spacing={2} sx={{width:"70%"}} >
                   
                    <TextInput label="department" name="department" sx={{flex:"8"}}/>
                    <Button variant="contained"  type='submit' sx={ {flex:"2"}}>
                        
                            ADD Department</Button>
                    {console.log(props.errors.department,"Errors")}
                 </Stack>
            )}


        </Formik>   
    </Stack>
  )
}

export default AddDepartment