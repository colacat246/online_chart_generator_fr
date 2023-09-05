import api from '@/config/createRequest.js';

export async function loginAPI(loginForm, userStore) {
  let res;
  try {
    res = await api.post('/login', loginForm);
  } catch (err) {
    console.log('here');
    // 网络错误
    userStore.loginFail(12345);
    throw new Error('网络错误');
  }
  // 登录失败
  if (res.data.statusCodeValue !== 999) {
    userStore.loginFail(res.data.statusCodeValue);
    throw new Error('登陆失败');
  }
  userStore.loginOk(res.headers['x-user-auth-token'], res.data.data);
}

export async function registerAPI(registerForm, userStore) {
  let res;
  try {
    res = await api.post('/register', registerForm);
  } catch (err) {
    userStore.loginFail(12345); // axios错误
    throw new Error('网络错误');
  }
  const code = res.data.statusCodeValue;
  switch (code) {
    case 999:
      userStore.loginOk(res.headers['x-user-auth-token'], res.data.data);
      return;
    case 1005:
      throw new Error('用户名已占用');
    case 1000:
      throw new Error('请求参数错误');
    default:
      throw new Error('注册异常');
  }
}
