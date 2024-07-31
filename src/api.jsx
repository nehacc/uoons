// api.jsx
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || ''; // Will default to empty string if variable is not set

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // If you need to send cookies with requests
});
console.log('REACT_APP_API_BASE_URL:', import.meta.env.REACT_APP_API_BASE_URL);
console.log('baseURL:', baseURL);
export default api;
