// import { createBrowserRouter } from 'react-router-dom'
import App from "../App";
import Department from "../Components/Department";
// import Role from '../Components/Role'
import Employee from "../Components/Employee";
import Kpi from "../Components/Kpi";
import Role from "../Components/Role";
// import AddRoleForm from '../Components/AddRoleForm'
// import DisplayDepartment from '../Components/DisplayDepartment'
// import RoleDashboard from '../Components/RoleDashboard'
// import DisplayRole from '../Components/DisplayRole'

// const Router = createBrowserRouter([
// {
//     path:'/',
//     element:<App/>,
//     children:[
//         {

//          index:<Department/>
//         },
//         {
//             path:'Role',
//             element:<RoleDashboard/>,
//             children:[
//                 {
//                     path:'addrole',
//                     element:<AddRoleForm/>
//                 }

//             ]

//         },
//         {
//             path:'employee',
//             element:<Employee/>
//         },
//         {
//             path:'kpi',
//             element:<Kpi/>
//         },
//         {
//             path:'department',
//             element:<Department/>
//         },

//     ]
// }
// ])

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RoleDashboard from "../Components/RoleDashboard";
import AddRoleForm from "../Components/AddRoleForm";
import EmployeeDashboard from "../Components/EmployeeDashboard";
import AddEmployeeForm from "../Components/AddEmployeeForm";
// component imports

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Department />} />
      <Route path="department" element={<Department />} />
      <Route path="employee" element={<Employee />}>
        <Route index element={<EmployeeDashboard />} />
        <Route path="addemployee" element={<AddEmployeeForm />} />
      </Route>
      <Route path="Role" element={<Role />}>
        <Route index element={<RoleDashboard />} />
        <Route path="addrole" element={<AddRoleForm />} />
      </Route>
      <Route path="kpi" element={<Kpi />} />
    </Route>
  )
);
export default Router;
