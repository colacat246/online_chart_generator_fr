<template>
  <div class="con">
    <div v-if="!isLogin">
      <RequestDialogVue
        title="登录"
        confirm-name="登录"
        :model="[
          { label: '用户名', key: 'userName', val: 'tom', show: true },
          { label: '密码', key: 'password', val: '556677', show: true },
        ]"
        :confirmFn="async (data) => loginAPI(data, userStore)"
      >
        <template v-slot="{ toggleFn }">
          <el-button text type="primary" @click="toggleFn($event)"
            >登录</el-button
          >
        </template>
      </RequestDialogVue>
      <RequestDialogVue
        title="注册"
        confirm-name="注册"
        :model="[
          { label: '用户名', key: 'userName', val: 'tom', show: true },
          { label: '密码', key: 'password', val: '556677', show: true },
        ]"
        :confirmFn="async (data) => await registerAPI(data, userStore)"
      >
        <template v-slot="{ toggleFn }">
          <el-button text type="primary" @click="toggleFn($event)"
            >注册</el-button
          >
        </template>
      </RequestDialogVue>
    </div>
    <div class="con_login" v-else>
      <el-dropdown>
        <span
          class="cursor-pointer container container-align-center items-margin-hor-5px"
        >
          <span>{{ userStore.user.name }}</span>
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu style="width: 100px" >
            <el-dropdown-item @click="userStore.logout" class="container container-center">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import RequestDialogVue from '@/components/generalComponents/RequestDialog.vue';
import { computed } from 'vue';
import { loginAPI, registerAPI } from '@/api/userAPI';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
const userStore = useUserStore();

const { loginState } = storeToRefs(userStore);
const isLogin = computed(() => loginState.value === 1);
</script>

<style lang="less" scoped>
.con {
  & > * {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 10px;
    align-items: center;
  }
}
.con_login {
  & > * {
    margin: 0 5px;
  }
}
</style>
