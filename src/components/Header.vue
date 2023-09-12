<template>
  <div class="header_con border-bottom">
    <el-menu class="no-border" mode="horizontal" router>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/graphs">绘图</el-menu-item>
    </el-menu>
    <h1 class="container container-center container-align-center">
      Online Chart Generator
    </h1>
    <UserVue></UserVue>
  </div>
</template>

<script setup>
import UserVue from '@/components/user/User.vue';
</script>

<style lang="less" scoped>
.header_con {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  & > :first-child {
    overflow: hidden;
  }
}
</style>
