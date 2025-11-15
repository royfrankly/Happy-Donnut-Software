// src/components/NavBar.jsx (o donde tengas tu componente de navegación)
import React from 'react';
import coffeeBeansLogo from '../../assets/coffee-beans.png';
import { Link } from 'react-router-dom'; 
import './NavBar.css';

function NavBar() {
  return (
    <div className="nav-container">
      <div className="nav-content">

      
        <div className="nav__logo">
        <Link to="/login"> {/* <--- Usar Link para el logo */}
          <img src={coffeeBeansLogo} alt="Logo de Granos de café"
          className="nav__logo-img"
          />
      </Link>
      </div>

      <div className="nav_center-group">
        <div className="nav__links">
          <Link to="/products" className="nav__link">Productos</Link>
            <Link to="/about" className="nav__link">Acerca de</Link>
            <Link to="/testimonial" className="nav__link">Testimonio</Link>
            <Link to="/contact" className="nav__link">Contacto</Link>
        </div>
      </div>
        
      <div className="nav__icons-right">
                    
          <div className="nav__icon-box">
              <i className="fas fa-search"></i>
          </div>
        
          <div className="nav__icon-box">
            <Link to="/login"> {}
                  <i className="fas fa-user">
                
              </i> 
             </Link>
              
          </div>
      </div>
      </div>
    </div>
      
     
  );
}

export default NavBar;