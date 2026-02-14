
import axios from 'axios';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: false,
});

/* 请求拦截器 */
http.interceptors.request.use(config => {
  const token = localStorage.getItem('Token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* 响应拦截器 */
http.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default http;
