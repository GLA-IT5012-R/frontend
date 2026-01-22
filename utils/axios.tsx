import axios from 'axios'

export const baseUrl = '/api'
const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: false, // 你现在还没 cookie / session
})

/* 请求拦截器 */
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('Token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    console.log('响应拦截器', response)
    // 假设后端返回 code
    if (response.data.code === 401) {
      console.error('未登录，跳转登录页')
      localStorage.clear()
      window.location.href = '/login'
    }
    return response.data // 直接返回 data
  },
  error => {
    console.error('HTTP 请求错误', error)
    return Promise.reject(error)
  }
)

export default http

export const get = (url: string, params?: any) => http.get(url, { params })
export const post = (url: string, data?: any) => http.post(url, data)