import App from "../App";
import Department from "../Components/Department/Department";
import Employee from "../Components/Employee/Employee";
import Role from "../Components/Role/Role";
import {createBrowserRouter,createRoutesFromElements,Route,} from "react-router-dom";
import Kpi from "../Components/AdminKPI.js/Kpi";
import Login from "../Components/LoginPage/Login";
import LoginOptions from "../Components/LoginPage/LoginOptions";
import Dashboard from "../Components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import EmployeeTab from "../EmployeeComponents/EmployeeTab";
import Approvar from "../Approvar/ApprovarDashboard";
// component imports

const Router = createBrowserRouter(
  
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />}>
        <Route index element={<LoginOptions />} />
        
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Department />} />
          <Route path="department" element={<Department />} />
          <Route path="employee" element={<Employee />}></Route>
          <Route path="role" element={<Role />}></Route>
          <Route path="Kpi" element={<Kpi />}></Route>
        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<EmployeeTab />} /> 
          <Route path="employee" element={<EmployeeTab />}></Route>
          <Route path="approvar" element={<Approvar />}></Route>
        </Route>
      </Route>
      {/* <Route path="/" element={<Test />}></Route> */}
    </>
  )
  
)
export default Router;