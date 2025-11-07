// src/router/AppRouter.js
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AdminLayout } from '../layouts/AdminLayout';
import { Dashboard } from '../modules/dashboard/Dashboard';
import LoginPage from '../modules/auth/LoginPage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta pública para el login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas privadas que requieren autenticación */}
      <Route element={<PrivateRoute />}>
        {/* Todas las rutas anidadas aquí usarán PrivateRoute */}
        {/* Y todas las rutas anidadas dentro de AdminLayout usarán ese layout */}
        <Route path="/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="ventas" element={<Ventas />} /> */}
          
          {/* Si se entra a la raíz del path protegido, redirige a dashboard */}
          <Route path="" element={<Navigate to="dashboard" />} />
        </Route>
      </Route>

      {/* Redirección por defecto si ninguna ruta coincide */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
