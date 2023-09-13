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
        <el-dropdown-item>
          <AddGraphVue class="container-full"></AddGraphVue>
        </el-dropdown-item>
        <el-dropdown-item @click="saveImage">下载当前图形</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import AddGraphVue from '@/components/graphs/AsideComponents/AddGraph.vue';
import useChartRef from '@/composables/chart.js';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { getChart } = useChartRef();

// TODO 改成选项框，选择像素、文件名等
function saveImage() {
  const url = getChart().value.getDataURL({
    pixelRatio: 3,
    backgroundColor: '#fff',
  });
  const a = document.createElement('a');
  const evt = new MouseEvent('click');
  a.download = graphStore.titleGetter;
  a.href = url;
  a.dispatchEvent(evt);
}
</script>

<style lang="less" scoped>
.func_menu {
  width: 100%;
}
</style>
