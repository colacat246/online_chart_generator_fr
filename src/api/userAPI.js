import api from '@/config/createRequest.js';
import useInfoAlert from '@/composables/infoAlert.js';
const { setInfo } = useInfoAlert();

// /login
export async function loginAPI(loginForm, userStore) {
  userStore.logout();
  const { resHeaders, resData } = await api.post('/login', loginForm);
  userStore.loginOk(resHeaders['x-user-auth-token'], resData);
  setInfo({ content: '登录成功'});
}

// /register
export async function registerAPI(registerForm, userStore) {
  userStore.logout();
  const { resHeaders, resData } = await api.post('/register', registerForm);
  userStore.loginOk(resHeaders['x-user-auth-token'], resData);
}

// /changePw
export async function changePwAPI(loginForm, userStore) {
  const { resHeaders, resData } = await api.post('/changePw', loginForm);
  userStore.loginOk(resHeaders['x-user-auth-token'], resData);
  setInfo({ content: '密码修改成功' });
}
