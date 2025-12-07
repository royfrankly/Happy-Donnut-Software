/**
 * HappyDonuts - Servicio de Productos
 * 
 * 🔌 Backend Ready: Este servicio está preparado para conectar con una API
 * Actualmente usa localStorage, pero puede cambiar fácilmente a API REST
 */

import type { Producto } from '@/types';
import { API_CONFIG } from '@/config/api.config';
import { productosService as localStorageProductos } from '../storage/localStorage.service';

/**
 * Servicio de Productos
 * Abstrae la capa de datos (localStorage o API)
 */
export const productosAPI = {
  /**
   * Obtiene todos los productos
   */
  async getAll(): Promise<Producto[]> {
    if (API_CONFIG.useLocalStorage) {
      // Modo localStorage (actual)
      return Promise.resolve(localStorageProductos.getAll());
    }
    
    // 🔌 Modo API (futuro)
    // const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.inventario.productos}`, {
    //   method: 'GET',
    //   headers: API_CONFIG.defaultHeaders,
    // });
    // if (!response.ok) throw new Error('Error al obtener productos');
    // const data = await response.json();
    // return data.data;
    
    return Promise.resolve(localStorageProductos.getAll());
  },

  /**
   * Obtiene un producto por ID
   */
  async getById(id: number): Promise<Producto | undefined> {
    if (API_CONFIG.useLocalStorage) {
      const productos = localStorageProductos.getAll();
      return Promise.resolve(productos.find(p => p.id === id));
    }
    
    // 🔌 Modo API (futuro)
    // const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.inventario.producto}`.replace(':id', String(id));
    // const response = await fetch(url, {
    //   method: 'GET',
    //   headers: API_CONFIG.defaultHeaders,
    // });
    // if (!response.ok) throw new Error('Error al obtener producto');
    // const data = await response.json();
    // return data.data;
    
    const productos = localStorageProductos.getAll();
    return Promise.resolve(productos.find(p => p.id === id));
  },

  /**
   * Crea un nuevo producto
   */
  async create(producto: Producto): Promise<Producto> {
    if (API_CONFIG.useLocalStorage) {
      localStorageProductos.add(producto);
      return Promise.resolve(producto);
    }
    
    // 🔌 Modo API (futuro)
    // const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.inventario.productos}`, {
    //   method: 'POST',
    //   headers: API_CONFIG.defaultHeaders,
    //   body: JSON.stringify(producto),
    // });
    // if (!response.ok) throw new Error('Error al crear producto');
    // const data = await response.json();
    // return data.data;
    
    localStorageProductos.add(producto);
    return Promise.resolve(producto);
  },

  /**
   * Actualiza el stock de un producto
   */
  async updateStock(id: number, cantidad: number): Promise<void> {
    if (API_CONFIG.useLocalStorage) {
      localStorageProductos.update(id, cantidad);
      return Promise.resolve();
    }
    
    // 🔌 Modo API (futuro)
    // const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.inventario.producto}`.replace(':id', String(id));
    // const response = await fetch(`${url}/stock`, {
    //   method: 'PATCH',
    //   headers: API_CONFIG.defaultHeaders,
    //   body: JSON.stringify({ cantidad }),
    // });
    // if (!response.ok) throw new Error('Error al actualizar stock');
    
    localStorageProductos.update(id, cantidad);
    return Promise.resolve();
  },

  /**
   * Actualiza un producto completo
   */
  async update(id: number, producto: Producto): Promise<Producto> {
    if (API_CONFIG.useLocalStorage) {
      const productos = localStorageProductos.getAll();
      const index = productos.findIndex(p => p.id === id);
      if (index !== -1) {
        productos[index] = producto;
        localStorageProductos.save(productos);
      }
      return Promise.resolve(producto);
    }
    
    // 🔌 Modo API (futuro)
    // const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.inventario.producto}`.replace(':id', String(id));
    // const response = await fetch(url, {
    //   method: 'PUT',
    //   headers: API_CONFIG.defaultHeaders,
    //   body: JSON.stringify(producto),
    // });
    // if (!response.ok) throw new Error('Error al actualizar producto');
    // const data = await response.json();
    // return data.data;
    
    const productos = localStorageProductos.getAll();
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
      productos[index] = producto;
      localStorageProductos.save(productos);
    }
    return Promise.resolve(producto);
  },

  /**
   * Elimina un producto
   */
  async delete(id: number): Promise<void> {
    if (API_CONFIG.useLocalStorage) {
      const productos = localStorageProductos.getAll();
      const filtered = productos.filter(p => p.id !== id);
      localStorageProductos.save(filtered);
      return Promise.resolve();
    }
    
    // 🔌 Modo API (futuro)
    // const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.inventario.producto}`.replace(':id', String(id));
    // const response = await fetch(url, {
    //   method: 'DELETE',
    //   headers: API_CONFIG.defaultHeaders,
    // });
    // if (!response.ok) throw new Error('Error al eliminar producto');
    
    const productos = localStorageProductos.getAll();
    const filtered = productos.filter(p => p.id !== id);
    localStorageProductos.save(filtered);
    return Promise.resolve();
  },

  /**
   * Busca un producto por nombre
   */
  async findByNombre(nombre: string): Promise<Producto | undefined> {
    if (API_CONFIG.useLocalStorage) {
      return Promise.resolve(localStorageProductos.findByNombre(nombre));
    }
    
    // 🔌 Modo API (futuro)
    // const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.inventario.productos}?nombre=${encodeURIComponent(nombre)}`, {
    //   method: 'GET',
    //   headers: API_CONFIG.defaultHeaders,
    // });
    // if (!response.ok) throw new Error('Error al buscar producto');
    // const data = await response.json();
    // return data.data[0];
    
    return Promise.resolve(localStorageProductos.findByNombre(nombre));
  },
};

export default productosAPI;
