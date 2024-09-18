import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from './service/authorize';




const AdminRoute = ({ element: Element }) => {
  const location = useLocation();
  const isAuthenticated = getUser();

  return isAuthenticated ? (
    <Element />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AdminRoute;
