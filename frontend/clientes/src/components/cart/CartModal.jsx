// src/components/cart/CartModal.jsx
import React from 'react';
import CartItem from './CartItem';
import Button from '../ui/Button';
import { X } from 'lucide-react';

export default function CartModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  updateQuantity, 
  removeFromCart, 
  getTotalPrice 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-500">Resumen de la Orden</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
            <Button onClick={onClose}>Seguir Comprando</Button>
          </div>
        ) : (
          <>
            <div className="mb-6 max-h-60 overflow-y-auto">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Productos ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>S/. {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>S/. {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            <div className="mb-6">
              <p className="mb-2">Método de pago:</p>
              <div className="flex space-x-4">
                <Button variant="primary" className="flex-1">Yape</Button>
                <Button variant="secondary" className="flex-1">Plin</Button>
              </div>
            </div>
            <Button className="w-full">Confirmar Compra</Button>
          </>
        )}
      </div>
    </div>
  );
}