import api from './axios';

export const getSpaces = () => api.get('/spaces').then((res) => res.data);

export const createSpace = (payload) => api.post('/spaces', payload).then((res) => res.data);

export const updateSpace = (id, payload) => api.put(`/spaces/${id}`, payload).then((res) => res.data);

export const deleteSpace = (id) => api.delete(`/spaces/${id}`).then((res) => res.data);