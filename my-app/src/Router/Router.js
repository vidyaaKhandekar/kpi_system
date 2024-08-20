import App from "../App";
import Department from "../Components/Department/Department";
import Employee from "../Components/Employee/Employee";
import Role from "../Components/Role/Role";
import {createBrowserRouter,createRoutesFromElements,Route,} from "react-router-dom";
import Kpi from "../Components/AdminKPI.js/Kpi";
import Login from "../Components/LoginPage/Login";
import LoginOptions from "../Components/LoginPage/LoginOptions";
import LoginWithGoogle from "../Components/LoginPage/LoginWithGoogle";
import Dashboard from "../Components/Dashboard";
import LoginAsAdmin from "../Components/LoginPage/LoginAsAdmin";
import ProtectedRoute from "./ProtectedRoute";
// component imports

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}>
        <Route index element={<LoginOptions />} />
        <Route path="employee" element={<LoginWithGoogle />} />
        <Route path="admin" element={<LoginAsAdmin />} />
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<App />}>
          <Route index element={<Department />} />
          <Route path="department" element={<Department />} />
          <Route path="employee" element={<Employee />}></Route>
          <Route path="role" element={<Role />}></Route>
          <Route path="Kpi" element={<Kpi />}></Route>
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);
export default Router;
