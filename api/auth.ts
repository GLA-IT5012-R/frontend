import http from '@/utils/axios';
import {api} from './api';

export const authApi = {
  // 请求验证码
  requestCode: async (email: string) => {
    return http.post(api.requestCode, { email });
  },

  // 验证验证码并登录 / 注册
  loginOrRegister: async (email: string, code: string) => {
    return http.post(api.loginOrRegister, { email, code });
  },

};

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
export const getAssetsList = (options?: {
  page?: number;
  page_size?: number;
}) => {
  const { page, page_size } = options || {};

  return http.post(api.getAssetsList, {
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

// 添加产品
export const addProductApi = (data: {
  name: string;          // 产品名称
  type?: number;         // 产品类型（单品1/套装2），默认1
  price: string;         // 产品价格，例如 "399.99"
  status?: boolean;      // 是否上架，默认 true
  p_size?: string;       // 尺寸，例如 "160,143,123"
  p_finish?: string;     // 工艺，例如 "matte,glossy"
  p_desc?: string;       // 产品描述
  type_id: string;       // 关联单品资源 type_id
}) => http.post(api.addProducts, data);


// add order
// 单个订单项
export interface OrderItemPayload {
  design_id: number;
  product_id?: number; // 可选
  quantity: number;
  unit_price: number;
}

// 整个订单
export interface AddOrderPayload {
  user_id: number;
  total_price: number;
  order_status?: string;
  address?: string;
  email?: string;
  list: OrderItemPayload[];
}
export const addOrderApi = (data: AddOrderPayload) =>
  http.post(api.addOrder, data);
