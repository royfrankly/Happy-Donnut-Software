import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getAllProducts = () => api.get('/products');
export const getProductDetails = (productId) => api.get(`/products/${productId}`);
export const getAllPromotions = () => api.get('/promotions');
export const getCart = () => api.get('/cart');
export const addToCart = (item) => api.post('/cart/add', item);
export const checkout = (orderData) => api.post('/orders/checkout', orderData);

export default api;
