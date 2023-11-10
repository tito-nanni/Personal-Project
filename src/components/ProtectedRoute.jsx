import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  // The return statement must be inside the component function
  if (!isAuthenticated) {
    // Redirect to the /login page if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;
