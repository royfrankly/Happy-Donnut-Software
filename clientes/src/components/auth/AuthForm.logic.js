// Renombrado a 'authService.js' o similar
const GATEWAY_BASE_URL = process.env.REACT_APP_GATEWAY_URL;

// ----------------------------------------------------------------------
// Función Auxiliar para manejar la llamada genérica al API Gateway
// ----------------------------------------------------------------------
async function apiCall(endpoint, body) {
    if (!GATEWAY_BASE_URL) {
        throw new Error("La variable de entorno REACT_APP_GATEWAY_URL no está configurada.");
    }
    
    // Construye la URL completa
    const url = `${GATEWAY_BASE_URL}/api/auth${endpoint}`; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json(); 

        if (response.ok) {
            // Éxito (código 2xx)
            return { success: true, data: data };
        } else {
            // Error de autenticación/servidor (código 4xx, 5xx)
            return { success: false, error: data, status: response.status };
        }

    } catch (error) {
        // Error de red
        console.error('Error de red al intentar conectar con el Gateway:', error);
        return { 
            success: false, 
            error: { message: "Error de red: El servicio no está disponible." } 
        };
    }
}

// ----------------------------------------------------------------------
// 1. Lógica de Login (Refactorizada para usar apiCall)
// ----------------------------------------------------------------------
/**
 * Función que maneja la solicitud de login al API Gateway.
 * @param {string} email - Correo del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {object} Un objeto con 'success' y 'data' o 'error'.
 */
export async function loginUser(email, password) {
    // Llama a la función auxiliar con el endpoint específico '/login'
    return apiCall('/login', { email, password });
}


// ----------------------------------------------------------------------
// 2. Lógica de Registro (Nueva)
// ----------------------------------------------------------------------
/**
 * Función que maneja la solicitud de registro al API Gateway.
 * Incluye validación local de contraseñas.
 * @param {string} name - Nombre completo del usuario.
 * @param {string} email - Correo del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {string} confirmPassword - Confirmación de la contraseña.
 * @returns {object} Un objeto con 'success' y 'data' o 'error'.
 */
export async function registerUser(name, email, password, confirmPassword) {
    
    // **Validación local (Mejora)**
    if (password !== confirmPassword) {
        return { 
            success: false, 
            error: { 
                message: "Las contraseñas ingresadas no coinciden.",
                field: "confirmPassword" 
            } 
        };
    }

    // Llama a la función auxiliar con el endpoint específico '/register'
    // Se excluye 'confirmPassword' ya que el backend no lo necesita.
    return apiCall('/register', { name, email, password });
}