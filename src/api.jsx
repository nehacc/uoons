import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://uoons.com';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This ensures cookies are sent with requests, if needed
});

export default api;