<template>
  <div class="app_con">
    <HeaderVue></HeaderVue>
    <RouterView />
    <FooterVue></FooterVue>
  </div>
</template>

<script setup>
import HeaderVue from '@/components/Header.vue';
import FooterVue from '@/components/Footer.vue';
</script>

<style lang="less" scoped>
.app_con {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 50px auto 30px;
  // 防止el-popconfirm撑大body
  overflow: hidden;
}
</style>
