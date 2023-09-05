<template>
  <div class="app_con">
    <HeaderVue class="header"></HeaderVue>
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
  grid-template-rows: @header-height @main-height @footer-height;
}
.header {
  z-index: 999;
  height: 100%;
}
</style>
