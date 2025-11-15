
import React from 'react';
import { Link } from 'react-router-dom'; 
import './StatsSection.css';

function StatsSection() {
  return (
    <div className="section-wrapper">
        <div className="feature-block-container">
            <div className="image-column">

            </div>

            <div className="content-column">
                <h2 className="content-title">
                    LA MAGIA DEL CAFÉ DISEÑADO POR TI
                </h2>
                
                <Link to="/products"> 
                <button className="cta-button">
                    EXPLORAR PRODUCTOS <span className="arrow"></span>
                </button>
                </Link>
            </div>
        </div>

        <div className="stats-container">
            <div className="stat-item">
                <p className="stat-number">60+</p>
                <p className="stat-label">Coffee Variant</p>
            </div>

            <div className="stat-item">
                <p className="stat-number">10+</p>
                <p className="stat-label">Meeting room</p>
            </div>

            <div className="stat-item">
                <p className="stat-number">15+</p>
                <p className="stat-label">Event space</p>
            </div>

            <div className="stat-item">
                <p className="stat-number">20+</p>
                <p className="stat-label">Global Achievement</p>
            </div>
         </div>
     </div>    
  );
}

export default StatsSection;