import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function DisplayEmployeeTable({EmployeeList})  {
    console.log(EmployeeList);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 ,sortable: false,},
        { field: 'name', headerName: 'Name', width: 130 ,sortable: false,},
        { field: 'email', headerName: 'Email', width: 330,sortable: false, },
       
        {
            field: 'role_name',
            headerName: 'Role Name',
            width: 130,
            sortable: false,
          },
        
      ];
      
    
      const rows = EmployeeList;
  return (
    <div style={{ height: 400, width: '70%', alignContent:"center"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
      />
    </div>
  );
}
