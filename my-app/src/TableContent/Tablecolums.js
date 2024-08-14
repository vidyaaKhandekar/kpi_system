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
    headerName: "Department",
    width: 220,
  },
  //  { field: "Actions", headerName: "Edit", width: 200, sortable: false ,renderCell:(param)=><Action roleId={param.id} deptId={deptId}/>,filterable:false},
];
//select id, description, weight from kpi where role_id=${id}
export const KpiTableColumns = [
  {
    field: "id",
    headerName: "KPI ID",
    width: 220,
    sortable: false,
    filterable: false,
  },
  {
    field: "description",
    headerName: "KPI Description",
    width: 420,
    sortable: false,
    filterable: false,
  },
  {
    field: "weight",
    headerName: "KPI Weight",
    width: 220,
    sortable: false,
    filterable: false,
  },
];
