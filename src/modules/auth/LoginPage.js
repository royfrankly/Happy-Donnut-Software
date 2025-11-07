// src/modules/auth/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/images/logo-happydonuts.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación real
    console.log('Login attempt:', { email, password });
    
    // Simulación: redirigir al dashboard si el usuario es válido
    if (email && password) {
      // Guardar en contexto o localStorage (ejemplo básico)
      localStorage.setItem('user', JSON.stringify({ email }));
      
      // Redirigir
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="logo-wrapper">
        <img src={logo} alt="Happy Donut" className="logo" />
        <p className="system-title">Sistema Administrativo</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="primary" className="login-button">
          Iniciar Sesión
        </Button>
      </form>

      {/* Footer */}
      <footer className="login-footer">
        © 2025 HappyDonuts. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default LoginPage;