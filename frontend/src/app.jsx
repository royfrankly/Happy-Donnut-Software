// src/app.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Importar los componentes de la carpeta pages
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ShoppingCartPage from './pages/ShoppingCartPage.jsx';
// Importa las demás páginas que necesites
// import VentasPage from './pages/ventas.jsx'; 
// Asumiremos que necesitas una página de 'Registro'
import RegisterForm from './components/RegisterForm/RegisterForm.jsx'; 
// Asumiremos que necesitas una página 'Acerca de' y 'Contacto'
// import AboutPage from './pages/AboutPage.jsx'; 
// import ContactPage from './pages/ContactPage.jsx';


function App() {
  return (
    // Se recomienda usar BrowserRouter una sola vez en el componente principal
    <BrowserRouter> 
      <Routes>
        
        {/* Rutas Principales del Menú */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<MenuPage />} /> {/* Productos */}
        
        {/* Rutas de Autenticación (Login e Íconos de NavBar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/cart" element={<ShoppingCartPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;