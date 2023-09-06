import axios, { CanceledError } from 'axios';
import { APIError } from '@/config/errors.js';

const api = axios.create({
  withCredentials: true,
  baseURL: '/api/',
  timeout: 2000,
});

// 取消请求

const excludedUrls = ['/login', '/register'];

// 拦截器
api.interceptors.request.use(
  function (conf) {
    const controller = new AbortController();
    // 不拦截
    if (excludedUrls.includes(conf.url)) {
      localStorage.removeItem('x-user-auth-token');
    } else {
      // 检查token，并添加到header中
      const token = localStorage.getItem('x-user-auth-token');
      if (!token) {
        conf.signal = controller.signal;
        // 传入abort中的参数回出现在异常中的err.config.signal.reason中
        controller.abort('NOT_LOGIN');
      } else {
        conf.headers['x-user-auth-token'] = token;
      }
    }
    return conf;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// 捕获出问题的请求错误，抛出message用户可读的错误
api.interceptors.response.use(
  // 响应正常返回，但自定义状态码!==999的情况
  function (res) {
    if (res.data.statusCodeValue !== 999) {
      throw new APIError(res.data.statusCodeValue, res.data.message);
    }
    return { resHeaders: res.headers, resData: res.data.data };
  },
  // axios错误的情况
  function (err) {
    if (err instanceof CanceledError) {
      err.message = `接口请求取消：${err.config.signal.reason}`;
    } else {
      err.message = `接口请求失败，错误码：${err.response.status}`;
    }
    return Promise.reject(err);
  }
);

export default api;
