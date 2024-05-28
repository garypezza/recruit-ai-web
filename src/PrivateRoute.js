// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const authToken = localStorage.getItem('authToken');
  return isAuthenticated || authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
