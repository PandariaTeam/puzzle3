import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const createAxiosByinterceptors = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    timeout: 10000, //超时配置
    ...config // 自定义配置覆盖基本配置
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config: any) {
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      const { success, data } = response.data;
      if (success) return data;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
};

export const client = createAxiosByinterceptors({
  baseURL: 'https://service.puzzle3.cc/api/metadata'
});
