// src/layouts/AdminLayout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Estilos simples para el layout (pueden moverse a un archivo CSS)
const headerStyles = {
  background: '#f8f9fa',
  padding: '10px 20px',
  borderBottom: '1px solid #dee2e6',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const mainStyles = {
  padding: '20px'
};

const logoutButtonStyles = {
  padding: '8px 12px',
  background: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <header style={headerStyles}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={logoutButtonStyles}>
          Cerrar Sesión
        </button>
      </header>
      <main style={mainStyles}>
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
};
