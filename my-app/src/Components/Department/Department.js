import React from 'react'
import AddDepartment from './AddDepartment'
import { Stack } from '@mui/material'
import  { useEffect, useState } from 'react'
import DisplayList from '../DisplayList';
import { deleteDepartmentUrl } from '../Constant';
const Department=()=> {
    const[DepartmentList,setDepartmentList]=useState([]);
    const fetchData=async()=>{
      
      const data=await fetch('http://localhost:4000/api/dept/getAll');
      console.log("Responce: ",data);
      const deptList=await data.json();
      console.log("List: ", deptList);
      setDepartmentList(deptList);

}
    useEffect(()=>{
        fetchData();
    },[])
    

    console.log(DepartmentList);
  return (
    <Stack flex={8}>
        <AddDepartment fetchData={fetchData}/>
        
        <DisplayList  listItem={DepartmentList} fetchData={fetchData}url={deleteDepartmentUrl}/>
    </Stack>
    
  )
}

export default Department