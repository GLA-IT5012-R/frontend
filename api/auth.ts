import http from '@/utils/axios';
import {api} from './api';

// 登录
export const loginApi = (data: { username: string; password: string }) =>
  http.post(api.login, data)

// 刷新 token
export const refreshTokenApi = (data: { refresh: string }) =>
  http.post(api.refreshToken, data)
// 测试需要认证的接口
export const getTestAuth = () => http.get(api.testAuth);

// 同步用户信息到后端
export const syncUserApi = (data: { id: string; email: string; name: string }) =>
  http.post(api.syncUser, data);

// 获取产品列表（支持分页）
export const getProducts = (options?: {
  page?: number;
  page_size?: number;
  params?: {
    keyword?: string;
    type?: string;
    min_price?: number | null | "";
    max_price?: number | null | "";
  };
}) => {
  const { page, page_size, params } = options || {};

  // 只保留有效筛选字段
  const filteredParams: Record<string, any> = {};
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        filteredParams[key] = value;
      }
    });
  }

  return http.post(api.getProducts, {
    page: page_size && !page ? 1 : page,
    page_size,
    params: filteredParams,
  });
};

// 获取产品资产列表
export const getProductAssets = (options?: {
  page?: number;
  page_size?: number;
}) => {
  const { page, page_size } = options || {};

  return http.post(api.getProductAssets, {
    page: page_size && !page ? 1 : page,
    page_size,
  });
};

// 更新产品状态
export const updateProductStatus = (data: { id: string; status: boolean }) =>
  http.post(api.updateProductStatus, data);

// 获取基础统计信息
export const getStatsOverview = () => http.get(api.statsOverview);

export type UploadTextureResponse = {
  code: number;
  data: { path: string; url: string; filename: string };
  message: string;
};

// 上传纹理图片（multipart/form-data，字段 file 或 image）；拦截器返回 response.data
export const uploadTextureApi = (file: File): Promise<UploadTextureResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  return http.post(api.upload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }) as Promise<UploadTextureResponse>;
};


// 添加用户定制记录
export const addCustomDesignApi = (data: {
  product_id: number;
  user_id: number;
  p_size: string;
  p_finish: string;
  p_flex: string;
  p_textures: string[]; // 纹理 URL 列表
}) => http.post(api.addCustomDesign, data);