// frontend-admin/js/login.js

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const API_URL = 'http://localhost:8080/api'; // URL correcta de la API

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            // Si el servidor responde con un error (ej. 401, 422)
            throw new Error(data.message || 'Error en el login.');
        }

        // Login exitoso
        if (data.access_token) {
            // Guardar el token en el almacenamiento local del navegador
            localStorage.setItem('authToken', data.access_token);
            // Redirigir al panel de administración
            window.location.href = 'index.html';
        } else {
            throw new Error('No se recibió el token de acceso.');
        }

    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
    }
});
