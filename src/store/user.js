import { defineStore } from 'pinia';

let isInit = false;
const tokenName = 'x-user-auth-token';

const useInnerUserStore = defineStore('userStore', {
  state: () => {
    return {
      // 0 - 未登录 / 1 - 正常登录 / 2 - 登录失败 / 3 - 登录过期
      loginState: 0,
      errCode: null,
      user: {
        name: null,
        id: null,
      },
    };
  },
  actions: {
    loginOk(token, userData) {
      const { userName: name, userId: id } = userData;
      this.$state = {
        loginState: 1,
        errCode: null,
        user: {
          name,
          id,
        },
      };
      localStorage.setItem(tokenName, token);
    },
    // loginFail(errCode) {
    //   localStorage.removeItem(tokenName);
    //   this.$state = {
    //     loginState: 2,
    //     errCode,
    //     user: {
    //       name: null,
    //       id: null,
    //     },
    //   };
    // },
    logout() {
      localStorage.removeItem(tokenName);
      this.$state = {
        loginState: 0,
        errCode: null,
        user: {
          name: null,
          id: null,
        },
      };
    },
    loginExpired(userName, userId) {
      this.$state = {
        loginState: 3,
        errCode: undefined,
        user: {
          name: userName,
          id: userId,
        },
      };
    },
  },
  getters: {
    isLogin: (state) => state.loginState === 1,
  },
});

export const useUserStore = () => {
  const store = useInnerUserStore();
  // 不是第一次使用store
  if (isInit) {
    return store;
  }

  isInit = true;

  // 检查localStorage的登录信息
  const token = localStorage.getItem(tokenName);

  if (!token) {
    return store;
  }

  let strings = token.split('.'); //截取token，获取载体
  const { userName, userId, exp } = JSON.parse(
    decodeURIComponent(
      escape(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/')))
    )
  );
  // token解析结果不正确
  if (!(userName && userId && exp)) {
    store.loginFail(1000);
    return store;
  }

  // 登录过期
  if (exp * 1000 < Date.now()) {
    store.loginExpired(userName, userId);
    return store;
  }

  // 登录状态正常
  store.loginOk(token, { userName, userId });
  return store;
};
