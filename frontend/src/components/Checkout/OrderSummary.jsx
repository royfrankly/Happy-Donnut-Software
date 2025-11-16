

import React from 'react';

const OrderSummary = ({ subtotal = 0, discount = 0, total = 0, itemsCount, products, paymentMethod }) => {
  // OPNCINAL Determina el conteo de productos seleccionados: preferir itemsCount, si no, calcular de products
  const count = typeof itemsCount === 'number'
    ? itemsCount
    : Array.isArray(products)
      ? products.filter(p => p.isSelected).length
      : undefined;

  return (
    <div className="order-summary-box">
      <h3>Resumen de la orden</h3>

      {/* Detalle de precios */}
      <div className="summary-row">
        <span>Productos {typeof count === 'number' ? `(${count})` : ''}</span>
        <span>S/ {Number(subtotal).toFixed(2)}</span>
      </div>

      <div className="summary-row discount-row">
        <span>Descuentos</span>
        <span className="discount-amount">- S/ {Number(discount).toFixed(2)}</span>
      </div>

      <hr />

      <div className="summary-row total-row summary-row total">
        <strong>Total:</strong>
        <strong>S/ {Number(total).toFixed(2)}</strong>
      </div>

      {/* Información extra como el descuento */}
      <div className="falabella-info">
        <p>Total con Falabella: <span className="falabella-price">S/ {Number(total - 0.90).toFixed(2)}</span></p>
      </div>

      {paymentMethod && (
        <div className="summary-row payment-method-row">
          <span>Método de pago:</span>
          <span style={{ textTransform: 'uppercase' }}>{paymentMethod}</span>
        </div>
      )}

      {/* Botón de Pago */}
      <button className="checkout-button">
        Continuar compra
      </button> 
    </div>
  );
};

export default OrderSummary;