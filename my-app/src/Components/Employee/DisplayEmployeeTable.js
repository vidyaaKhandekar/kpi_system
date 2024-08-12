import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Action from "../Action";
import AddEmployeeForm from "./AddEmployeeForm";
export default function DisplayEmployeeTable({ EmployeeList,deptId }) {
  console.log(EmployeeList);
  const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false ,filterable:false},
    { field: "name", headerName: "Name", width: 170, sortable: false ,filterable:false},
    { field: "email", headerName: "Email", width: 330, sortable: false ,filterable:false},

    {
      field: "role_name",
      headerName: "Role Name",
      width: 200,
      sortable: false,
      filterable:false
    },
    { field: "Actions", headerName: "Edit", width: 200, sortable: false ,renderCell:(param)=><Action roleId={param.id} deptId={deptId}/>,filterable:false},
    
  ];
  const rows = EmployeeList;
  // rows.forEach(obj => {
  //   obj.edit = "hii";
  //   obj.delete=<DeleteIcon/>
  // });
  
  return (
    <div style={{ height: 400, width: "80%", alignContent: "center" }}>
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
