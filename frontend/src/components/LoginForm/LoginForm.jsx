import React, { useState } from 'react';
import './login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Simulación de login (aquí luego conectarías con una API)
    if (email === 'admin@gmail.com' && password === '123456') {
      alert('Inicio de sesión exitoso 🎉');
    } else {
      alert('Credenciales incorrectas 😕');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>Correo electrónico:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingresa tu correo"
      />

      <label>Contraseña:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
      />

      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;
