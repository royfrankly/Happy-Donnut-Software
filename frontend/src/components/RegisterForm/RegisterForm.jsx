
import React, { useState } from 'react';
import './login.css'; 
// 1. Importa la lógica de registro
import { registerUser } from './RegisterForm.logic'; 

function RegisterForm(){
    // Estados para los campos de entrada
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    // Estados para la UI (Manejo de Carga y Errores)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
   
        setError(null);
        setIsLoading(true);

        const userData = { nombre, apellido, email, contrasena };

        // Llama a la función de lógica externa (donde está el fetch)
        const result = await registerUser(userData);
        
        // Desactivar el indicador de carga
        setIsLoading(false);

        if (result.success) {
            console.log("Registro Exitoso:", result.data);
            alert("¡Usuario registrado con éxito!");
            // Puedes limpiar el formulario o redirigir
            setNombre('');
            setApellido('');
            setEmail('');
            setContrasena('');
        } else {
            
            console.error("Fallo de Registro:", result.error);
            // Muestra un mensaje amigable al usuario
            setError(result.error.message || "Error al registrarse. Verifica tus datos.");
        }
    };


    return(
        // 3. Conecta la función de envío al formulario
        <form className="login-form" onSubmit={handleSubmit}>
            
            <label htmlFor="nombre">Nombre</label>
            <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
                required
            />

            <label htmlFor="apellido">Apellido</label>
            <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ingresa tu apellido"
                required
            />

            <label htmlFor="email">Correo electrónico</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
            />
            
            <label htmlFor="contrasena">Contraseña</label>
            <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
            />

            {/* Muestra un error si existe (Sección de Manejo de Errores) */}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            
            {/* Botón de Envío (Deshabilitado mientras carga) */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Registrarse'}
            </button>
        </form>
    );
}
export default RegisterForm;