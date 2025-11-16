// src/components/cart/ProductList.jsx

import React from 'react';
import ProductItem from './ProductItem.jsx'; // Importación directa

const ProductList = ({ products, onQuantityChange, onToggleSelect }) => {
  return (
    <div className="product-list">
      {/* Encabezado fijo del carrito (Envío, Vendedor, Checkbox general) */}
      <div className="cart-header-info">
        <div className="shipping-info">
          <span>🚚 Envío rápido</span> | <span>Recibe en las próximas horas</span>
        </div>
        <div className="vendor-info">
          <span>Vendido por: **TOTTUS**</span>
          <input type="checkbox" defaultChecked />
          <span>Seleccionar todos</span>
        </div>
      </div>
      
      {/* Mapeo de productos */}
      {products.map((product) => (
        <ProductItem 
          key={product.id} 
          product={product} 
          isSelected={product.isSelected}
          onQuantityChange={onQuantityChange}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
};

export default ProductList;