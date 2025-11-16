

import React, { useState, useMemo } from 'react';
import './ShoppingCart.css';
import DalgonaImg from '../assets/coffes/dalgona.avif';
import LatteImg from '../assets/coffes/Latte.webp';
import ColdImg from '../assets/coffes/cold-brew.jpg';
import ArtImg from '../assets/coffes/Latte_Art.webp';
import ClasicImg from '../assets/coffes/clasic.jpg';

import ProductItem from '../components/Cart/ProductItem.jsx';
import OrderSummary from '../components/Checkout/OrderSummary.jsx'; 
import PaymentMethods from '../components/Checkout/PaymentMethods.jsx';

//  Datos simulados iniciales 
const initialProducts = [
  { id: 1, name: 'Dalgona Coffee', price: 12.90, quantity: 1, isSelected: true, imageUrl: DalgonaImg, vendor: 'Happy Donnuts', discount: 0 },
  { id: 2, name: 'Latte', price: 9.50, quantity: 1, isSelected: true, imageUrl: LatteImg, vendor: 'Happy Donnuts', discount: 0 },
  { id: 3, name: 'Cold Brew', price: 11.00, quantity: 1, isSelected: true, imageUrl: ColdImg, vendor: 'Happy Donnuts', discount: 10 },
  { id: 4, name: 'Latte Art', price: 13.50, quantity: 1, isSelected: false, imageUrl: ArtImg, vendor: 'Happy Donnuts', discount: 0 },
  { id: 5, name: 'Café Clásico', price: 7.00, quantity: 1, isSelected: false, imageUrl: ClasicImg, vendor: 'Happy Donnuts', discount: 0 },
];

const ShoppingCartPage = () => {
    // 1. Estado para productos y método de pago
  const [products, setProducts] = useState(initialProducts);
  const [selectedPayment, setSelectedPayment] = useState('yape');
  
    // 2. Lógica para cambiar la cantidad de un producto
  const handleQuantityChange = (id, newQuantity) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === id ? { ...p, quantity: newQuantity } : p
      )
    );
  };
  
    // 3. Lógica para seleccionar/deseleccionar un producto
  const handleToggleSelect = (id) => {
    setProducts(prev => 
        prev.map(p => 
            p.id === id ? { ...p, isSelected: !p.isSelected } : p
        )
    );
  };
  
    // 4. Cálculo de subtotal, descuento y total usando useMemo
  const { subtotal, total } = useMemo(() => {
    let currentSubtotal = 0;
    products.forEach(p => {
      if (p.isSelected) {
        currentSubtotal += p.price * p.quantity;
      }
    });
    // Simulación de descuento fijo 
    const fixedDiscount = 3.00; 
    const finalTotal = currentSubtotal - fixedDiscount;

    return { 
      subtotal: currentSubtotal, 
      discount: fixedDiscount, 
      total: finalTotal 
    };
  }, [products]);

  return (
    // Estructura de dos columnas (usando flexbox o grid en el CSS)
    <div className="shopping-cart-layout">
      
      {/* Columna Izquierda: Lista de Productos */}
      <div className="cart-list-container">
        <h2>Carrito ({products.length} productos)</h2>
        
        {products.map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
            isSelected={product.isSelected}
            onQuantityChange={handleQuantityChange}
            onToggleSelect={handleToggleSelect}
          />
        ))}
      </div>

      {/* Columna Derecha: Resumen de la Orden */}
      <div className="order-summary-column">
        <PaymentMethods selected={selectedPayment} onChange={setSelectedPayment} />
        <OrderSummary 
            subtotal={subtotal}
            discount={3.00} // Usamos el valor fijo de ejemplo
            total={total}
            itemsCount={products.filter(p => p.isSelected).length}
            products={products}
            paymentMethod={selectedPayment}
        />
      </div>
      
    </div>
  );
};

export default ShoppingCartPage;