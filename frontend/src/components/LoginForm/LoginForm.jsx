// LoginForm.jsx

import React, { useState } from 'react';
import './login.css'; 

import { loginUser } from './LoginForm.logic'; 

function LoginForm(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //  Estados para la UI (Manejo de Carga y Errores)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //  Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Resetear errores y activar el indicador de carga
        setError(null);
        setIsLoading(true);

        // Llama a la función de lógica externa (donde está el fetch)
        const result = await loginUser(email, password);
        
        // Desactivar el indicador de carga
        setIsLoading(false);

        if (result.success) {
            console.log("Login Exitoso:", result.data);
            alert("¡Inicio de sesión exitoso!");
            // Aquí iría la lógica para guardar el token de autenticación 
            // y la redirección a la página principal.
        } else {
            // Manejo de errores
            console.error("Fallo de Login:", result.error);
            // Muestra un mensaje amigable al usuario
            setError(result.error.message || "Credenciales inválidas o error desconocido.");
        }
    };

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            
            {/* Campo de Correo Electrónico */}
            <label htmlFor="email">Correo electrónico</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
            />
            
            {/* Campo de Contraseña */}
            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
            />
            
            {/* Muestra un error si existe (Sección de Manejo de Errores) */}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            
            {/* Botón de Envío (Deshabilitado mientras carga) */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
        </form>
    );
}

export default LoginForm;