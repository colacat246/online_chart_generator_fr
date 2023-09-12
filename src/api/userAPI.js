import api from '@/config/createRequest.js';

// /login
export async function loginAPI(loginForm, userStore) {
  userStore.logout();
  const { resHeaders, resData } = await api.post('/login', loginForm);
  userStore.loginOk(resHeaders['x-user-auth-token'], resData);
}

// /register
export async function registerAPI(registerForm, userStore) {
  userStore.logout();
  const { resHeaders, resData } = await api.post('/register', registerForm);
  userStore.loginOk(resHeaders['x-user-auth-token'], resData);
}
