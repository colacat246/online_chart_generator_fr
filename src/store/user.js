import { defineStore } from 'pinia';

const userDataInit = {
  // 0 - 未登录 / 1 - 正常登录 / 2 - 登录失败 / 3 - 登录过期
  loginState: 0,
  errCode: undefined,
  user: {
    name: undefined,
    id: undefined,
  },
};

const userData = JSON.parse(JSON.stringify(userDataInit));

const tokenName = 'x-user-auth-token';
// 检查localStorage的登录信息
const token = localStorage.getItem(tokenName);
if (token) {
  let strings = token.split('.'); //截取token，获取载体
  const info = JSON.parse(
    decodeURIComponent(
      escape(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/')))
    )
  );
  if (info.exp * 1000 < Date.now()) {
    userData.loginState = 3;
  } else {
    try {
      userData.loginState = 1;
      userData.user = {
        name: info.userName,
        id: info.userId,
      };
    } catch (err) {
      userData = JSON.parse(JSON.stringify(userDataInit));
    }
  }
}
export const useUserStore = defineStore('userStore', {
  state: () => {
    return userData;
  },
  actions: {
    loginOk(token, userData) {
      this.loginState = 1;
      this.errCode = undefined;
      this.user = { name: userData.userName, id: userData.userId };
      localStorage.setItem(tokenName, token);
    },
    loginFail(errCode) {
      localStorage.removeItem(tokenName);
      this.loginState = 2;
      this.errCode = errCode;
      this.user = { name: undefined, id: undefined };
    },
    logout() {
      localStorage.removeItem(tokenName);
      this.loginState = 0;
      this.errCode = undefined;
      this.user = { name: undefined, id: undefined };
    },
  },
});
