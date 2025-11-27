


const GATEWAY_BASE_URL = process.env.REACT_APP_GATEWAY_URL;

/**
 * Función que maneja la solicitud de login al API Gateway.
 * @param {string} email - Correo del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {object} Un objeto con 'success' y 'data' o 'error'.
 */
export async function loginUser(email, password) {
    
    if (!GATEWAY_BASE_URL) {
        throw new Error("La variable de entorno REACT_APP_GATEWAY_URL no está configurada.");
    }

    const loginEndpoint = `${GATEWAY_BASE_URL}/api/auth/login`; 

    try {
        const response = await fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // La mayoría de las veces, la respuesta es JSON, incluso si hay un error 400.
        const data = await response.json(); 

        if (response.ok) {
            // Éxito (código 2xx)
            return { success: true, data: data };
        } else {
            // Error de autenticación/servidor (código 4xx, 5xx)
            return { success: false, error: data, status: response.status };
        }

    } catch (error) {
        // Error de red (el API Gateway no está corriendo, error de CORS, etc.)
        console.error('Error de red al intentar conectar con el Gateway:', error);
        return { 
            success: false, 
            error: { message: "Error de red: El servicio no está disponible." } 
        };
    }
}