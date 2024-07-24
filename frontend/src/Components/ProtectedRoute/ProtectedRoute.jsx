import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAdmin } = useContext(AdminContext);

  return isAdmin ? <Component {...rest} /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;