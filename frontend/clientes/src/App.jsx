import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartModal from './components/cart/CartModal';
import LoginModal from './components/auth/LoginModal';
import Home from './pages/Home';
import Products from './pages/Products';
import Promotions from './pages/Promotions';
import About from './pages/About';
import Contact from './pages/Contact';
import Comments from './pages/Comments';

// CORRECCIÓN 1: Ajusté la ruta porque en tu imagen el archivo está dentro de "layout"
import HealthCheck from './components/layout/HealthCheck';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showLogin, setShowLogin] = useState(true);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, id: Date.now() }];
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const getTotalPrice = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login con:', loginForm);
    setIsLoginOpen(false);
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  const renderPage = () => {
    const props = { addToCart };
    switch (activeSection) {
      case 'inicio': return <Home {...props} />;
      case 'productos': return <Products {...props} />;
      case 'promociones': return <Promotions {...props} />;
      case 'nosotros': return <About />;
      case 'contacto': return <Contact />;
      case 'comentarios': return <Comments />;
      default: return <Home {...props} />;
    }
  };

  return (
    <div className="font-sans antialiased">
      {/* CORRECCIÓN 2: Aquí agregamos el HealthCheck dentro de la App principal */}
      <HealthCheck />

      <Header
        activeSection={activeSection}
        handleNavigation={handleNavigation}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
      
      <main>{renderPage()}</main>
      
      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        handleLogin={handleLogin}
      />
    </div>
  );
}