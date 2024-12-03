// src/services/authService.js
import axios from 'axios';
import { baseUrl } from '../BaseUrl';

export const API_URL = `${baseUrl}/api`;

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const fetchProfile = () =>
  axios.get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const fetchSubscribers = () =>
  axios.get(`${API_URL}/admin/subscribers`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
