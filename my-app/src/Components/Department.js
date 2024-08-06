import React from 'react'
import AddDepartment from './AddDepartment'
import { Stack } from '@mui/material'
import  { useEffect, useState } from 'react'
import DisplayDepartment from './DisplayDepartment';
const Department=()=> {
    const[DepartmentList,setDepartmentList]=useState([]);
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData=async()=>{
      
            const data=await fetch('http://localhost:4000/api/dept/getAll');
            const deptList=await data.json();
            setDepartmentList(deptList);
    
    }

    console.log(DepartmentList);
  return (
    <Stack >
        <AddDepartment fetchData={fetchData}/>
        <DisplayDepartment DepartmentList={DepartmentList}/>
    </Stack>
    
  )
}

export default Department