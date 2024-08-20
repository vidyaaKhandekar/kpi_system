import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
 
  const user=localStorage.getItem('user');
  return user==="yes" ? <Outlet/>:<Navigate to='/login'/>
}
 
export default ProtectedRoute;