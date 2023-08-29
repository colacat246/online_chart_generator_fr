import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: '/api/',
  timeout: 2000,
});

// 取消请求
const controller = new AbortController();

const excludedUrls = ['/login', '/register'];
// 未发送请求的情况
const reasonMapper = {
  NOT_LOGIN: function (err) {
    return;
  },
};
// 拦截器
api.interceptors.request.use(
  function (conf) {
    // 不拦截
    if (excludedUrls.includes(conf.url)) {
      localStorage.removeItem('x-user-auth-token');
    } else {
      const token = localStorage.getItem('x-user-auth-token');
      if (!token) {
        conf.signal = controller.signal;
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

// api.interceptors.response.use(
//   function (res) {
//     return res;
//   },
//   function (err) {
//     reasonMapper[err.config.signal.reason](err);
//     return Promise.reject(err);
//   }
// );

export default api;
