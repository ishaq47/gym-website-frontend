// src/services/authService.js
import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const fetchProfile = () =>
  axios.get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const fetchSubscribers = () =>
  axios.get(`${API_URL}/admin/subscribers`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
