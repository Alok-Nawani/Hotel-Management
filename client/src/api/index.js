import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const menuAPI = {
  getAll: () => api.get('/menu'),
  create: (item) => api.post('/menu', item),
  update: (id, item) => api.put(`/menu/${id}`, item),
  delete: (id) => api.delete(`/menu/${id}`),
};

export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (order) => api.post('/orders', order),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

export const tableAPI = {
  getAll: () => api.get('/tables'),
  updateStatus: (id, status) => api.put(`/tables/${id}/status`, { status }),
};

export const roomAPI = {
  getAll: () => api.get('/rooms'),
  getById: (id) => api.get(`/rooms/${id}`),
  create: (formData) => api.post('/rooms', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id, formData) => api.put(`/rooms/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id) => api.delete(`/rooms/${id}`),
};

export const bookingAPI = {
  getAll: () => api.get('/bookings'),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  create: (bookingData) => api.post('/bookings', bookingData),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

export default api;
