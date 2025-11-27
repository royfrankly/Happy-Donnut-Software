// components/RegisterForm/RegisterForm.logic.js

// Lee la URL base del API Gateway desde el archivo .env
const GATEWAY_BASE_URL = process.env.REACT_APP_GATEWAY_URL;

/**
 * Función que maneja la solicitud de registro al API Gateway.
 * @param {object} userData - Datos del usuario (nombre, apellido, email, contrasena).
 * @returns {object} Un objeto con 'success' y 'data' o 'error'.
 */
export async function registerUser(userData) {
    
    if (!GATEWAY_BASE_URL) {
        // Lanza un error si la variable no está configurada, ayudando al debug.
        throw new Error("La variable de entorno REACT_APP_GATEWAY_URL no está configurada.");
    }

    // Endpoint de registro (asumiendo '/api/auth/register' en tu Laravel Gateway)
    const registerEndpoint = `${GATEWAY_BASE_URL}/api/auth/register`; 

    // Mapea el campo 'contrasena' a 'password', ya que el backend espera 'password'
    const payload = {
        name: userData.nombre,
        last_name: userData.apellido,
        email: userData.email,
        password: userData.contrasena
    };

    try {
        const response = await fetch(registerEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json(); 

        if (response.ok) {
            // Éxito (código 2xx)
            return { success: true, data: data };
        } else {
            // Error de validación o servidor (código 4xx, 5xx)
            return { success: false, error: data, status: response.status };
        }

    } catch (error) {
        // Error de red (API Gateway no está corriendo)
        console.error('Error de red al intentar conectar con el Gateway:', error);
        return { 
            success: false, 
            error: { message: "Error de red: El servicio de registro no está disponible." } 
        };
    }
}