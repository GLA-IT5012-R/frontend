import http from '@/utils/axios';

// 登录
export const loginApi = (data: { username: string; password: string }) =>
  http.post('/login/', data)

// 刷新 token
export const refreshTokenApi = (data: { refresh: string }) =>
  http.post('/token/refresh/', data)
// 测试需要认证的接口
export const getTestAuth = () => http.get('/testAuth/');

// 同步用户信息到后端
export const syncUserApi = (data: { id: string; email: string; name: string }) =>
  http.post('/sync-user/', data);

// 获取产品列表
export const getProducts = () => http.get('/products-show/');