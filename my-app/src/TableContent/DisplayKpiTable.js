import React,{useState,useEffect} from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
function DisplayKpiTable({ row }) {

  const[success,setSuccess]=useState();
  const[error,setError]=useState();
  const handleDeleteClick = (id) => {
    fetch(`http://localhost:4000/api/kpi/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(" Deleted Successfully");
        } else {
          setError("Error in Deleting ");
        }
        // fetchAllEmployee(departmentId)
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const rows = row;
  const columns=[
    {
      field: "id",
      headerName: "KPI ID",
      width: 100,
      sortable: false,
      filterable: false,
    },
    {
      field: "description",
      headerName: "KPI Description",
      width: 320,
      sortable: false,
      filterable: false,
    },
    {
      field: "weight",
      headerName: "KPI Weight",
      width: 100,
      sortable: false,
      filterable: false,
    },
  
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              handleDeleteClick(id);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);
  return (
    <div style={{ height: 400, width: "80%" }}>
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
export default  DisplayKpiTable