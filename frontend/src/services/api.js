import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/products';

export const getProducts = () => axios.get(API_BASE);
export const getProduct = (id) => axios.get(`${API_BASE}/${id}`);
export const createProduct = (data) => axios.post(API_BASE, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`);
