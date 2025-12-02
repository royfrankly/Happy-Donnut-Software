import React, { useState, useEffect } from 'react';
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
import { getCart, addToCart as apiAddToCart, checkout as apiCheckout } from './services/apiService';


export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cartError, setCartError] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCartItems(response.data);
      } catch (error) {
        setCartError('Error al cargar el carrito.');
      } finally {
        setIsCartLoading(false);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await apiAddToCart(product);
      setCartItems(response.data);
    } catch (error) {
      setCartError('Error al agregar el producto al carrito.');
    }
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

  const handleCheckout = async () => {
    try {
      await apiCheckout({ cartItems });
      setCartItems([]);
      setIsCartOpen(false);
      // Optionally, show a success message
    } catch (error) {
      setCartError('Error al procesar la compra.');
    }
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
        handleCheckout={handleCheckout}
        isLoading={isCartLoading}
        error={cartError}
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