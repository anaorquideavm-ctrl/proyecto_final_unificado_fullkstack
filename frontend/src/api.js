import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const obtenerProductos = async () => {
  try {
    const res = await api.get('/productos');
    return res.data;
  } catch (error) {
    return [];
  }
};

export const loginUsuario = async (credenciales) => {
  const res = await api.post('/auth/login', credenciales);
  return res.data;
};

export const registrarUsuario = async (datos) => {
  const res = await api.post('/auth/register', datos);
  return res.data;
};
