import React from 'react';
import './MenuPage.css';

function ProductCard({ image, name, description, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">S/. {price}</p>
        <button className="buy-button">Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductCard;
