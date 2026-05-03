import axios from 'axios';

const api = axios.create({
  baseURL: 'https://agrismart-backend-kxic.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Senior Full-Stack Engineering Pattern: Centralized API Service Layer
 * Each function handles a specific business requirement, making component
 * logic cleaner and more maintainable.
 */

// --- AUTHENTICATION ---
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};

// --- FARMER DASHBOARD & DATA ---
export const fetchDashboardData = async () => {
  const response = await api.get(`/dashboard?_t=${new Date().getTime()}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });
  return response.data;
};

export const fetchWeatherData = async (city = 'Pune') => {
  const response = await api.get(`/weather?city=${city}`);
  return response.data;
};

export const fetchCropPrices = async () => {
  const response = await api.get('/crop-prices');
  return response.data;
};

export const fetchSchemesData = async () => {
  const response = await api.get('/schemes');
  return response.data;
};

export const fetchRecommendation = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/recommendations?${queryString}`);
  return response.data;
};

// --- NOTIFICATIONS ---
export const fetchNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const markNotificationRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await api.patch('/notifications/read-all');
  return response.data;
};

export const submitContactMessage = async (messageData) => {
  const response = await api.post('/contact', messageData);
  return response.data;
};

// --- MARKETPLACE & CROP MANAGEMENT ---
export const fetchCrops = async (params = {}) => {
  // Build query string from params object
  const queryString = new URLSearchParams(params).toString();
  const endpoint = queryString ? `/crops?${queryString}` : '/crops';
  const response = await api.get(endpoint);
  return response.data;
};

export const fetchMyCrops = async () => {
  const response = await api.get('/crops/mycrops');
  return response.data;
};

export const addCrop = async (cropData) => {
  const response = await api.post('/crops', cropData);
  return response.data;
};

export const updateCrop = async (id, cropData) => {
  const response = await api.put(`/crops/${id}`, cropData);
  return response.data;
};

export const deleteCrop = async (id) => {
  const response = await api.delete(`/crops/${id}`);
  return response.data;
};

export const markCropAsSold = async (id) => {
  const response = await api.patch(`/crops/${id}/sold`);
  return response.data;
};

export default api;
