import axios from 'axios';

// on my laptop it talks to the backend on 5001
// on the server nginx passes /api to the backend so it just uses the same address
const axiosInstance = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:5001' : '',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;