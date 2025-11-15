import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">Happy Donut</div>
      <nav className="nav">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Inicio
        </Link>

        <Link 
          to="/MenuPage" 
          className={location.pathname === '/MenuPage' ? 'active' : ''}
        >
          Menú
        </Link>

        <Link 
          to="/contacto" 
          className={location.pathname === '/contacto' ? 'active' : ''}
        >
          Contacto
        </Link>

        <Link 
          to="/loginPage" 
          className={location.pathname === '/login' ? 'active' : ''}
        >
          Iniciar Sesión
        </Link>
      </nav>
    </header>
  );
}

export default Header;
