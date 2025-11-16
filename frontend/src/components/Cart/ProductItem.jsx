// src/components/cart/ProductItem.jsx

import React from 'react';
import placeholderImg from '../../assets/coffes/dalgona.avif';

const ProductItem = ({ product, onQuantityChange, isSelected, onToggleSelect }) => {
  
  // Handlers simples para los botones de cantidad
  const handleDecrement = () => {
    if (product.quantity > 1) {
      onQuantityChange(product.id, product.quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(product.id, product.quantity + 1);
  };
  
  const imgSrc = product.imageUrl || placeholderImg;

  return (
    <div className="product-item">

      {/* Columna de Selección */}
      <div className="product-select">
        <input
          type="checkbox"
          checked={!!isSelected}
          onChange={() => onToggleSelect(product.id)}
        />
      </div>

      {/* Columna de Imagen y Detalles */}
      <div className="product-info">
        <img src={imgSrc} alt={product.name} className="product-image" />
        <div className="details-text">
          <p className="product-name">{product.name}</p>
          {product.vendor && (
            <p className="product-vendor">Vendido por: {product.vendor}</p>
          )}
        </div>
      </div>

      {/* Columna de Precios y Descuentos */}
      <div className="product-price">
        <span className="current-price">S/ {Number(product.price).toFixed(2)}</span>
        {product.discount > 0 && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
      </div>

      {/* Columna de Cantidad */}
      <div className="product-quantity-control">
        <button onClick={handleDecrement} aria-label="Disminuir cantidad">-</button>
        <span className="quantity-value">{product.quantity} UN.</span>
        <button onClick={handleIncrement} aria-label="Aumentar cantidad">+</button>
      </div>

    </div>
  );
};

export default ProductItem;