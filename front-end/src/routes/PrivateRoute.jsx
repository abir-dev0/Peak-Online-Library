import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'; // Adjust the path as needed

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/login" />; // Create a NotAuthorized component if needed
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
