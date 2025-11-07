// src/components/NavBar.jsx (o donde tengas tu componente de navegación)
import React from 'react';
import coffeeBeansLogo from '../../assets/coffee-beans.png'; 
import './NavBar.css';

function NavBar() {
  return (
    <div className="nav-container">
      <div className="nav-content">

      
        <div className="nav__logo">
        <a href="/">
          <img src={coffeeBeansLogo} alt="Logo de Granos de café"
            className="nav__logo-img"
          />
        </a>
      </div>

      <div className="nav_center-group">
        <div className="nav__links">
            <a href="/products" className="nav__link">Productos</a>
            <a href="/about" className="nav__link">Acerca de</a>
            <a href="/testimonial" className="nav__link">Testimonio</a>
            <a href="/contact" className="nav__link">Contacto</a>
        </div>
      </div>
        
      <div className="nav__icons-right">
                    
          <div className="nav__icon-box">
              <i className="fas fa-search"></i>
          </div>
        
          <div className="nav__icon-box">
              <i className="fas fa-user"></i>
          </div>
      </div>
      </div>
    </div>
      
     
  );
}

export default NavBar;