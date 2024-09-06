export const EmployeeTableColumns = [
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
  },
  {
    field: "email",
    headerName: "Email",
    width: 370,
    sortable: false,
    filterable: false,
  },
  {
    field: "role_name",
    headerName: "Role",
    width: 220,
  },
  //  { field: "Actions", headerName: "Edit", width: 200, sortable: false ,renderCell:(param)=><Action roleId={param.id} deptId={deptId}/>,filterable:false},
];
//select id, description, weight from kpi where role_id=${id}
export const KpiTableColumns = [
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
];
// const columns = [
//   {
//     field: "id",
//     headerName: "ID",
//     width: 80,
//     sortable: false,
//     filterable: false,
//   },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 200,
//     sortable: false,
//     filterable: false,
//     editable: true,
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     width: 370,
//     sortable: false,
//     filterable: false,
//     editable:true
//   },
//   {
//     field: "role_name",
//     headerName: "Role",
//     width: 220,
//   },
//   {
//     field: 'actions',
//     type: 'actions',
//     headerName: 'Actions',
//     width: 100,
//     cellClassName: 'actions',
//     getActions: ({ id }) => {
//       const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//       if (isInEditMode) {
//         return [
//           <GridActionsCellItem
//             icon={<SaveIcon />}
//             label="Save"
//             sx={{
//               color: 'primary.main',
//             }}
//             onClick={handleSaveClick(id)}
//           />,
//           <GridActionsCellItem
//             icon={<CancelIcon />}
//             label="Cancel"
//             className="textPrimary"
//             onClick={handleCancelClick(id)}
//             color="inherit"
//           />,
//         ];
//       }

//       return [
//         <GridActionsCellItem
//           icon={<EditIcon />}
//           label="Edit"
//           className="textPrimary"
//           onClick={handleEditClick(id)}
//           color="inherit"
//         />,
//         <GridActionsCellItem
//           icon={<DeleteIcon />}
//           label="Delete"
//           onClick={handleDeleteClick(id)}
//           color="inherit"
//         />,
//       ];
//     },
//   },
// ];