// src/routes/PrivateRoute.js

import React, { createContext, useContext, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

// Create Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to login
  const login = () => {
    setIsAuthenticated(true)
  };

  // Function to logout
  const logout = () => {
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
