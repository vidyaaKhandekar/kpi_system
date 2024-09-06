import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = ({}) => {
  return randomArrayItem(roles);
};

export default function FullFeaturedCrudGrid(initialRows) {
  const [rows, setRows] = React.useState(initialRows.initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    const rowToUpdate = rows.find((row) => row.id === id);
    const updatedRow = { ...rowToUpdate, isNew: false };
    console.log("updated row",rowToUpdate)
    try {
      const response = await fetch(`http://localhost:4000/api/emp/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: window.localStorage.getItem("token"),
          
        },
        body: JSON.stringify(updatedRow),
      });

      if (!response.ok) {
        throw new Error("Error updating employee");
      }

      setRows(rows.map((row) => (row.id === id ? updatedRow : row)));
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (id) => async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/emp/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting employee");
      }

      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      sortable: false,
      filterable: false,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 370,
      sortable: false,
      filterable: false,
      editable:true
    },
    {
      field: "role_name",
      headerName: "Role",
      width: 220,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
 React.useEffect(()=>{
    console.log("initial rows are",initialRows?.initialRows
    )
 },[])
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
