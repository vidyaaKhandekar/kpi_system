import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditEmployeeForm from "../Components/Employee/EditEmployee";

function DisplayEmployeeTable({ row, fetchAllEmployee, departmentId }) {
  const [open, setOpen] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState();
  const [employee, setEmployee] = useState();
  const [initialValues, setInitialValues] = useState();
  const [error, setError] = useState(null);
  const handleClickOpen = (id) => {
    setEditEmployeeId(id);
    fetchEmployee(id);
    setOpen(true);
  };
  //fetch employee details for edit
  const fetchEmployee = async (id) => {
    const response = await fetch(`http://localhost:4000/api/emp/getById/${id}`);
    if (response.ok) {
      const data = await response.json();
      setEmployee(data);
    }
  };
  //handle delete function
  const handleDeleteClick = (id) => {
    fetch(`http://localhost:4000/api/emp/delete/${id}`, {
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
        fetchAllEmployee(departmentId)
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    if (employee) {
      const newInitialValues = {
        firstName: employee.first_name,
        lastName: employee.last_name,
        email: employee.email,
        apprId: employee.approver.id,
        department: employee.department.id,
        role: employee.role.id,
      };
      setInitialValues(newInitialValues);
    }
  }, [employee]);
  const handleClose = () => {
    setInitialValues();
    setOpen(false);
  };
  const rows = row;
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      sortable: false,
      filterable: false,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      sortable: false,
      filterable: false,
      editable: true,
    },
    {
      field: "role_name",
      headerName: "Role",
      width: 100,
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              handleClickOpen(id);
            }}
            color="inherit"
          />,

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
  const [success, setSuccess] = useState(false);
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
    <div style={{ height: 400, width: "100%" }}>
      {success && (
        <Alert
          severity="success"
          duration={2000}
          position={{
            top: 16,
            right: 16,
          }}
        >
          {success}
        </Alert>
      )}
      {error && <Alert severity="error">OOPs some problem in deleteing</Alert>}
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
      {initialValues ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Edit Employee"}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent>
            <EditEmployeeForm
              editEmployeeId={editEmployeeId}
              initialValue={initialValues}
              handleClose={handleClose}
              fetchAllEmployee={fetchAllEmployee}
              departmentId={departmentId}
              setSuccess={setSuccess}
            />
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
export default DisplayEmployeeTable;
