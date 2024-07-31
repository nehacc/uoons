import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxied path
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials in requests if needed
});

export default api;
