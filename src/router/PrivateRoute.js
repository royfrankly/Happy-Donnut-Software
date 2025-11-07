// src/router/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('user');

  // Si está autenticado, renderiza el contenido de la ruta (usando Outlet)
  // Si no, redirige a la página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
