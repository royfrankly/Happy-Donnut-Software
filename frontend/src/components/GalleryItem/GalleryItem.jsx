// src/components/NavBar.jsx (o donde tengas tu componente de navegación)
import React from 'react';

import './GalleryItem.css';
import Dalgona from '../../assets/coffes/dalgona.avif';
import Latte from '../../assets/coffes/Latte.webp';
import Cold from '../../assets/coffes/cold-brew.jpg';
import Art from '../../assets/coffes/Latte_Art.webp';
import clasic from '../../assets/coffes/clasic.jpg';
function HeroSection() {
  return (
    <div className="image-container">
      <div className="image-card">
        <img src={Dalgona} alt="" className="gallery-image" />
      </div>

      <div className="image-card">
            <img src={Latte} alt="" className="gallery-image" />
      </div>

      <div className="image-card">
            <img src={Cold} alt="" className="gallery-image" />
      </div>

      <div className="image-card">
        <img src={Art} alt="" className="gallery-image"/>
      </div>

      <div className="image-card">
        <img src={clasic} alt="" className="gallery-image"/>
      </div>
    </div>
      
     
  );
}

export default HeroSection;