import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from './ContextProvider';

const ProtectedRoute = ({ children, roles }) => {
  const { user, token } = useStateContext();

  if (!token) {
      return <Navigate to="/login" />;
  }

  if (!user) {
      return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;