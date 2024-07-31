// api.jsx
import axios from 'axios';

const api = axios.create({
  baseURL: '${import.meta.env.REACT_APP_API_BASE_URL}/', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


export default api;
