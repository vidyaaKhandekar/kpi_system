import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
 
  const user=localStorage.getItem('userProfile');
  return user==="Employee"|| user==="Admin" ? <Outlet/>:<Navigate to='/login'/>
}
 
export default ProtectedRoute;