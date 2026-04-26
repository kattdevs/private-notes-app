import axios from 'axios';

//Base URL of your Express backend 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, //Send cookies with every request
});

//--Auth API---
export const authAPI = {
    signup: (email, passoword) =>
        api.post('/api/auth/signup', {email, password}),

    login: (email, password) =>
        api.post('/api/auth/login', {email, password}),

    logout: () => api.post('/api/auth/logout'),

    me: () => api.get('/api/auth/me'),
};

//Notes API
export const notesAPI ={
    getAll: () => api.get('/api/notes'),

    create: (title, content) =>
        api.post('/api/notes', {title, content}),

    update: (id, title, content) =>
        api.put(`/api/notes/${id}`, {title, content}),

    delete: (id) => api.delete(`/api/notes/${id}`),
};

export default api;