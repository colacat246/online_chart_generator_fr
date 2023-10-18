<template>
  <div class="con">
    <div v-if="!isLogin">
      <RequestDialogVue
        title="登录"
        confirm-name="登录"
        :model="[
          { label: '用户名', key: 'userName', val: 'tom', show: true },
          {
            label: '密码',
            key: 'password',
            val: '556677',
            show: true,
            isPassword: true,
          },
        ]"
        :confirmFn="async (data) => await loginAPI(data, userStore)"
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
          { label: '用户名', key: 'userName', val: '', show: true },
          {
            label: '密码',
            key: 'password',
            val: '',
            show: true,
            isPassword: true,
          },
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
          <el-dropdown-menu >
            <el-dropdown-item>
              <RequestDialogVue
                title="修改密码"
                confirm-name="确定"
                :confirm-fn="async (data) => await changePwAPI(data, userStore)"
                :model="[
                  {
                    label: '用户名',
                    key: 'userName',
                    val: userStore.userNameGetter,
                    show: false,
                  },
                  {
                    label: '旧密码',
                    key: 'oriPassword',
                    val: '',
                    show: true,
                    isPassword: true,
                  },
                  {
                    label: '新密码',
                    key: 'newPassword',
                    val: '',
                    show: true,
                    isPassword: true,
                  },
                ]"
              >
                <template v-slot="{ toggleFn }">
                  <span @click="toggleFn($event)">修改密码</span>
                </template>
              </RequestDialogVue>
            </el-dropdown-item>
            <el-dropdown-item @click="userStore.logout">
              <span>退出登录</span>
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
import { loginAPI, registerAPI, changePwAPI } from '@/api/userAPI';
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
