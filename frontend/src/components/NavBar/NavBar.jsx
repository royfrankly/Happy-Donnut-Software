// src/components/NavBar.jsx (o donde tengas tu componente de navegación)
import React from 'react';
import coffeeBeansLogo from '../../assets/coffee-beans.png'; 
import './NavBar.css';

function NavBar() {
  return (
   
        <div className="nav__logo">
        <a href="/">
          <img src={coffeeBeansLogo} alt="Logo de Granos de café"
            className="nav__logo-img"
          />
        </a>
      </div>
     
  );
}

export default NavBar;