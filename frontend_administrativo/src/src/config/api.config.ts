/**
 * HappyDonuts - Configuración de API y Backend
 * 
 * 🔧 Configuración para conectar con backend en el futuro
 * 
 * MODO ACTUAL: localStorage (useLocalStorage = true)
 * MODO FUTURO: Backend API (useLocalStorage = false)
 */

/**
 * 🚀 GUÍA RÁPIDA PARA CONECTAR BACKEND:
 * 
 * 1. Configura la variable de entorno VITE_API_URL en .env:
 *    VITE_API_URL=http://localhost:3000/api
 * 
 * 2. Cambia useLocalStorage a false:
 *    useLocalStorage: false
 * 
 * 3. Los servicios automáticamente usarán las APIs
 * 
 * 4. Asegúrate que tu backend tenga los endpoints listados abajo
 */

export const API_CONFIG = {
  /**
   * 🔄 Modo de almacenamiento
   * true = Usa localStorage (modo actual - desarrollo local)
   * false = Usa API Backend (modo producción)
   */
  useLocalStorage: false,

  /**
   * 🔌 URL Base del Backend
   * Se obtiene de variable de entorno o usa default
   */
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',

  /**
   * ⏱️ Timeout de peticiones (ms)
   */
  timeout: 30000,

  /**
   * 📍 Endpoints del API
   * Estructura RESTful estándar
   */
  endpoints: {
    // Autenticación
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      me: '/auth/me',
    },

    // Ventas
    ventas: {
      comprobantes: '/ventas/comprobantes',
      comprobante: '/ventas/comprobantes/:id',
      generarNumero: '/ventas/comprobantes/generar-numero',
    },

    // Inventario
    inventario: {
      productos: '/inventario/productos',
      producto: '/inventario/productos/:id',
      insumos: '/inventario/insumos',
      insumo: '/inventario/insumos/:id',
      categorias: '/inventario/categorias',
      categoria: '/inventario/categorias/:id',
      notasEntrada: '/inventario/notas-entrada',
      notaEntrada: '/inventario/notas-entrada/:id',
      notasSalida: '/inventario/notas-salida',
      notaSalida: '/inventario/notas-salida/:id',
    },

    // Compras
    compras: {
      all: '/compras',
      byId: '/compras/:id',
      recibir: '/compras/:id/recibir',
    },

    // Clientes y Proveedores
    clientesProveedores: {
      all: '/clientes-proveedores',
      byId: '/clientes-proveedores/:id',
      clientes: '/clientes-proveedores/clientes',
      proveedores: '/clientes-proveedores/proveedores',
    },

    // Promociones
    promociones: {
      all: '/promociones',
      byId: '/promociones/:id',
      activas: '/promociones/activas',
    },

    // Caja
    caja: {
      apertura: '/caja/apertura',
      cierre: '/caja/cierre',
      estado: '/caja/estado',
      movimientos: '/caja/movimientos',
      historial: '/caja/historial',
    },

    // Configuración
    configuracion: {
      datosEmpresa: '/configuracion/datos-empresa',
      usuarios: '/configuracion/usuarios',
      usuario: '/configuracion/usuarios/:id',
      locales: '/configuracion/locales',
      local: '/configuracion/locales/:id',
    },
  },

  /**
   * 🔐 Headers por defecto
   */
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  /**
   * 📊 Configuración de respuestas
   */
  response: {
    // Formato esperado de respuestas exitosas
    successFormat: {
      data: 'data',
      message: 'message',
    },
    // Formato esperado de respuestas de error
    errorFormat: {
      error: 'error',
      message: 'message',
    },
  },
};

/**
 * 🛠️ Helper para construir URLs con parámetros
 */
export const buildURL = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = API_CONFIG.baseURL + endpoint;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  
  return url;
};

/**
 * 🔄 Helper para verificar si está en modo API
 */
export const isAPIMode = (): boolean => {
  return !API_CONFIG.useLocalStorage;
};

export default API_CONFIG;
