// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  CATEGORIES: `${API_BASE_URL}/categories`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  ADMIN_ME: `${API_BASE_URL}/auth/me`
};

export default API_BASE_URL;
