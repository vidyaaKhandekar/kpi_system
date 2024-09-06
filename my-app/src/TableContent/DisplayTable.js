import  React,{useEffect, useState} from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DisplayTable({ row, columns }) {
 
  const [rows,setRows]=useState(); 
  useEffect(()=>{
    const data=row?.map((item, index) => ({ ...item, serialNo: index + 1 }));
    setRows(data);
    
  },[row])
  return (
    <div style={{ height: 400, width: "100%" }}>
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