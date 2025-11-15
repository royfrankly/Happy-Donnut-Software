import React, { useState } from 'react';
import './login.css';
function RegisterForm(){
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  return(
    <form className="login-form">
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ingresa tu nombre"
      />

      <label htmlFor="apellido">Apellido</label>
      <input
        type="text"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Ingresa tu apellido"
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingresa tu correo"
      />
      
      <label htmlFor="contrasena">Contraseña</label>
      <input
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        placeholder="Ingresa tu contraseña"
      />

      <button type="submit">Registrarse</button>
    </form>
  );
}
export default RegisterForm;
