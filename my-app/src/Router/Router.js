import App from "../App";
import Department from "../Components/Department/Department";
import Employee from "../Components/Employee/Employee";
import Role from "../Components/Role/Role";
import {createBrowserRouter,createRoutesFromElements,Route,} from "react-router-dom";
import RoleDashboard from "../Components/Role/RoleDashboard";
import AddRoleForm from "../Components/Role/AddRoleForm";
import EmployeeDashboard from "../Components/Employee/EmployeeDashboard";
import AddEmployeeForm from "../Components/Employee/AddEmployeeForm";
import Kpi from "../Components/AdminKPI.js/Kpi";
import KpiDashboard from "../Components/AdminKPI.js/KpiDashboard";
import AddKpiForm from "../Components/AdminKPI.js/AddKpiForm";
import Login from "../Components/LoginPage/Login";
import LoginOptions from "../Components/LoginPage/LoginOptions";
import LoginWithGoogle from "../Components/LoginPage/LoginWithGoogle";
// component imports

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
  
    <Route path="/" element={<App />}>
      <Route index element={<Department />} />
      <Route path="department" element={<Department />} />

      <Route path="employee" element={<Employee />}>
        <Route index element={<EmployeeDashboard />} />
        <Route path="addemployee" element={<AddEmployeeForm />} />
      </Route>
      <Route path="role" element={<Role />}>
        <Route index element={<RoleDashboard />} />
        <Route path="addrole" element={<AddRoleForm />} />
      </Route>
      <Route path="Kpi" element={<Kpi />}>
        <Route index element={<KpiDashboard />} />
        <Route path="addKpi" element={<AddKpiForm />} />
      </Route>
    </Route>
    {/* <Route path="login" element={<Login/>}>
        <Route index element={<LoginOptions />} />
        <Route path="employee" element={<LoginWithGoogle />} />
    </Route> */}
    </>
  )
);
export default Router;
