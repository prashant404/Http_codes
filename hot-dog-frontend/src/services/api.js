import axios from 'axios';

const api = axios.create({
  baseURL: 'https://http-codes-api.onrender.com/api',
});

export default api;
