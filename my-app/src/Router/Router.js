import App from "../App";
import Department from "../Components/Department";
import Employee from "../Components/Employee";
import Role from "../Components/Role";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RoleDashboard from "../Components/RoleDashboard";
import AddRoleForm from "../Components/AddRoleForm";
import EmployeeDashboard from "../Components/EmployeeDashboard";
import AddEmployeeForm from "../Components/AddEmployeeForm";
import Kpi from "../Components/AdminKPI.js/Kpi";
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
