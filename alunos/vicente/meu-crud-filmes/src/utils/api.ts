import axios from 'axios';

const API_BASE_URL = 'http://85.209.93.21:8885';
const FILMES_RESOURCE = '/filmes'; 

const api = axios.create({
  baseURL: `${API_BASE_URL}${FILMES_RESOURCE}`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;