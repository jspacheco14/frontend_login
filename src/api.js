import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor to attach JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (username, password) => {
    console.log([{username, password}])
    const response = await api.post('/auth/login', { username, password });
    console.log({"data": response.data})
    return response.data;
};

export const getWasteCategories = async () => {
    const response = await api.get('/waste/category');
    return response.data;
};

export const createInference = async (data, token) => {
    const response = await api.post('/waste/waste', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getWasteLogs = async (token) => {
    const response = await api.get('/waste/waste', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export default api;
