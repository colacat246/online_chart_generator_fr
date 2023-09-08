<template>
  <el-dropdown ref="dropdown" trigger="click">
    <span
      class="container container-align-center items-margin-hor-5px cursor-pointer"
    >
      <el-icon><Menu /></el-icon>
      <span>编辑</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu style="width: 180px">
        <el-dropdown-item class="container-center">
          <AddGraphVue></AddGraphVue>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import AddGraphVue from '@/components/graphs/AsideComponents/AddGraph.vue';
</script>

<style lang="less" scoped>
.func_menu {
  width: 100%;
}
</style>
