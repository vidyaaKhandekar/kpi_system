import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // or however you store the token

  return token ? <Outlet/>:<Navigate to='/login'/>
};

export default ProtectedRoute;