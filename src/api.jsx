import axios from 'axios';

const api = axios.create({
  baseURL: 'https://uoons.com/', // Update this with your actual backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;