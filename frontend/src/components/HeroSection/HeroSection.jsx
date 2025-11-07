// src/components/NavBar.jsx (o donde tengas tu componente de navegación)
import React from 'react';

import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
                <h1 className="hero-title">
                    Disfruta tu Café con Happy Donnuts
                </h1>

                <p className="hero-subtitle">
                    Descubre tranquilamente en Happy Donnuts un santuario para desconectar
                    donde tus experiencias son perfectas con relajación y sabores intensos.
                </p>
      
                <a href="/productos" className="hero-cta-button">
                        EXPLORAR PRODUCTOS
                </a>      
      </div>
    </div>
      
     
  );
}

export default HeroSection;