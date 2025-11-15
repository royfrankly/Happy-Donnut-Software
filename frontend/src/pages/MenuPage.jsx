import React from 'react';
import ProductCard from '../components//ProductCard/ProductCard';
import Header from '../components//Header/Header';
import './MenuPage.css';

function MenuPage() {

  
  const products = [
    {
      name: 'Dona Glaseada',
      description: 'Clásica dona cubierta con glaseado de vainilla.',
      price: 4.50,
      image: '/images/donas_glaseadas.jpg',
    },
    {
      name: 'Dona de Chocolate',
      description: 'Suave masa bañada en chocolate derretido.',
      price: 5.00,
      image: 'https://i.imgur.com/NcOaG5b.png',
    },
    {
      name: 'Café Americano',
      description: 'Café filtrado de sabor intenso y aroma profundo.',
      price: 6.00,
      image: 'https://i.imgur.com/3F3f6eB.png',
    },
    {
      name: 'Cappuccino',
      description: 'Espuma cremosa con un toque de canela.',
      price: 7.00,
      image: 'https://i.imgur.com/Lb5Twby.png',
    },
    {
      name: 'Moka Frappé',
      description: 'Café frío mezclado con chocolate y crema batida.',
      price: 8.50,
      image: 'https://i.imgur.com/gEwdSMg.png',
    },
  ];

  return (
    <>
    <div>
      <Header/>
    </div>
      <div className="menu-container">
        
        <h1 className="menu-title">Menú de la Cafetería</h1>
        <div className="product-grid">
          {products.map((item, index) => (
            <ProductCard
              key={index}
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuPage;
