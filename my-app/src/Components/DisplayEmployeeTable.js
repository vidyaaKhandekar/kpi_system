import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function DisplayEmployeeTable({EmployeeList})  {
    console.log(EmployeeList);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 ,sortable: false,},
        { field: 'name', headerName: 'Name', width: 130 ,sortable: false,},
        { field: 'email', headerName: 'Email', width: 330,sortable: false, },
        {
          field: 'role',
          headerName: 'Role',
          width: 130,
          sortable: false,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
      ];
      
    
      const rows = EmployeeList;
  return (
    <div style={{ height: 400, width: '100%', alignContent:"center"}}>
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
