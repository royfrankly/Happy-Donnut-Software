// src/components/NavBar.jsx

import React from 'react';
import '../pages/Home.css'; 
// 1. IMPORTA la imagen como un módulo (Ajusta la ruta si es diferente)
import coffeeBeansLogo from '../assets/coffee-beans.png'; 

function NavBar() {
  return (
    <nav className="nav-container">
      
      <div className="nav__logo">
        <a href=""></a>
        <img 
                  
            // 2. USA la variable JavaScript importada
          src={coffeeBeansLogo} 
          alt="Logo de Granos de Café" 
          className="nav__logo-img" 
        />
      </div>
      {/* ... (resto del código) ... */}
    </nav>
  );
}

export default NavBar;