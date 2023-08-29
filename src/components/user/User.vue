<template>
  <div class="user_menu">
    <div v-if="!isLogin">
      <el-button text @click="loginFormVisible = true" type="primary"
        >登录</el-button
      >
      <el-dialog v-model="loginFormVisible" title="登录">
        <el-form :model="loginForm">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div :style="{ color: '#F56C6C' }">{{ loginHint[loginState] }}</div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleLogin(true)">取消</el-button>
            <el-button type="primary" @click="handleLogin(false)">
              登录
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 注册 -->
      <el-button text @click="registerFormVisible = true" type="primary"
        >注册</el-button
      >
      <el-dialog v-model="registerFormVisible" title="注册">
        <el-form :model="registerForm">
          <el-form-item label="用户名">
            <el-input v-model="registerForm.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="registerForm.password" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div :style="{ color: '#F56C6C' }">
          {{ registerHint[registerState] }}
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleRegister(true)">取消</el-button>
            <el-button type="primary" @click="handleRegister(false)">
              注册
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="container" v-else>
      <div>用户名：{{ userStore.user.name }}</div>
      <el-button type="primary" @click="logout"> 退出登录 </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import api from '@/config/createRequest.js';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
const userStore = useUserStore();

const loginFormVisible = ref(false);
const { loginState } = storeToRefs(userStore);
const isLogin = computed(() => loginState.value === 1);
const loginForm = reactive({
  userName: 'tom',
  password: '556677',
});
const loginHint = {
  0: '',
  2: '登录失败，请重试',
};

const registerFormVisible = ref(false);
const registerForm = reactive({
  userName: 'tom',
  password: '556677',
});
const registerState = ref(0);
const registerHint = {
  0: '',
  1: '注册失败，请重试',
  2: '用户名被占用',
};

async function handleLogin(isCancelled) {
  if (isCancelled) {
    loginFormVisible.value = false;
    return;
  }
  let res;
  try {
    res = await api.post('/login', loginForm);
  } catch (err) {
    console.log(err);
    userStore.loginFail(12345); // axios错误
    return;
  }
  if (res.data.statusCodeValue !== 999) {
    userStore.loginFail(res.data.statusCodeValue);
    return;
  }
  userStore.loginOk(res.headers['x-user-auth-token'], res.data.data);
  loginFormVisible.value = false;
}

async function handleRegister(isCancelled) {
  if (isCancelled) {
    registerFormVisible.value = false;
    return;
  }
  let res;
  try {
    res = await api.post('/register', registerForm);
  } catch (err) {
    userStore.loginFail(12345); // axios错误
    return;
  }
  const code = res.data.statusCodeValue;
  switch (code) {
    case 999:
      userStore.loginOk(res.headers['x-user-auth-token'], res.data.data);
      registerFormVisible.value = false;
      return;
    case 1005:
      registerState.value = 2;
      return;
    default:
      registerState.value = 1;
      return;
  }
}

const logout = () => {
  userStore.logout();
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
}
</style>
