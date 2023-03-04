<template>
  <div class="con">
    <HeaderVue class="header"></HeaderVue>
    <AsideVue class="aside"></AsideVue>
    <router-view class="main"></router-view>
  </div>
</template>

<script setup>
import HeaderVue from './components/HeaderVue.vue';
import AsideVue from './components/AsideVue.vue';
</script>

<style lang="less" scoped>
* {
  // border: 1px solid red;
  // box-sizing: border-box;
}
.con {
  height: 100vh;
  display: grid;
  grid-template-rows: 5% 95%;
  grid-template-columns: 200px auto;
}
.header {
  z-index: 999;
  height: 100%;
  grid-row: 1;
  grid-column: 1 / span 2;
}
.aside {
  grid-row: 2;
  grid-column: 1;
}
</style>
