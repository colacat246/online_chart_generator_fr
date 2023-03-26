<template>
  <div class="app_con">
    <HeaderVue class="header"></HeaderVue>
    <RouterView />
  </div>
</template>

<script setup>
import HeaderVue from '@/components/Header.vue';
</script>

<style lang="less" scoped>
.app_con {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: @header-height calc(100vh - @header-height);
}
.header {
  z-index: 999;
  height: 100%;
}
</style>
