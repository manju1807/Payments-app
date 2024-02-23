import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://34.100.224.235',
  auth: {
    username: 'admin',
    password: 'test@123',
  },
});

export default api;
